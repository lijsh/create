export function isNil(arg) {
  return arg === undefined || arg === null
}

export function isPrimitive(val) {
  const type = typeof val
  return type === 'string' || type === 'number'
}

export function isElement(elem) {
  return typeof elem === 'string' || !!elem.type
}