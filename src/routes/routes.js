import React from 'react';
import auth from '../utils/auth';
import Logout from '../view/logout';
import Login from '../view/loginView';
import Signup from '../view/signupView';
import PrivateRoute from './privateRoutes';
import NotFound from '../view/notFoundView';
import NavbarView from '../view/navbarView';
// import { Dashboard } from '../view/dashboard';
// import { GeoChart1 } from '../view/geoChart';
import GeoChartUI from '../view/geoChartUI';
import { Tracks, Pages, Dashboard, Country } from '../view/dashboard';
// import Country from '../view/country';
import ProfileView from '../view/profileView';
import { USER_NAME } from '../constants/authConstants';
import SideNavView from '../components/navbar/sideNavbar';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div className="row">
        <NavbarView />

        <SideNavView />

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/logout" component={Logout} />
          {/* <PrivateRoute
            exact
            path="/"
            render={() => <Redirect to="/dashboard" />}
          />*/}
          <PrivateRoute exact path="/dashboard" component={Dashboard} />

          <PrivateRoute exact path="/audience/tracks" component={Tracks} />
          <PrivateRoute exact path="/audience/pages" component={Pages} />

          <PrivateRoute exact path="/audience" component={Tracks} />
          <PrivateRoute exact path="/country" component={Country} />

          <PrivateRoute
            exact
            path={'/profile'} //+ auth.getDetails(USER_NAME)}
            component={ProfileView}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
