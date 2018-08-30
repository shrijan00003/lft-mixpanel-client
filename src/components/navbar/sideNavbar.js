import React from 'react';
import auth from '../../utils/auth';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let $elem = null;
let showSubMenu = true;

const addEventListnerToList = () => {
  let links = document.querySelectorAll('.menu-list');

  for (let i = 0, len = links.length; i < len; i++) {
    links[i].addEventListener(
      'click',
      function(e) {
        let targetEl = e.target;
        let inkEl = targetEl.querySelector('.ink');

        if (inkEl) {
          inkEl.classList.remove('animate');
        } else {
          inkEl = document.createElement('span');
          inkEl.classList.add('ink');
          inkEl.style.width = inkEl.style.height =
            Math.max(targetEl.offsetWidth, targetEl.offsetHeight) + 'px';
          targetEl.appendChild(inkEl);
        }

        inkEl.style.left = e.offsetX - inkEl.offsetWidth / 2 + 'px';
        inkEl.style.top = e.offsetY - inkEl.offsetHeight / 2 + 'px';
        inkEl.classList.add('animate');

        setTimeout(() => {
          let segment = window.location.pathname.split('/')[1];
          $elem = document.getElementsByClassName('menu-list');
          for (let i = 0; i < $elem.length; i++) {
            $elem[i].classList.remove('active-memu');
          }

          $elem = document.getElementById(segment);
          $elem.classList.add('active-memu');
          const hasChildren =
            $elem.children[0].className.split(' ')[0] === 'has-sub-menu'
              ? true
              : false;
          // console.log($elem.children[0].className.split(' ')[0]);
          if (!hasChildren && showSubMenu === false) {
            showHideSubMenu();
          }
        }, 100);
      },
      false
    );
  }
};

class SideNavbar extends React.Component {
  componentDidMount = () => {
    addEventListnerToList();
  };

  componentDidUpdate = () => {
    addEventListnerToList();
  };

  render() {
    return auth.getToken() ? (
      <div id="sidebar" className="sidebar">
        <div id="" className="aside side-nav">
          <div className="side-navbar">
            <div className="side-navbar-title">
              <h1>MENU</h1>
            </div>
            <div className="side-navbar-menu-list">
              <ul>
                <NavLink
                  to={{
                    pathname: '/dashboard',
                  }}
                >
                  <li id="dashboard" className="menu-list">
                    <div className="list-menu-titles">
                      <FontAwesomeIcon icon="tachometer-alt" />
                      <span className="list-span">Dashboard</span>
                    </div>
                  </li>
                </NavLink>
                <NavLink to={{ pathname: '/customization' }}>
                  <li id="customization" className="menu-list">
                    <div className="list-menu-titles">
                      <FontAwesomeIcon icon="chalkboard-teacher" />
                      <span className="list-span">Customize</span>
                    </div>
                  </li>
                </NavLink>
                <NavLink to={{ pathname: '/realtime' }}>
                  <li id="realtime" className="menu-list">
                    <div className="list-menu-titles">
                      <FontAwesomeIcon icon="eye" />
                      <span className="list-span">Real Time</span>
                    </div>
                  </li>
                </NavLink>
                <NavLink to={{ pathname: '/audience' }}>
                  <li
                    id="audience"
                    className="menu-list"
                    onClick={() => showHideSubMenu()}
                  >
                    <div className="has-sub-menu list-menu-titles">
                      <FontAwesomeIcon icon="user-friends" />
                      <span className="list-span">Audience</span>
                      <FontAwesomeIcon icon="angle-down" pull="right" />
                    </div>
                  </li>
                </NavLink>

                <ul id="submenu" className="side-navbar-sub-menu-list">
                  <NavLink to={{ pathname: '/audience/overview' }}>
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
                  <NavLink to={{ pathname: '/audience/statistics' }}>
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

                  <NavLink to={{ pathname: '/audience/filter' }}>
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
                  <NavLink to={{ pathname: '/audience/tracks' }}>
                    <li
                      id="tracks"
                      className="sub-menu-list"
                      onClick={() => setActiveSubMenu()}
                    >
                      <div className="list-menu-titles sub-menu">
                        <FontAwesomeIcon icon="bookmark" />
                        <span className="list-span">Tracks</span>
                      </div>
                    </li>
                  </NavLink>
                  <NavLink to={{ pathname: '/audience/pages' }}>
                    <li
                      id="pages"
                      className="sub-menu-list"
                      onClick={() => setActiveSubMenu()}
                    >
                      <div className="list-menu-titles sub-menu">
                        <FontAwesomeIcon icon="bookmark" />
                        <span className="list-span">Pages</span>
                      </div>
                    </li>
                  </NavLink>
                </ul>

                <NavLink to={{ pathname: '/country' }}>
                  <li id="country" className="menu-list">
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
      </div>
    ) : (
      <span />
    );
  }
}

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

const setActiveSubMenu = () => {
  setTimeout(() => {
    let segment = window.location.pathname.split('/')[2];
    $elem = document.getElementsByClassName('sub-menu-list');
    for (let i = 0; i < $elem.length; i++) {
      $elem[i].classList.remove('active-memu');
    }
    $elem = document.getElementById(segment);
    $elem.classList.add('active-memu');
  }, 100);
};

export default SideNavbar;
