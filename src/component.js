import { patch } from './patch'
import { render } from './render'

export class Component {
  constructor(props) {
    this.props = props
    this.state = {}
  }

  static render(element, container) {
    const props = Object.assign({}, element.props)
    const instance = new element.type(props)
    const instanceElement = instance.render()
    const dom = render(instanceElement, container)
    instance._$dom = dom
    instance._$dom._$instance = instance
    return dom
  }

  static patch(dom, element, parent = dom.parentNode) {
    const props = Object.assign({}, element.props)
    const instance = dom._$instance
    if (instance && instance.constructor === element.type) {
      instance.props = props
      return patch(dom, instance.render(), parent)
    } else {
      const newDom = Component.render(element, parent)
      if (parent) parent.replaceChild(newDom, dom)
      return newDom
    }
  }

  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState)
    const newElem = this.render()
    patch(this._$dom, newElem)
  }
}
