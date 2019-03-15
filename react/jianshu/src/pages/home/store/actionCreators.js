import axios from 'axios';
import * as constants from './constants'
import { fromJS } from 'immutable'

const changHomeData = (result) => ({
  type: constants.CHANGE_HOME_DATA,
  topicList: result.topicList,
  recommendList: result.recommendList,
  articleList: result.articleList
})

const addHomeList = (list, nextPage) => ({
  type: constants.ADD_ARTICLE_LIST,
  list: fromJS(list),
  nextPage
})

export const getHomeInfo = () => {
  return (dispatch) => {
    axios.get('/api/home.json')
      .then(res => {
        const result = res.data.data
        dispatch(changHomeData(result))
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export const getMoreList = (articlePage) => {
  return (dispatch) => {
    axios.get('/api/homeList.json?articlePage=' + articlePage)
      .then(res => {
        const result = res.data.data
        dispatch(addHomeList(result, articlePage + 1))
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export const toggleTopShow = (boolean) => ({
  type: constants.TOGGLE_TOP_SHOW,
  boolean
})