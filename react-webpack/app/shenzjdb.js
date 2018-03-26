import React from 'react'

export default class Shenzjdb extends React.Component {
    componentWillMount () {
        console.log(this.props)
    }
    render () {
        return (
            <div>
                B我是B页面
                <div>
                    参数是{this.props.match.params.param}
                </div>
            </div>
        )
    }
}