import { fetchTracksData } from '../services/trackServices';
import { TRACK_ACTIONS } from '../constants/mixpanelConstants';

export const fetchTrackBegin = () => ({
  type: TRACK_ACTIONS.FETCH_TRACK_BEGIN,
});

export const fetchTrackSuccess = data => ({
  type: TRACK_ACTIONS.FETCH_TRACK_SUCCESS,
  payload: {
    data,
  },
});

export const fetchTrackFailure = error => ({
  type: TRACK_ACTIONS.FETCH_TRACK_FAILURE,
  payload: {
    error,
  },
});
// export const fetchTrackWithLocationBegin = () => ({
//   type: TRACK_ACTIONS.FETCH_TRACK_LOCATION_BEGIN,
// });

// export const fetchTrackWithLocationSuccess = data => ({
//   type: TRACK_ACTIONS.FETCH_TRACK_LOCATION_SUCCESS,
//   payload: {
//     data,
//   },
// });

// export const fetchTrackWithLocationFailure = error => ({
//   type: TRACK_ACTIONS.FETCH_TRACK_LOCATION_FAILURE,
//   payload: {
//     error,
//   },
// });

export const getTrack = () => {
  let trackResponse = null;
  return async dispatch => {
    dispatch(fetchTrackBegin());
    trackResponse = await fetchTracksData();

    if (trackResponse.status === 200) {
      dispatch(fetchTrackSuccess(trackResponse.data));
    } else {
      dispatch(fetchTrackFailure(trackResponse.response));
    }
  };
};
