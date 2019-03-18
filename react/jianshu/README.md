
用到的技术栈

react 

redux 

react-redux 

react-router 

immutable.js 

styled-components 

react-loadable

## 项目建立

```
npx create-react-app jianshu
cd jianshu
npm start
```
## 安装styled-components

```
yarn add styled-components

https://www.styled-components.com/docs/api
```

```
https://meyerweb.com/eric/tools/css/reset/
```

## 安装动画库
```
yarn add react-transition-group


  .slide-enter {
    width: 160px;
    transition: all 0.2s ease-out;
  }
  .slide-enter-active {
    width: 240px;
  }
  .slide-exit {
    transition: all 0.2s ease-in;
  }
  .slide-exit-active{
    transition: all 0.2s ease-in
  }
```

## 使用redux
```
yarn add redux
yarn add react-redux

// app.js
import { Provider } from 'react-redux'
// store/index.js
import { createStore } from 'redux'

//组件中使用

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
```

## 使用immutable

state是不能直接操作的，所以使用immutable把state变成不可改变的

```
yarn add immutable
// 新建immutable对象
const defaultState = fromJS({
  focused: false
})
// 修改immutable对象
// immutable对象的set方法，会结合之前immutable对象的值和设置的值，返回一个新的对象
state.set('focused', true)

```

## 使用redux-immutable

state是最外面的大的
但是组件内的state.header.get('focused)
要把state也变成immutable对象，就要适用redux-immutable

state.get('header').get('focused')

state.getIn(['header', 'focused'])
```
yarn add redux-immutable
```

## redux-thunk

解决异步请求数据的redux的中间件,
以往的actionCreators都是返回对象，用了redux-thunk之后可以返回函数
```
yarn add redux-thunk

// 根store

import { createStore, compose, applyMiddleware } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store  = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))

export default store
```

## 安装路由

```
yarn add react-router-dom
```

## 安装异步加载组件

```
yarn add react-loadable

// 需要异步记载的组件创建loadable.js
import React from 'react'
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./'),
  loading(){
    return <div>正在加载</div>
  },
});

export default () => <LoadableComponent/>
```

