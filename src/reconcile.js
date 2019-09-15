import { Component } from "./component";
import { render, setAttribute } from "./render";

export function reconcile(dom, element, parent = dom.parentNode) {
  const replace = parent ? el => (parent.replaceChild(el, dom) && el) : (el => el)
  if (typeof element.type === 'function') {
    return Component.reconcile(dom, element)
  } else if (dom instanceof Text && typeof element === 'string') {
    return dom.textContent !== element ? replace(render(element, parent)) : dom
  } else if (dom.nodeName !== element.type.toUpperCase()) {
    return replace(render(element, parent))
  } else {
    const pool = Object.create(null)
    const active = document.activeElement;
    [].concat(...dom.childNodes).forEach((child, index) => {
      const key = child._$key || `_index_${index}`
      pool[key] = child
    });
    [].concat(...element.props.children).forEach((child, index) => {
      const key = child.props && child.props.key || `__index_${index}`
      dom.appendChild(pool[key] ? patch(pool[key], child) : render(child, dom));
      delete pool[key];
    })
    for (const key in pool) {
      const instance = pool[key]._$instance;
      if (instance) instance.componentWillUnmount();
      pool[key].remove();
    }
    for (const attr of dom.attributes) dom.removeAttribute(attr.name);
    for (const prop in element.props) setAttribute(dom, prop, element.props[prop]);
    active.focus();
    return dom;
  }
}
