import { isNil } from "./utils";

export function createElement(type, data, ...args) {
  const props = isNil(data) ? {} : data
  const children = args.length > 0 ? [].concat(...args) : []
  return {
    type,
    props: {
      ...props,
      children: children.filter(c => !isNil(c))
    }
  }
}