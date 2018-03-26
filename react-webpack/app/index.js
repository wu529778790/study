import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Shenzjd from './shenzjd';
import Shenzjdb from './shenzjdb';
import Shenzjdc from './shenzjdc';
import Nav from './nav';

ReactDom.render(
  <Router>
    <div>
      <Nav />
      <Route exact path="/" component={Shenzjd} />
      <Route exact path="/Shenzjdb" component={Shenzjdb} />
      <Route exact path="/Shenzjdc" component={Shenzjdc} />
    </div>
  </Router>,
  document.getElementById('app')
);
