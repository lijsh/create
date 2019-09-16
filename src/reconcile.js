import { Component } from './component'
import { render } from './render'
import { updateProperties } from './updateProperties'

export function reconcile(dom, element, parent = dom.parentNode) {
  const replace = parent ? (el => parent.replaceChild(el, dom) && el) : (el => el)
  if (typeof element === 'object' && typeof element.type === 'function') {
    return Component.reconcile(dom, element, parent)
  } else if (typeof element !== 'object' && dom instanceof Text) {
    return dom.textContent !== element ? replace(render(element, parent)) : dom
  } else if (typeof element === 'object' && dom instanceof Text) {
    return replace(render(element, parent))
  } else if (typeof element === 'object' && element.type.toUpperCase() !== dom.nodeName) {
    return replace(render(element, parent))
  } else if (typeof element === 'object' && element.type.toUpperCase() === dom.nodeName) {
    const oldKeytoChild = {};
    [].concat(...dom.childNodes).forEach((childNode, idx) => {
      const key = childNode._$key || `__index_${idx}`
      oldKeytoChild[key] = childNode
    });
    [].concat(...element.props.children).forEach((child, idx) => {
      const key = child.props &&  child.props.key || `__index_${idx}`
      const oldChildNode = oldKeytoChild[key];
      dom.appendChild(oldChildNode ? reconcile(oldChildNode, child) : render(child, dom))
      delete oldKeytoChild[key]
    })
    for (const key in oldKeytoChild) {
      oldKeytoChild[key].remove()
    }
    for (const attr of dom.attributes) dom.removeAttribute(attr.name)
    for (const prop in element.props) updateProperties(dom, prop, element.props[prop])
    return dom
  }
}