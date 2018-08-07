import React from 'react';
import auth from '../../utils/auth';

const SideNavbar = () => {
  return auth.getToken() ? (
    <div className="aside">
      <div className="col-12 side-navbar">
        <h1>SideNav</h1>
      </div>
    </div>
  ) : (
    <span />
  );
};

export default SideNavbar;
