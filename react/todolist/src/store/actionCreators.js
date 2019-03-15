import { CHANGE_INPUT_VALUE, ADD_ITEM, HANDLE_DELETE } from './actionTypes'

export const ChangeInputVlue = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})
export const AddItem = () => ({
  type: ADD_ITEM
})
export const HandleDelete = (index) => ({
  type: HANDLE_DELETE,
  index
})