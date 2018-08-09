import React from 'react';
import auth from '../../utils/auth';
import { NavLink, withRouter } from 'react-router-dom';

import './navbar.css';

const LogoutButton = withRouter(({ history }) => (
  <li onClick={() => history.push('/logout')}>Log out</li>
));

const TopNavbar = () => {
  let navbarCss = auth.getToken() ? 'navbar-full' : 'navbar-normal';
  navbarCss += ' top-navbar row';

  return (
    <header>
      <nav className={navbarCss}>
        <div className="navbar-logo">
          <NavLink to={{ pathname: '/dashboard' }}>MixPanel</NavLink>
        </div>

        <ul>
          {auth.getToken() ? (
            <span>
              <li>
                <NavLink to={{ pathname: '/dashboard' }}>Dashboard </NavLink>
              </li>
            </span>
          ) : (
            <span />
          )}
          <li>
            <NavLink to={{ pathname: '/dashboard' }}>About </NavLink>
          </li>
          <li>
            <NavLink to={{ pathname: '/dashboard' }}>Contact </NavLink>
          </li>
        </ul>

        <div className="navbar-right">
          <ul>
            {!auth.getToken() ? (
              <div>
                <li>
                  <NavLink to={{ pathname: '/login' }}>Login </NavLink>
                </li>
                <li>
                  <NavLink to={{ pathname: '/signup' }}>Sign Up </NavLink>
                </li>
              </div>
            ) : (
              <li>
                {auth.getUserDetails('name')}
                <div className="profile-pic-topnavbar">
                  <img src={require('../../images/dp.jpg')} alt="down arrow" />
                </div>
                <ul>
                  <LogoutButton />
                  <li>Setting</li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default TopNavbar;
