export function createElement(type, props, ...children) {
  if (props === null) props = {}
  props.children = children
  return { type, props }
}