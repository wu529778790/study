
import { CHANGE_INPUT_VALUE, ADD_ITEM, HANDLE_DELETE } from './actionTypes'

const defaultState = {
  inputValue: '',
  list: [1,2,3,4,5,6]
}

export default (state = defaultState, action) => {
  if (action.type === CHANGE_INPUT_VALUE) {
    const newSate = JSON.parse(JSON.stringify(state))
    newSate.inputValue = action.value
    return newSate
  }
  if (action.type === ADD_ITEM) {
    const newSate = JSON.parse(JSON.stringify(state))
    newSate.list.push(newSate.inputValue)
    newSate.inputValue = ''
    return newSate
  }
  if (action.type === HANDLE_DELETE) {
    const newSate = JSON.parse(JSON.stringify(state))
    newSate.list.splice(action.index, 1)
    return newSate
  }
  return state
}