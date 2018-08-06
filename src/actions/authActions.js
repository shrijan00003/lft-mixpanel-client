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

export const refreshLogin = refreshToken => ({
  type: ACTIONS.REFRESH_FULFILLLED,
  payload: {
    refreshToken,
  },
});

export const setLogoutSuccess = () => ({
  type: ACTIONS.LOGOUT_FULFILLLED,
});
