import { Component } from "./component";
import { render } from "./render";
import { updateProperties } from "./updateProperties";

export function reconcile(dom, element, parent = dom.parentNode) {
  const replace = parent ? el => (parent.replaceChild(el, dom) && el) : (el => el)
  if (typeof element.type === 'function') {
    return Component.reconcile(dom, element)
  } else if (dom instanceof Text && typeof vdom != 'object') {
    return dom.textContent !== element ? replace(render(element, parent)) : dom
  } else if (dom.nodeName !== element.type.toUpperCase()) {
    return replace(render(element, parent))
  } else {
    const pool = Object.create(null)
    const active = document.activeElement;
    [].concat(...dom.childNodes).forEach((child, index) => {
      const key = child._$key || `__index_${index}`
      pool[key] = child
    });
    [].concat(...element.props.children).forEach((child, index) => {
      const key = child.props && child.props.key || `__index_${index}`
      dom.appendChild(pool[key] ? reconcile(pool[key], child) : render(child, dom));
      delete pool[key];
    })
    for (const key in pool) {
      const instance = pool[key]._$instance;
      if (instance) instance.componentWillUnmount();
      pool[key].remove();
    }
    for (const attr of dom.attributes) dom.removeAttribute(attr.name);
    for (const prop in element.props) updateProperties(dom, prop, element.props[prop]);
    active.focus();
    return dom;
  }
}
