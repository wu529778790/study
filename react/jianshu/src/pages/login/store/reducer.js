import { fromJS } from 'immutable'
import * as constants from './contants'

const defaultState = fromJS({
  login: false
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.CHANGE_LOGIN:
      return state.set('login', action.login)
    case constants.LOGOUT:
      return state.set('login', action.login)
    default:
      return state
  }
}
