import { Component } from './component'
import { updateProperties } from './updateProperties'

export function render(element, container) {
  const mount = container ? (el => container.appendChild(el)) :( el => el)
  if (typeof element === 'string' || typeof element === 'number') {
    return mount(document.createTextNode(element))
  } else if (typeof element === 'object' && typeof element.type === 'function') {
    return Component.render(element, container)
  } else if (typeof element === 'object' && typeof element.type === 'string') {
    const dom = document.createElement(element.type)
    for (const child of [].concat(...element.props.children)) {
      render(child, dom)
    }
    for (const prop in element.props) {
      updateProperties(dom, prop, element.props[prop])
    }
    return mount(dom)
  }
}
