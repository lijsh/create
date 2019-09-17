import { h } from '../src'

/** @jsx h */
const prettyPrint = vdom => JSON.stringify(vdom, null, 2)

const div = <div>Hello World!</div>

const ul = (
  <ul className="some-list">
    <li className="some-list__item">One</li>
    <li className="some-list__item">Two</li>
  </ul>
)

console.log(prettyPrint(div))
console.log(prettyPrint(ul))