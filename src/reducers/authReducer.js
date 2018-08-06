import { ACTIONS } from '../constants/auth/authConstants';

const INITIAL_STATE = {
  error: null,
  isLogedIn: false,
  isLoggingIn: false,
  user: {
    id: null,
    name: null,
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

    case ACTIONS.LOGIN_FULFILLLED:
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

    case ACTIONS.REFRESH_FULFILLLED:
      return {
        ...state,
        token: {
          ...state.tokens,
          refresh: action.payload.refreshToken,
        },
      };
    case ACTIONS.LOGOUT_FULFILLLED: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
export default authReducer;
