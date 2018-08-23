import {
  FETCH_USERDATA_BEGIN,
  FETCH_USERDATA_SUCCESS,
  FETCH_USERDATA_FAILURE,
} from '../constants/mixpanelConstants';

export const fetchUserDataBegin = () => ({
  type: FETCH_USERDATA_BEGIN,
});

export const fetchUserDataSuccess = (allMeta, avgUser, totalUser) => ({
  type: FETCH_USERDATA_SUCCESS,
  payload: {
    allMeta,
    avgUser,
    totalUser,
  },
});

export const fetchUserDataFailure = error => ({
  type: FETCH_USERDATA_FAILURE,
  payload: {
    error,
  },
});
