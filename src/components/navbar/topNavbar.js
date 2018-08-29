import React from 'react';
import auth from '../../utils/auth';
import { NavLink, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './navbar.css';

let $elem = null;
let $sidebar = null;
let menuCollapse = true;

const LogoutButton = withRouter(({ history }) => (
  <li onClick={() => history.push('/logout')}>
    <span>Log out</span>
    <FontAwesomeIcon icon="sign-out-alt" pull="right" />
  </li>
));

const TopNavbar = () => {
  let navbarCss = auth.getToken() ? 'navbar-full' : 'navbar-normal';
  navbarCss += ' top-navbar row';

  return (
    <header>
      <nav className={navbarCss}>
        {auth.getToken() ? (
          <div id="" className="navbar-logo side-nav">
            <NavLink to={{ pathname: '/dashboard' }}>
              <FontAwesomeIcon icon="bug" />
              <span> MixPanel</span>
            </NavLink>
          </div>
        ) : (
          <div className="navbar-logo">
            <NavLink to={{ pathname: '/dashboard' }}> MixPanel</NavLink>
          </div>
        )}

        <ul>
          {auth.getToken() ? (
            <span>
              <li id="collapse-menu" onClick={() => collapseMenu()}>
                <FontAwesomeIcon icon="bars" />
              </li>
            </span>
          ) : (
            <span>
              <NavLink to={{ pathname: '/dashboard' }}>
                <li>About</li>
              </NavLink>
              <NavLink to={{ pathname: '/dashboard' }}>
                <li>Contact</li>
              </NavLink>
            </span>
          )}
        </ul>

        <div className="navbar-right">
          <ul>
            {!auth.getToken() ? (
              <div>
                <NavLink to={{ pathname: '/login' }}>
                  <li>Login</li>
                </NavLink>
                <NavLink to={{ pathname: '/signup' }}>
                  <li>Sign Up</li>
                </NavLink>
              </div>
            ) : (
              <li>
                {auth.getUserDetails('name')}
                <div className="profile-pic-topnavbar">
                  <img src={require('../../images/dp.jpg')} alt="down arrow" />
                </div>
                <ul>
                  <LogoutButton />
                  <NavLink
                    to={{ pathname: '/profile' }} // + auth.getStoreState(USER_NAME) }}
                  >
                    <li>
                      <span>Profile</span>{' '}
                      <FontAwesomeIcon icon="user" pull="right" />
                    </li>
                  </NavLink>
                  <li>
                    <span>Setting</span>
                    <FontAwesomeIcon icon="user-cog" pull="right" />
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

const collapseMenu = () => {
  $sidebar = document.getElementById('sidebar');
  $elem = document.getElementsByClassName('side-nav');

  if (menuCollapse) {
    $elem[0].classList.add('collapsed-menu');
    $elem[1].classList.add('collapsed-menu');
    $sidebar.classList.add('collapsed-sidebar');
    menuCollapse = false;
  } else {
    $elem[0].classList.remove('collapsed-menu');
    $elem[1].classList.remove('collapsed-menu');
    $sidebar.classList.remove('collapsed-sidebar');
    menuCollapse = true;
  }
};

export default TopNavbar;
