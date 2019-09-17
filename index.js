import { h, render } from './src'
import './index.css'
import { ComponentExample, stories } from './examples/ComponentExample'
import { renderExample } from './examples/RenderExample'
import './examples/createElementExample'
import { Todo } from './examples/anotherCompExample'
/** @jsx h */
const root = document.getElementById('app')

// render demo
// render(renderExample, root)

// component demo
// render(<ComponentExample stories={stories} />, root)
// render(<Todo />, root)