import React from 'react'
import { Prompt } from 'react-router-dom'

export default class Shenzjdc extends React.Component {
    render () {
        return (
            <div>
                C页面
                需要注意的是，如果你用MemoryRouter路由模式，Prompt不起作用。
                <Prompt message="残忍离开？"></Prompt>
            </div>
        )
    }
}