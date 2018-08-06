import { ACTIONS } from '../constants/auth/authConstants';

export const loginUserBegin = data => ({
  type: ACTIONS.LOGIN_PENDING,
});

export const setLoginSuccess = (user = {}, tokens = {}) => ({
  type: ACTIONS.LOGIN_FULFILLLED,
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
  type: ACTIONS.REFRESH_FULFILLLED,
  payload: {
    tokens,
  },
});

export const logoutUserBegin = () => ({
  type: ACTIONS.LOGOUT_PENDING,
});

export const setLogoutSuccess = () => ({
  type: ACTIONS.LOGOUT_FULFILLLED,
});

export const setLogoutError = error => ({
  type: ACTIONS.LOGOUT_REJECTED,
  payload: {
    error,
  },
});
