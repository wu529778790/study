import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writter'
import { actionCreators } from './store'

import { 
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BackTop
} from './style'


class Home  extends PureComponent {
  handleScrollTop(){
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <HomeWrapper>
         <HomeLeft>
           <img 
           className='banner-img'
           alt=""
           src="https://upload.jianshu.io/admin_banners/web_images/4592/2cbadf9347d69cfc140daf64de887fda0e361bcc.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"/>
           <Topic></Topic>
           <List></List>
         </HomeLeft>
         <HomeRight>
           <Recommend></Recommend>
           <Writer></Writer>
         </HomeRight>
         {
           this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : null
         }
      </HomeWrapper>
    )
  }
  componentDidMount () {
    this.props.changeHomeData()
    this.bindEvents()
  }
  bindEvents(){
    window.addEventListener('scroll', this.props.changeScrollTopShow)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.props.changeScrollTopShow)
  }
}

const mapStateToProps = (state) => ({
  showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeHomeData () {
      dispatch(actionCreators.getHomeInfo())
    },
    changeScrollTopShow(){
      if (document.documentElement.scrollTop > 100) {
        dispatch(actionCreators.toggleTopShow(true))
      } else {
        dispatch(actionCreators.toggleTopShow(false))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)