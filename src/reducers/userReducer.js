import {
  FETCH_USERDATA_BEGIN,
  FETCH_USERDATA_SUCCESS,
  FETCH_USERDATA_FAILURE,
} from '../constants/mixpanelConstants';

const INITIAL_STATE = {
  error: null,
  isLoaded: false,
  isLoading: false,
  userData: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USERDATA_BEGIN:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case FETCH_USERDATA_SUCCESS:
      return {
        ...state,
        error: null,
        isLoaded: true,
        isLoading: false,
        userData: action.payload.totalUser,
        metaData: action.payload.allMeta,
        avgData: action.payload.avgUser,
      };

    case FETCH_USERDATA_FAILURE:
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
