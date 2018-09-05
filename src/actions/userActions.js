import { USERDATA_ACTIONS } from '../constants/mixpanelConstants';

export const fetchUserDataBegin = () => ({
  type: USERDATA_ACTIONS.FETCH_USERDATA_BEGIN,
});

export const fetchUserDataSuccess = (
  allMeta,
  avgUser,
  totalUser,
  weeklyUser
) => ({
  type: USERDATA_ACTIONS.FETCH_USERDATA_SUCCESS,
  payload: {
    allMeta,
    avgUser,
    totalUser,
    weeklyUser,
  },
});

export const fetchUserDataFailure = error => ({
  type: USERDATA_ACTIONS.FETCH_USERDATA_FAILURE,
  payload: {
    error,
  },
});
