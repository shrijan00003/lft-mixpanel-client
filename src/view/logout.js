import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../services/authServices';
import {
  logoutUserBegin,
  setLogoutSuccess,
  setLogoutError,
} from '../actions/authActions';

let loginResponse = null;
let statusMessage = null;
const mapStateToProps = state => {
  if (state.auth.isLoggingOut) {
    statusMessage = 'Please wait...';
  } else if (state.auth.error) {
    statusMessage = state.auth.error.data.message;
  } else {
    statusMessage = null;
  }

  return {
    loginStatus: statusMessage,
    isLogedIn: state.auth.isLogedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: async () => {
      dispatch(logoutUserBegin());
      loginResponse = await logout();

      if (loginResponse.status === 200) {
        dispatch(setLogoutSuccess());
      } else {
        dispatch(setLogoutError(loginResponse.response));
      }
    },
  };
};

const Logout = ({ loginStatus, isLogedIn, logoutUser = f => f }) => {
  logoutUser();

  if (!isLogedIn) {
    return <Redirect to={'/login'} />;
  } else {
    return <span>{loginStatus}</span>;
  }
};

// class Logout extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       isLogedOut: false,
//     };
//   }

//   componentDidMount = () => {
//     new Promise((resolve, reject) => {
//       resolve(this.props.logoutUser());
//     }).then(res => {
//       if (res.status === 200) {
//         this.setState({
//           isLogedOut: true,
//         });
//       }
//     });
//   };

//   render() {
//     return this.state.isLogedOut ? <Redirect to={'/login'} /> : <span />;
//   }
// }

const EnhancedLogout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);

export default EnhancedLogout;
