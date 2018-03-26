import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <div>
    <div>
      <NavLink exact to="/">
        Shenzjd
      </NavLink> | &nbsp;
      <NavLink exact to="/Shenzjdb">
        Shenzjdb
      </NavLink> | &nbsp;
      <NavLink exact to="/Shenzjdc">
        Shenzjdc
      </NavLink> | &nbsp;
    </div>
  </div>
);
export default NavBar;
