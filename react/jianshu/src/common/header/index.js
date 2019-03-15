import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
  SearchInfoList,
  SearchInfo
} from './style'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from './store'
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import { Link } from 'react-router-dom'


// const Header = (props) => {
//   return (
//     <HeaderWrapper>
//       <Logo href='/' />
//       <Nav>
//         <NavItem className='left active'>首页</NavItem>
//         <NavItem className='left'>下载App</NavItem>
//         <NavItem className='right'>登录</NavItem>
//         <NavItem className='right'>
//           <i className="iconfont">&#xe636;</i>
//         </NavItem>
//         <SearchWrapper>
//           <CSSTransition
//             in={props.focused}
//             timeout={200}
//             classNames="slide"
//           >
//             <NavSearch
//               onFocus={props.handleInputFocuse}
//               onBlur={props.handleInputBlur}
//               className={props.focused ? 'focused' : ''}>
//             </NavSearch>
//           </CSSTransition>
//           <i className={props.focused ? 'focused iconfont' : 'iconfont'}>&#xe60b;</i>
//           {getListArea(props.focused)}
//         </SearchWrapper>
//       </Nav>
//       <Addition>
//         <Button className='writing'>
//           <i className="iconfont">&#xe602;</i>写文章</Button>
//         <Button className='reg'>注册</Button>
//       </Addition>
//     </HeaderWrapper>
//   )
// }

class Header extends Component {
  render() {
    const { focused, handleInputFocuse, handleInputBlur, list, login, logout } = this.props
    return (
      <HeaderWrapper>
      <Link to="/">
        <Logo />
      </Link>
      <Nav>
        <NavItem className='left active'>首页</NavItem>
        <NavItem className='left'>下载App</NavItem>
        {
          login ? 
            <Link to="/"><NavItem className='right' onClick={logout}>退出</NavItem></Link> :
            <Link to="/login"><NavItem className='right'>登录</NavItem></Link>
          
        }
        <NavItem className='right'>
          <i className="iconfont">&#xe636;</i>
        </NavItem>
        <SearchWrapper>
          <CSSTransition
            in={focused}
            timeout={200}
            classNames="slide"
          >
            <NavSearch
              onFocus={() => handleInputFocuse(list)}
              onBlur={handleInputBlur}
              className={focused ? 'focused' : ''}>
            </NavSearch>
          </CSSTransition>
          <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe60b;</i>
          {this.getListArea()}
        </SearchWrapper>
      </Nav>
      <Addition>
        <Link to="/write">
          <Button className='writing'>
            <i className="iconfont">&#xe602;</i>写文章
          </Button>
        </Link>
        <Button className='reg'>注册</Button>
      </Addition>
    </HeaderWrapper>
    )
  }
  getListArea () {
    const { focused, mouseIn, list, page, totalPage, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props
    const newList = list.toJS()
    const pageList = []

    if (newList.length) {
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        if (newList[i]){
          pageList.push(
            <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
          )
        }
      }
    }
    if (focused || mouseIn) {
      return (
        <SearchInfo
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}>
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch
              onClick={() => handleChangePage(page, totalPage, this.spinIcon)}
            >
              <i 
              ref={(icon) => {this.spinIcon = icon}}
              className="iconfont spin">&#xe851;</i>
              换一换
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {
              pageList
            }
          </SearchInfoList>
        </SearchInfo>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => {
  return {
    // focused: state.get('header').get('focused')
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    totalPage: state.getIn(['header', 'totalPage']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    login: state.getIn(['login', 'login'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocuse(list) {
      (list.size === 0) && dispatch(actionCreators.getList())
      dispatch(actionCreators.searchFocus())
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur())
    },
    handleMouseEnter(){
      dispatch(actionCreators.MouseEnter())
    },
    handleMouseLeave(){
      dispatch(actionCreators.MouseLeave())
    },
    handleChangePage(page, totalPage, spinIcon){
      let originAngle = spinIcon.style.transform.replace(/[^0-9]/ig, '')
      if (originAngle) {
        originAngle = parseInt(originAngle, 10)
      } else {
        originAngle = 0
      }
      spinIcon.style.transform = `rotate(${originAngle + 360}deg)`
      if (page < totalPage) {
        dispatch(actionCreators.changePage(page + 1))
      } else {
        dispatch(actionCreators.changePage(1))
      }
    },
    logout () {
      dispatch(loginActionCreators.logout(false))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)