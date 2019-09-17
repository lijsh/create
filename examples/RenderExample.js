import { h } from '../src'

/** @jsx h */
const checklist = ['Buy Milk.', 'Read Books.', 'Sports']

const title = 'Today\'s Checklist'

export const renderExample = (
  <div className="app">
    <h2 style={{ color: "#61dafb" }}>{title}</h2>
    <ul className="ul">
      {checklist.map(item => (
        <li>{item}</li>
      ))}
    </ul>
  </div>
)