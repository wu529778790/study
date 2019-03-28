/**
 * reducer数据处理
 */
import { type } from './../action'
 const defaultSate = {
   menuName: '首页'
 }

 export default (state = defaultSate, action) => {
    switch (action) {
      case type.SWITCH_MENU:
        return {
          ...state,
          menuName: action.menuName
        }
      default:
        return state
    }
 }