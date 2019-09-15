import { Component } from './component'
import { isNil, isPrimitive } from './utils'

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
          setAttribute(dom, prop, props[prop])
        }
      }
      return dom
    }
  } else {
    throw new Error( `Invalid Element: ${element}.`)
  }
}

export const setAttribute = (dom, key, value) => {
  if (typeof value == 'function' && key.startsWith('on')) {
      const eventType = key.slice(2).toLowerCase();
      dom._$handlers = dom._$handlers || {};
      dom.removeEventListener(eventType, dom._$handlers[eventType]);
      dom._$handlers[eventType] = value;
      dom.addEventListener(eventType, dom._$handlers[eventType]);
  } else if (key == 'checked' || key == 'value' || key == 'className') {
      dom[key] = value;
  } else if (key == 'style' && typeof value == 'object') {
      Object.assign(dom.style, value);
  } else if (key == 'ref' && typeof value == 'function') {
      value(dom);
  } else if (key == 'key') {
      dom._$Key = value;
  } else if (typeof value != 'object' && typeof value != 'function') {
      dom.setAttribute(key, value);
  }
};