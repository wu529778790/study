import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { GlobalStyle } from './style'
import { GlobalIconfont } from './statics/iconfont/iconfont'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './common/header/index'
import Home from './pages/home'
import Detail from './pages/detail/loadabal'
import Login from './pages/login'
import Write from './pages/write'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GlobalStyle />
        <GlobalIconfont />
        <BrowserRouter>
          <div>
            <Header />
            <Route path='/' exact component={Home}></Route>
            <Route path='/detail/:id' exact component={Detail}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/write' exact component={Write}></Route>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
