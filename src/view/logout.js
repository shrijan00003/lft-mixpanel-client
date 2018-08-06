import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../services/authServices';
import { setLogoutSuccess } from '../actions/authActions';

let loginResponse = null;

const mapStateToProps = state => {
  return {
    isLogedIn: state.auth.isLogedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: async () => {
      loginResponse = await logout();

      if (loginResponse.status === 200) {
        dispatch(setLogoutSuccess());
        return loginResponse;
      } else {
        console.log(loginResponse.response);
        return loginResponse.response;
      }
    },
  };
};

// const Logout = ({ isLogedIn, logoutUser = f => f }) => {
//   let Component = <Redirect to={'/dashboard'} />;

//   const logout = new Promise((resolve, reject) => {
//     resolve(logoutUser());
//   }).then(res => {
//     if (res.status === 200) {
//       Component = <Redirect to={'/login'} />;
//     }
//   });
//   const loadLoginPage = setInterval(() => {
//     return Component;
//   }, 1);
// };

class Logout extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogedOut: false,
    };
  }

  componentDidMount = () => {
    new Promise((resolve, reject) => {
      resolve(this.props.logoutUser());
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          isLogedOut: true,
        });
      }
    });
  };

  render() {
    return this.state.isLogedOut ? <Redirect to={'/login'} /> : <span />;
  }
}

const EnhancedLogout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);

export default EnhancedLogout;
