import { reconcile } from "./reconcile";
import { render } from './render'

export class Component {
  constructor(props) {
    this.props = props
    this.state = Object.create(null)
  }
  static render(element, container) {
    const props = Object.assign({}, element.props)
    const { type } = element
    if (Component.isPrototypeOf(type)) {
      const instance = new type(props)
      instance.componentWillMount()
      instance._$dom = render(instance.render(), container)
      instance._$dom._$instance = instance
      instance._$dom._$key = props.key
      instance.componentDidMount()
    } else {
      return render(type(props), container)
    }
  }
  
  static reconcile(dom, element, parent=dom.parentNode) {
    const props = Object.assign({}, element.props)
    if (dom._$instance && dom._$instance.constructor == element.type) {
      dom._$instance.componentWillReceiveProps(props);
      dom._$instance.props = props;
      return patch(dom, dom._$instance.render(), parent);
    } else if (Component.isPrototypeOf(element.type)) {
        const ndom = Component.render(element, parent);
        return parent ? (parent.replaceChild(ndom, dom) && ndom) : (ndom);
    } else if (!Component.isPrototypeOf(element.type)) {
        return patch(dom, element.type(props), parent);
    }
  }

  setState(partialState) {
    if (this._$dom && this.shouldComponentUpdate(this.props, partialState)) {
      this.state = Object.assign({}, this.state, partialState)
      const newElem = this.render()
      reconcile(this._$dom, newElem)
      this._$element = newElem
    } else {
      this.state = Object.assign({}, this.state, partialState)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps != this.props || nextState != this.state;
  }

  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    return undefined;
  }

  componentWillUpdate(nextProps, nextState) {
      return undefined;
  }

  componentDidUpdate(prevProps, prevState) {
      return undefined;
  }


  componentWillUnmount() {
      return undefined;
  }
}
