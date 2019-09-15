import { Component } from './component'
import { isPrimitive } from './utils'
import { updateProperties } from './updateProperties'

export function render(element, container) {
  const mount = container ? (el => container.appendChild(el)) : (el => el)
  if (isPrimitive(element)) {
    return mount(document.createTextNode(element))
  } else if (typeof element === 'object') {
    const { type, props } = element
    if (typeof type === 'function') {
      return Component.render(element, container)
    } else if (typeof type === 'string') {
      const dom = mount(document.createElement(type))
      for (const child of [].concat(...props.children)) {
        render(child, dom)
      }
      for (const prop in props) {
        if (prop !== 'children') {
          updateProperties(dom, prop, props[prop])
        }
      }
      return dom
    }
  } else {
    throw new Error( `Invalid Element: ${element}.`)
  }
}
