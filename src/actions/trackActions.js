import {
  FETCH_TRACK_BEGIN,
  FETCH_TRACK_SUCCESS,
  FETCH_TRACK_FAILURE,
  FETCH_TRACK_LOCATION_BEGIN,
  FETCH_TRACK_LOCATION_SUCCESS,
  FETCH_TRACK_LOCATION_FAILURE,
} from '../constants/mixpanelConstants';

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
export const fetchTrackWithLocationBegin = () => ({
  type: FETCH_TRACK_LOCATION_BEGIN,
});

export const fetchTrackWithLocationSuccess = data => ({
  type: FETCH_TRACK_LOCATION_SUCCESS,
  payload: {
    data,
  },
});

export const fetchTrackWithLocationFailure = error => ({
  type: FETCH_TRACK_LOCATION_FAILURE,
  payload: {
    error,
  },
});
