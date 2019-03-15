import React from 'react'
import { connect } from 'react-redux'
import { ChangeInputVlue, AddItem, HandleDelete } from'./store/actionCreators'
const TodoList = (props) => {
  const { inputValue, changeInputValue, handleClick, handleDelete, list } = props
  return (
    <div>
      <div>
        <input
          onChange={changeInputValue}
          value={inputValue} />
        <button onClick={handleClick}>提交</button>
      </div>
      <ul>
        {
          list.map((item,index) => {
            return <li key={index} onClick={() => handleDelete(index)}>{item}</li>
          })
        }
      </ul>
    </div>
  )
}

const mapSateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

const mapDispatch = (dispatch) => {
  return {
    changeInputValue(e) {
      // const action = {
      //   type: CHANGE_INPUT_VALUE,
      //   value: e.target.value
      // }
      const action = ChangeInputVlue(e.target.value)
      dispatch(action)
    },
    handleClick() {
      // const action ={
      //   type: ADD_ITEM
      // }
      const action = AddItem()
      dispatch(action)
    },
    handleDelete(index){
      // const action ={
      //   type: HANDLE_DELETE,
      //   index
      // }
      const action = HandleDelete(index)
      dispatch(action)
    }
  }
}
export default connect(mapSateToProps, mapDispatch)(TodoList)