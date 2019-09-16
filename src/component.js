import { reconcile } from './reconcile'
import { render } from './render'

export class Component {
  constructor(props) {
    this.props = props
    this.state = {}
  }
  static render(element, container) {
    const props = Object.assign({}, element.props)
    const { type } = element
    const instance = new type(props)
    instance._$dom = render(instance.render(), container)
    instance._$dom._$instance = instance
    return instance._$dom
  }

  static reconcile(dom, element, parent=dom.parentNode) {
    const props = Object.assign({}, element.props)
    if (dom._$instance && dom._$instance.constructor == element.type) {
      dom._$instance.props = props
      return patch(dom, dom._$instance.render(), parent)
    } else {
        const ndom = Component.render(element, parent)
        return parent ? (parent.replaceChild(ndom, dom) && ndom) : (ndom)
    }
  }

  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState)
    const newElem = this.render()
    reconcile(this._$dom, newElem)
  }
}
