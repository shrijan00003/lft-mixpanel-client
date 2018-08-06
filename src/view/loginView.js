import auth from '../utils/auth';
import UserLogin from './loginForm';
import { connect } from 'react-redux';
import { login } from '../services/authServices';
import {
  loginUserBegin,
  setLoginError,
  setLoginSuccess,
} from '../actions/authActions';

let statusMessage = '';
let loginResponse = null;

const mapStateToProps = state => {
  if (state.auth.isLoggingIn) {
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
    loginUser: async (email, password) => {
      dispatch(loginUserBegin());
      loginResponse = await login(email, password);

      if (loginResponse.status === 200) {
        auth.authenticate(loginResponse);
        const tokens = {
          accessToken: loginResponse.data.accessToken,
          refreshToken: loginResponse.data.refreshToken,
        };

        const user = {
          id: loginResponse.data.id,
          name: loginResponse.data.userName,
        };
        dispatch(setLoginSuccess(user, tokens));
      } else {
        dispatch(setLoginError(loginResponse.response));
      }
    },
    setLoginError: () => dispatch(setLoginError()),
    setLoginSuccess: (user, token) => dispatch(setLoginSuccess(user, token)),
  };
};

const userLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLogin);

export default userLogin;
