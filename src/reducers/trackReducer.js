import {
  FETCH_TRACK_BEGIN,
  FETCH_TRACK_SUCCESS,
  FETCH_TRACK_FAILURE,
} from '../constants/trackConstants';

const INITIAL_STATE = {
  error: null,
  isLoaded: false,
  isLoading: false,
  trackData: null,
};

const trackReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TRACK_BEGIN:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case FETCH_TRACK_SUCCESS:
      return {
        ...state,
        error: null,
        isLoaded: true,
        isLoading: false,
        trackData: action.payload.data.tracksWithMeta,
      };

    case FETCH_TRACK_FAILURE:
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

export default trackReducer;
