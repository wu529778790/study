import React from 'react'
import {
  Card,
  Button,
  Icon,
  Radio,
  Dropdown,
  Menu
} from 'antd'
import './ui.less'

export default class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      size: 'large',
      loading: false,
      iconLoading: false
    }
  }
  handleSizeChange = (e) => {
    this.setState({
      size: e.target.value
    })
  }
  enterLoading = () => {
    this.setState({
      loading: true
    })
  }
  enterIconLoading = () => {
    this.setState({
      iconLoading: true
    })
  }
  handleMenuClick = (e) => {
    console.log('click', e)
  }
  render() {
    const size = this.state.size
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    )
    return (
      <div>
        <Card title="基础按钮" className="card">
          <Button type="primary">Primary</Button>
          <Button>default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">danger</Button>
        </Card>
        <Card title="图标按钮" className="card">
          <Button type="primary" shape="circle" icon="search"></Button>
          <Button type="primary" icon="search">Search</Button>
          <Button shape="circle" icon="search"></Button>
          <Button icon="search">Search</Button>
          <br />
          <br />
          <Button icon="search" shape="circle"></Button>
          <Button icon="search">Search</Button>
          <Button type="dashed" shape="circle" icon="search" />
          <Button type="dashed" icon="search">Search</Button>
        </Card>
        <Card title="按钮尺寸" className="card">
          <Radio.Group value={size} onChange={this.handleSizeChange}>
            <Radio.Button value="large">large</Radio.Button>
            <Radio.Button value="default">default</Radio.Button>
            <Radio.Button value="small">small</Radio.Button>
          </Radio.Group>
          <br />
          <br />
          <Button type="primary" size={size}>Primary</Button>
          <Button size={size}>Normal</Button>
          <Button type="dashed" size={size}>Dashed</Button>
          <Button type="danger" size={size}>Danger</Button>
          <br />
          <br />
          <Button type="primary" shape="circle" icon="download" size={size} />
          <Button type="primary" shape="round" icon="download" size={size}>Download</Button>
          <Button type="primary" icon="download" size={size}>Download</Button>
          <br />
          <br />
          <Button.Group size={size}>
            <Button type="primary">
              <Icon type="left" />Backward
            </Button>
            <Button type="primary">
              Forward<Icon type="right" />
            </Button>
          </Button.Group>
        </Card>
        <Card title="不可用状态" className="card">
          <Button type="primary">Primary</Button>
          <Button type="primary" disabled>Primary(disabled)</Button>
          <br />
          <br />
          <Button>Default</Button>
          <Button disabled>Default(disabled)</Button>
          <br />
          <br />
          <Button type="dashed">Dashed</Button>
          <Button type="dashed" disabled>Dashed(disabled)</Button>
          <br />
          <br />
          <div style={{ padding: '8px', background: 'rgb(190, 200, 200)' }}>
            <Button ghost>Ghost</Button>
            <Button ghost disabled>Ghost(disabled)</Button>
          </div>
        </Card>
        <Card title="加载中状态" className="card">
          <Button type="primary" loading>loading</Button>
          <Button type="primary" loading size="small">loading</Button>
          <br />
          <br />
          <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
            Click me!
          </Button>
          <Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
            Click me!
          </Button>
          <br />
          <br />
          <Button shape="circle" loading />
          <Button type="primary" shape="circle" loading />
        </Card>
        <Card title="多个按钮组合" className="card">
          <Button type="primary">primary</Button>
          <Button>secondary</Button>
          <Dropdown overlay={menu}>
            <Button>
              Actions <Icon type="down" />
            </Button>
          </Dropdown>
        </Card>
        <Card title="按钮组合" className="card">
          <h4>Basic</h4>
          <Button.Group>
            <Button>Cancel</Button>
            <Button>OK</Button>
          </Button.Group>
          <Button.Group>
            <Button disabled>L</Button>
            <Button disabled>M</Button>
            <Button disabled>R</Button>
          </Button.Group>
          <Button.Group>
            <Button>L</Button>
            <Button>M</Button>
            <Button>R</Button>
          </Button.Group>
        </Card>
        <Card title="幽灵按钮" className="card">
          <h4>幽灵按钮将按钮的内容反色，背景变为透明，常用在有色背景上</h4>
          <div style={{ background: 'rgb(190, 200, 200)', padding: '26px 16px 16px' }}>
            <Button type="primary" ghost>Primary</Button>
            <Button ghost>Default</Button>
            <Button type="dashed" ghost>Dashed</Button>
            <Button type="danger" ghost>danger</Button>
          </div>
        </Card>
      </div>
    )
  }
}

