import store from '../store';
import auth from '../utils/auth';
import {
  ID,
  NAME,
  ACTIONS,
  USER_NAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '../constants/authConstants';

export const loginUserBegin = () => ({
  type: ACTIONS.LOGIN_PENDING,
});

export const setLoginSuccess = (user = {}, tokens = {}) => ({
  type: ACTIONS.LOGIN_FULFILLED,
  payload: {
    user,
    tokens,
  },
});

export const setLoginError = error => ({
  type: ACTIONS.LOGIN_REJECTED,
  payload: {
    error,
  },
});

export const refreshLogin = (tokens = {}) => ({
  type: ACTIONS.REFRESH_FULFILLED,
  payload: {
    tokens,
  },
});

export const logoutUserBegin = () => ({
  type: ACTIONS.LOGOUT_PENDING,
});

export const setLogoutSuccess = () => ({
  type: ACTIONS.LOGOUT_FULFILLED,
});

export const setLogoutError = error => ({
  type: ACTIONS.LOGOUT_REJECTED,
  payload: {
    error,
  },
});

export const setLoginDetailsAfterReload = (user, tokens) => ({
  type: ACTIONS.PAGE_RELODED,
  payload: {
    user,
    tokens,
  },
});

window.onload = () => {
  if (auth.getToken()) {
    store.dispatch(
      setLoginDetailsAfterReload(
        {
          id: auth.getDetails(ID),
          name: auth.getDetails(NAME),
          userName: auth.getDetails(USER_NAME),
        },
        {
          accessToken: auth.getToken(ACCESS_TOKEN),
          refreshToken: auth.getToken(REFRESH_TOKEN),
        }
      )
    );
  }
};
