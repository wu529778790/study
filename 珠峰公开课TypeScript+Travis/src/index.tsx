import * as React from 'react'
import * as ReactDom from 'react-dom'
import Counter from './components/Counter'

ReactDom.render((
  <Counter name="计数器" />
), document.getElementById('root'))