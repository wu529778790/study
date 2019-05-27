import * as React from 'react'

interface Props {
  name: string
}
interface State {
  number: number,
  amount: number
}

export default class Counter extends React.Component<Props, State> {
  state = {
    number: 0,
    amount: 1
  }
  handleClick = () => {
    this.setState({
      number: this.state.number+this.state.amount
    })
  }
  handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      amount: parseInt(event.target.value)
    })
  }
  render () {
    let {name} = this.props
    let {number, amount} = this.state
    return (
      <div>
        <p>{name}:{number}</p>
        <input value={amount} onChange={this.handleChange}/>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}