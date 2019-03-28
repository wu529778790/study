import React from 'react'
import MenuConfig from '../../config/menuConfig'
import './index.less'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from '../../redux/action'

const SubMenu = Menu.SubMenu

class NavLeft extends React.Component {
  state = {
    currentKey: ''
  }
  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig)
    let currentKey = window.location.hash.replace(/#|\?.*$/g, '')
    this.setState({
      menuTreeNode,
      currentKey
    })
  }
  handleClick = (item) => {
    this.setState({
      currentKey: item.key
    })
  }
  // 菜单渲染
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
      <Menu.Item key={item.key} >
        <NavLink to={item.key}>{item.title}</NavLink>
      </Menu.Item>
      )
    })
  }
  render() {
    return (
      <div className="NavLeft">
        <div className="logo">
          <img src="/asserts/logo-ant.svg" alt="" />
          <h1>shenzjd.com</h1>
        </div>
        <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.currentKey]}
         theme="dark">
          {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}

export default connect()(NavLeft)