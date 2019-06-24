import { TRACK_ACTIONS } from '../constants/mixpanelConstants';

const INITIAL_STATE = {
  error: null,
  isLoaded: false,
  isLoading: false,
  trackData: null,
  locIsLoading: false,
  locIsLoaded: false,
  trackDataWithLoc: null,
};

const trackReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRACK_ACTIONS.FETCH_TRACK_BEGIN:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case TRACK_ACTIONS.FETCH_TRACK_SUCCESS:
      return {
        ...state,
        error: null,
        isLoaded: true,
        isLoading: false,
        trackData: action.payload.data,
      };

    case TRACK_ACTIONS.FETCH_TRACK_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoaded: false,
        isLoading: false,
      };

    case TRACK_ACTIONS.FETCH_TRACK_LOCATION_BEGIN:
      return {
        ...state,
        error: null,
        lociILoading: true,
      };

    case TRACK_ACTIONS.FETCH_TRACK_LOCATION_SUCCESS:
      return {
        ...state,
        error: null,
        LocIsLoaded: true,
        LocIsLoading: false,
        trackDataWithLoc: action.payload.data,
      };

    case TRACK_ACTIONS.FETCH_TRACK_LOCATION_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        locIsLoaded: false,
        locIsLoading: false,
      };

    default:
      return state;
  }
};

export default trackReducer;
