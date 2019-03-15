import * as constants from './contants'
import Axios from "axios";

const changeLogin = (login) => ({
  type: constants.CHANGE_LOGIN,
  login
})

export const login = (account, password) => {
  return (dispatch) => {
    Axios.get('/api/login.json?account=' + account + '&password' + password)
      .then(res => {
        const result = res.data.data
        if (result) {
          dispatch(changeLogin(true))
        } else {
          alert('登录失败')
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export const logout = (login) => ({
  type: constants.LOGOUT,
  login
})