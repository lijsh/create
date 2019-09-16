import { h, render, Component } from './src'
import './index.css'
import { ReconcileExample, stories } from './ReconcileExample'
/** @jsx h */


render(<ReconcileExample stories={stories} />, document.getElementById('app'))
