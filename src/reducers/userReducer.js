import { USERDATA_ACTIONS } from '../constants/mixpanelConstants';

const INITIAL_STATE = {
  error: null,
  isLoaded: false,
  isLoading: false,
  userData: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERDATA_ACTIONS.FETCH_USERDATA_BEGIN:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case USERDATA_ACTIONS.FETCH_USERDATA_SUCCESS:
      return {
        ...state,
        error: null,
        isLoaded: true,
        isLoading: false,
        userData: action.payload.totalUser,
        metaData: action.payload.allMeta,
        avgData: action.payload.avgUser,
        weeklyUser: action.payload.weeklyUser,
        totalCountries: action.payload.totalCountries,
      };

    case USERDATA_ACTIONS.FETCH_USERDATA_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoaded: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
