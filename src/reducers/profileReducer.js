import {
  FETCH_PROFILE_BEGIN,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
} from '../constants/userProfileConstants';

const INITIAL_STATE = {
  error: null,
  isLoaded: false,
  isLoading: false,
  profileData: null,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROFILE_BEGIN:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        error: null,
        isLoaded: true,
        isLoading: false,
        profileData: action.payload.data.userProfile,
      };

    case FETCH_PROFILE_FAILURE:
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

export default profileReducer;
