import {
  FETCH_PROFILE_BEGIN,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
} from '../constants/userProfileConstants';

export const fetchProfileBegin = () => ({
  type: FETCH_PROFILE_BEGIN,
});

export const fetchProfileSuccess = data => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: {
    data,
  },
});

export const fetchProfileFailure = error => ({
  type: FETCH_PROFILE_FAILURE,
  payload: {
    error,
  },
});
