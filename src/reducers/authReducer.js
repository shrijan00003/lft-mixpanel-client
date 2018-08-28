import { ACTIONS } from '../constants/authConstants';

const INITIAL_STATE = {
  error: null,
  isLoggingIn: false,
  isLoggingOut: false,
  isLogedIn: false,
  user: {
    id: null,
    name: null,
    userName: null,
  },
  tokens: {
    accessToken: null,
    refreshToken: null,
  },
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_PENDING:
      return {
        ...state,
        isLoggingIn: true,
        error: null,
      };

    case ACTIONS.LOGIN_FULFILLED:
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isLogedIn: true,
        isLoggingIn: false,
      };
    case ACTIONS.LOGIN_REJECTED:
      return {
        ...state,
        isLogedIn: false,
        isLoggingIn: false,
        error: action.payload.error,
      };

    case ACTIONS.REFRESH_FULFILLED:
      return {
        ...state,
        tokens: action.payload.tokens,
      };

    case ACTIONS.LOGOUT_PENDING: {
      return {
        ...state,
        isLoggingOut: true,
        error: null,
      };
    }

    case ACTIONS.LOGOUT_FULFILLED: {
      return INITIAL_STATE;
    }

    case ACTIONS.LOGOUT_REJECTED: {
      return {
        ...state,
        isLoggingOut: false,
        error: action.payload.error,
      };
    }

    case ACTIONS.PAGE_RELODED:
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isLogedIn: true,
      };

    default:
      return state;
  }
};

export default authReducer;
