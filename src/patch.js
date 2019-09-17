import { Component } from './component'
import { render } from './render'
import { updateProperties } from './updateProperties'

export function patch(dom, element, parent = dom.parentNode) {
  const replace = parent ? (el => parent.replaceChild(el, dom) && el) : (el => el)

  if (typeof element === 'object' && typeof element.type === 'function') {
    return Component.patch(dom, element, parent)
  } else if (typeof element !== 'object' && dom instanceof Text) {
    return dom.textContent !== String(element) ? replace(render(element, parent)) : dom
  } else if (typeof element === 'object' && dom instanceof Text) {
    return replace(render(element, parent))
  } else if (typeof element === 'object' && element.type.toUpperCase() !== dom.nodeName) {
    return replace(render(element, parent))
  } else if (typeof element === 'object' && element.type.toUpperCase() === dom.nodeName) {
    const active = document.activeElement
    for (const attr of dom.attributes) dom.removeAttribute(attr.name)

    for (const prop in element.props) updateProperties(dom, prop, element.props[prop])

    patchChildren(dom, element)
    active.focus()
    return dom
  }
}

function patchChildren(dom, element) {
  const oldKeytoChild = {};

  [].concat(...dom.childNodes).forEach((childNode, idx) => {
    const key = childNode._$key || `__index_${idx}`
    oldKeytoChild[key] = childNode
  });

  [].concat(...element.props.children).forEach((child, idx) => {
    const key = child.props &&  child.props.key || `__index_${idx}`
    const oldChildNode = oldKeytoChild[key];
    dom.appendChild(oldChildNode ? patch(oldChildNode, child) : render(child, dom))
    delete oldKeytoChild[key]
  })

  for (const key in oldKeytoChild) {
    oldKeytoChild[key].remove()
  }
}