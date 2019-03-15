import Axios from "axios";
import * as constants from './constants'

const changDetail = (title, content) => ({
  type: constants.CHANGE_DETAIL,
  title,
  content
})
export const getDetail = (id) => {
  return (dispatch) => {
    Axios.get('/api/detail.json?id=' + id)
      .then(res => {
        const result = res.data.data
        dispatch(changDetail(result.title, result.content))
      })
      .catch(err => {
        console.error(err)
      })
  }
}