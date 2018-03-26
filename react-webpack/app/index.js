import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Shenzjd from './shenzjd';
import Shenzjdb from './shenzjdb';
import Shenzjdc from './shenzjdc';
import Nav from './nav';
import Error from './404';

ReactDom.render(
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Shenzjd} />
        <Route exact path="/Shenzjdb/:param" component={Shenzjdb} />
        <Route exact path="/Shenzjdc" component={Shenzjdc} />
        <Redirect from="/redirect" to="/Shenzjdc" />
        <Route component={Error} />
      </Switch>
    </div>
  </Router>,
  document.getElementById('app')
);
