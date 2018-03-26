import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css';
const NavBar = () => (
  <div>
    <div>
      <NavLink exact to="/" className="blue">
        Shenzjd
      </NavLink>{' '}
      | &nbsp;
      <NavLink exact to="/Shenzjdb/ILoveWeb" activeClassName="active">
        Shenzjdb
      </NavLink>{' '}
      | &nbsp;
      <NavLink exact to="/Shenzjdc" activeClassName="active">
        Shenzjdc
      </NavLink>{' '}
      | &nbsp;
      <NavLink to="/redirect" activeClassName="active">
        Redirect
      </NavLink>{' '}
      | &nbsp;
      <NavLink to="/sdfsdaf" activeClassName="active">
        404
      </NavLink>{' '}
      | &nbsp; 
    </div>
  </div>
);
export default NavBar;
