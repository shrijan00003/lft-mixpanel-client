import React from 'react';
import Logout from '../view/logout';
import Login from '../view/loginView';
import Signup from '../view/signupView';
import PrivateRoute from './privateRoutes';
import NavbarView from '../view/navbarView';
import Dashboard from '../view/dashboardView';
import SideNavView from '../components/navbar/sideNavbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <NavbarView />
        <SideNavView />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/logout" component={Logout} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
