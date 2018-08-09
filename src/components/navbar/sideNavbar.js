import React from 'react';
import auth from '../../utils/auth';
import { NavLink } from 'react-router-dom';
// FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faEye,
  faChalkboardTeacher,
  faUserFriends,
  faMap,
  faBookmark,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faTachometerAlt,
  faEye,
  faChalkboardTeacher,
  faUserFriends,
  faMap,
  faBookmark,
  faAngleDown
);

let $elem = null;
let showSubMenu = true;

const SideNavbar = () => {
  return auth.getToken() ? (
    <div className="aside">
      <div className="side-navbar">
        <div className="side-navbar-title">
          <h1>MENU</h1>
        </div>
        <div className="side-navbar-menu-list">
          <ul>
            <NavLink to={{ pathname: '/dashboard' }}>
              <li
                id="dashboard"
                className="menu-list"
                onClick={() => setActiveMenu()}
              >
                <div className="list-menu-titles">
                  <FontAwesomeIcon icon="tachometer-alt" />
                  <span className="list-span">Dashboard</span>
                </div>
              </li>
            </NavLink>
            <NavLink to={{ pathname: '/customization' }}>
              <li
                id="customization"
                className="menu-list"
                onClick={() => setActiveMenu()}
              >
                <div className="list-menu-titles">
                  <FontAwesomeIcon icon="chalkboard-teacher" />
                  <span className="list-span">Customization</span>
                </div>
              </li>
            </NavLink>
            <NavLink to={{ pathname: '/realtime' }}>
              <li
                id="realtime"
                className="menu-list"
                onClick={() => setActiveMenu()}
              >
                <div className="list-menu-titles">
                  <FontAwesomeIcon icon="eye" />
                  <span className="list-span">Real-time</span>
                </div>
              </li>
            </NavLink>
            <NavLink to={{ pathname: '/audience' }}>
              <li
                id="audience"
                className="menu-list"
                onClick={() => (showHideSubMenu(), setActiveMenu(true))}
              >
                <div className="list-menu-titles">
                  <FontAwesomeIcon icon="user-friends" />
                  <span className="list-span">Audience</span>
                  <FontAwesomeIcon icon="angle-down" pull="right" />
                </div>
              </li>
            </NavLink>
            <ul id="submenu" className="side-navbar-sub-menu-list">
              <NavLink to={{ pathname: '/overview' }}>
                <li
                  id="overview"
                  className="sub-menu-list"
                  onClick={() => setActiveSubMenu()}
                >
                  <div className="list-menu-titles sub-menu">
                    <FontAwesomeIcon icon="bookmark" />
                    <span className="list-span">Overview</span>
                  </div>
                </li>
              </NavLink>
              <NavLink to={{ pathname: '/statistics' }}>
                <li
                  id="statistics"
                  className="sub-menu-list"
                  onClick={() => setActiveSubMenu()}
                >
                  <div className="list-menu-titles sub-menu">
                    <FontAwesomeIcon icon="bookmark" />
                    <span className="list-span">Statatics</span>
                  </div>
                </li>
              </NavLink>
              <NavLink to={{ pathname: '/filter' }}>
                <li
                  id="filter"
                  className="sub-menu-list"
                  onClick={() => setActiveSubMenu()}
                >
                  <div className="list-menu-titles sub-menu">
                    <FontAwesomeIcon icon="bookmark" />
                    <span className="list-span">Filter</span>
                  </div>
                </li>
              </NavLink>
            </ul>
            <NavLink to={{ pathname: '/country' }}>
              <li
                id="country"
                className="menu-list"
                onClick={() => setActiveMenu()}
              >
                <div className="list-menu-titles">
                  <FontAwesomeIcon icon="map" />
                  <span className="list-span">Country</span>
                </div>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <span />
  );
};

const showHideSubMenu = () => {
  $elem = document.getElementById('submenu');

  if (showSubMenu) {
    $elem.classList.add('show-sub-memu');
    showSubMenu = false;
  } else {
    $elem.classList.remove('show-sub-memu');
    showSubMenu = true;
  }
};

const setActiveMenu = (hasSubMenu = false) => {
  setTimeout(() => {
    let segment = window.location.pathname.split('/')[1];
    $elem = document.getElementsByClassName('menu-list');
    for (let i = 0; i < $elem.length; i++) {
      $elem[i].classList.remove('active-memu');
    }

    $elem = document.getElementById(segment);
    $elem.classList.add('active-memu');

    if (!hasSubMenu && showSubMenu === false) {
      showHideSubMenu();
    }
  }, 100);
};

const setActiveSubMenu = () => {
  setTimeout(() => {
    let segment = window.location.pathname.split('/')[1];
    $elem = document.getElementsByClassName('sub-menu-list');
    for (let i = 0; i < $elem.length; i++) {
      $elem[i].classList.remove('active-memu');
    }

    $elem = document.getElementById(segment);
    $elem.classList.add('active-memu');
  }, 100);
};
export default SideNavbar;
