import React from 'react';
import Login from '../view/loginView';
import Signup from '../view/signupView';
import Dashboard from '../view/dashboardView';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
