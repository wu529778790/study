import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Buttons from './pages/ui/buttons'
import NoMatch from './pages/nomatch'
import Home from './pages/home'

export default class IRouter extends React.Component {
  render () {
    return (
      <Router>
        <App>
          <Route path="/" render={() => 
            <Admin>
              <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/ui/buttons" component={Buttons}></Route>
                <Route component={NoMatch}></Route>
              </Switch>
            </Admin>
          } />
        </App>
      </Router>
    )
  }
}