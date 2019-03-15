import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { actionCreators } from './store'

import {
  LoginWrapper,
  LoginBox,
  Input,
  Button
} from './style'

class Login extends PureComponent {
  render(){
    const { loginStatus } = this.props
    if (!loginStatus) {
      return (
        <LoginWrapper>
          <LoginBox>
            <Input placeholder="账号" ref={(input) => {this.account = input}}></Input>
            <Input placeholder="密码" type="password" ref={(input) => {this.password = input}}></Input>
            <Button onClick={() => this.props.login(this.account, this.password)}>登录</Button>
          </LoginBox>
        </LoginWrapper>
      )
    } else {
      return <Redirect to="/" />
    }
  }
}

const mapStateToProps = (state) => ({
  loginStatus: state.getIn(['login', 'login'])
})

const mapDispatchToProps = (dispatch) => ({
  login(account, password){
    dispatch(actionCreators.login(account, password))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)