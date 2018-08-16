import {
  FETCH_TRACK_BEGIN,
  FETCH_TRACK_SUCCESS,
  FETCH_TRACK_FAILURE,
} from '../constants/trackConstants';

export const fetchTrackBegin = () => ({
  type: FETCH_TRACK_BEGIN,
});

export const fetchTrackSuccess = data => ({
  type: FETCH_TRACK_SUCCESS,
  payload: {
    data,
  },
});

export const fetchTrackFailure = error => ({
  type: FETCH_TRACK_FAILURE,
  payload: {
    error,
  },
});
