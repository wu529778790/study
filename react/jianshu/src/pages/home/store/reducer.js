import { fromJS } from 'immutable'
import * as constants from './constants'
const defaultState = fromJS({
  topicList: [],
  articleList: [],
  articlePage: 1,
  recommendList: [],
  writterList: [
    {
      id: 1,
      imgUrl: 'http://upload.jianshu.io/users/upload_avatars/13213889/7314c5cc-ca7f-4542-b914-2c8dffaf324d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp',
      name: '神族九帝',
      desc: '写了257.8k字 · 1.2k喜欢'
    },
    {
      id: 2,
      imgUrl: 'http://upload.jianshu.io/users/upload_avatars/13213889/7314c5cc-ca7f-4542-b914-2c8dffaf324d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp',
      name: '神族九帝',
      desc: '写了257.8k字 · 1.2k喜欢'
    }
  ],
  showScroll: false
})

const changeHomeData = (state, action) => {
  return state.merge({
    topicList: fromJS(action.topicList),
    articleList: fromJS(action.articleList),
    recommendList: fromJS(action.recommendList),
  })
}
const addArticleData = (state, action) => {
  return state.merge({
    articleList: state.get('articleList').concat(action.list),
    articlePage: action.nextPage
  })
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_HOME_DATA:
      return changeHomeData(state, action)
    case constants.ADD_ARTICLE_LIST:
      return addArticleData(state, action)
    case constants.TOGGLE_TOP_SHOW:
      return state.set('showScroll', action.boolean)
    default:
      return state
  }
}