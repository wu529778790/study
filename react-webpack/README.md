# 手动创建react-webpack
1. 安装webpack-dev-server，配置
```
    devServer: {
        contentBase: './',
        host: 'host',
        compress: true,
        port: 8080
    }
```
2. 自动刷新浏览器，在output里面加图publicPath: 'temp/',然后再index.html引入'./temp/index.js'
3. 一般而言React会匹配所有能匹配的路由组阶，exact可以使我们的匹配更精确。exact的值为bool型，为true是表示严格匹配，为false时为正常匹配
```
<Route  path="/" component={Shenzjd} />
<Route  path="/Shenzjdb" component={Shenzjd} />
```
    
这种情况下，输入路由"/Shenzjd",会把Shenzjd组件也展示出来,所以我们经常使用exact来解决这个问题。
```
<Route  exact  path="/"  component={Jspang} />
<Route  path="/Jspangb" component={Jspangb} />
```
4. 路由的模式
``` 
BrowserRouter：浏览器的路由方式，也是我们一直在学习的路由方式，在开发中最常使用。
HashRouter：在路径前加入#号成为一个哈希值。Hash模式的好处是，再也不会因为我们刷新而找不到我们的对应路径了。
MemoryRouter：不存储history，所有路由过程保存在内存里，不能进行前进后退，因为地址栏没有发生任何变化。
NativeRouter：经常配合ReactNative使用，多用于移动端，以后ReactNative课程中会详细讲解。
StaticRouter：设置静态路由，需要和后台服务器配合设置，比如设置服务端渲染时使用。
```
# react 纪要
```
jsx与html的不同
class 属性变为 className
tabindex 属性变为 tabIndex
for 属性变为 htmlFor
textarea 的值通过需要通过 value 属性来指定
style 属性的值接收一个对象，css 的属性变为驼峰写法，如：backgroundColor。
```

```
组件的名称首字母必须为大写
属性必须为只读的

<div>Hello {this.props.name || 'World'}.</div> 属性可能是个object

import React, {Component} from 'react';

class HelloMessage extends Component {
    render() {
        return <div>Hello {this.props.name}.</div>;
    }
}
HelloMessage.defaultProps = {
    name: 'World'
}
```
```
属性的类型及校验
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HelloMessage extends Component {
    render() {
        return <div>Hello {this.props.name}.</div>;
    }
}
HelloMessage.defaultProps = {
    name: 'World'
}
HelloMessage.propTypes = {
    name: PropTypes.string
}
```
```
ReactDOM.render 在一个单页面 web 应用中通常只调用一次。

组件可以通过 setState 改变内部状态 state 来更新视图。

setState 多数情况下是异步的。

不要直接使用当前 state 的值生成下一个 state。

不要直接通过 this.state 修改 state。
```
# 生命周期函数

1. 组件初始化： constructor
```
创建一个组件的实例对象（也就是 Element，通常对应一个JSX表达式，如：<MyComponent />）。

获取组件的默认属性。

获取组件的初始内部状态（在 constructor 中 this.state = xxxx;）
```
2. componentWillMount
```
在组件被渲染到页面上之前执行，在组件的整个生命周期内只执行一次。在这里可以调用 setState 更新内部状态，但是更推荐将这里的状态更新操作放到 constructor 中。

该函数执行完后会立马执行 render 方法并将组件渲染到页面上。所以，在这里执行 setState 不会触发额外的渲染过程，因为这是没有必要的。
```
3. componentDidMount
组件被渲染到页面上后立马执行，在组件的整个生命周期内只执行一次。这个时候是做如下操作的好时机
```
某些依赖组件 DOM 节点的操作。

发起网络请求。

设置 setInterval、setTimeout 等计时器操作

在这里可以调用 setState 更新组件内部状态，且会触发一个重新渲染的过程，即会重新执行 render 方法并更新视图。
```
4. componentWillReceiveProps
```
componentWillReceiveProps(nextProps)

该声明周期函数可能在两种情况下被调用：

    1. 组件接收到了新的属性。新的属性会通过 nextProps 获取到。

    2. 组件没有收到新的属性，但是由于父组件重新渲染导致当前组件也被重新渲染。
你只要知道，当该函数被调用时，并不一定是因为属性发生了变化

在这里也可以调用 setState 更新组件的内部状态，同样也不会触发额外的重新渲染操作，React 会聪明地用更新后的属性和内部状态进行一次重新渲染
```
5. shouldComponentUpdate
```
shouldComponentUpdate(nextProps, nextState)

这是一个询问式的生命周期函数，所以该函数需要一个返回值 true/false，如果为 true，组件将触发重新渲染过程，如果为 false 组件将不会触发重新渲染。因此，合理地利用该函数可以一定程度节省开销，提高系统的性能。

此处不能调用 setState 更新组件的状态。

由于组件属性或者内部状态被改变时都触发组件重新渲染，所以该函数接受两个参数：新的属性（nextProps）、新的状态（nextState）

在处理该声明周期函数时，切记要兼顾属性和状态，不能只顾其一，不然很容易踩坑。例如：某位同学只依据属性来判断是否触发重新渲染，而忽略了内部状态，这样就导致你无论如何 setState，组件视图都不能正常更新

```
6. componentWillUpdate
```
当组件 shouldComponentUpdate 返回 true 或者调用 forceUpdate 时将触发此函数。

该函数中不能调用 setState 更新组件状态，当你想这么做的时候，你可以考虑将它移到 componentWillReceiveProps 函数里。

该函数在函数第一次渲染的时候不会执行。
```
7. componentDidUpdate
```
componentDidUpdate(prevProps, prevState)

在组件重新渲染过程中，重新执行 render 方法并更新组件视图后立即执行该函数。类似组件第一次渲染过程中的 componentDidMount，该函数在第一次渲染时不会执行

在此处是做这些事情的好时机：
    执行依赖新 DOM 节点的操作。

    依据新的属性发起新的网络请求。（但是此处一定要格外谨慎，一定要在确认属性变化后再发起网络请求，不然极有可能进入死循环：didUpdate -> ajax -> changeProps -> didUpdate -> ...）。

```
8. componentWillUnmount
```
当组件被从页面移除之前调用，此时是清理战场的好时机，如定时器，终止网络请求等
```
9. componentDidCatch
```
componentDidCatch(error, info)
这是 React 16 新加入的一个生命周期函数。定义该生命周期函数的组件将会成为一个错误边界，错误边界这个词非常形象，它可以有效地将错误限制在一个有限的范围内，而不会导致整个应用崩溃，防止一颗耗子屎坏了一锅汤。

错误边界组件，可以捕获其整个子组件树内发生的任何异常，但是却不能捕获自身的异常。
```

# 事件处理

1. react内置组建的事件处理
```
属性名称采用驼峰式（如：onClick，onKeyDown），而不是全小写字母。

属性值接受一个函数，而不是字符串。

return false; 不会阻止组件的默认行为，需要调用 e.preventDefault();

 
```
2. 不要在异步过程中使用 React 事件对象
```
需要说明的是，出于性能的考虑，React 并不是为每一个事件处理函数生成一个全新的事件对象，事件对象会被复用，当事件处理函数被执行以后，
事件对象的所有属性会被设置为 null，所以在事件处理函数中，
你不能以异步的方式使用 React 的事件对象，
因为那时候事件对象的所有属性都是 null 了，或者已经不是你关心的那个事件了。
```
3. 尽量不要使用 addEventListener
React 内部自己实现了一套高效的事件机制，为了提高框架的性能，React 通过 DOM 事件冒泡，只在 document 节点上注册原生的 DOM 事件，React 内部自己管理所有组件的事件处理函数，以及事件的冒泡、捕获。

如果你通过 addEventListener 注册了某个 DOM 节点的某事件处理函数，并且通过 e.stopPropagation(); 阻断了事件的冒泡或者捕获，那么该节点下的所有节点上，同类型的 React 事件处理函数都会失效。


如下示例，虽然设置的链接的点击事件，但是它却执行不了
```
class CounterLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.querySelector('.my-link').addEventListener('click', (e) => {
      console.info('raw click');
      e.stopPropagation();
    })
  }
  handleClick(e) {
    e.preventDefault();
    console.info('react click');
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return (
      <div className="my-link">
        <a href="#" onClick={this.handleClick}>Clicked me {this.state.count} times.</a>    
      </div>
    )
  }
}
ReactDOM.render(<CounterLink/>, document.querySelector("#root"));
```
# Redux

```
    1. 维护一个数据仓库（store）管理整个应用的状态（state），确保数据的唯一来源。
    2. 可以通过 dispatch 方法分发一个 action，来通知 Redux 需要对数据进行变更。
    3. Redux 接收到 action 后可以依据 action 的类型对 state 进行相应的修改。
    4. 数据跟新后 Redux 会触发注册的监听器（如：更新组件属性），完成视图更新。
```