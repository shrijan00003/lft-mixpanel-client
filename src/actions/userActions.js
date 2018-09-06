import { fetchUsersData } from '../services/userDataServices';
import { USERDATA_ACTIONS } from '../constants/mixpanelConstants';

export const fetchUserDataBegin = () => ({
  type: USERDATA_ACTIONS.FETCH_USERDATA_BEGIN,
});

export const fetchUserDataSuccess = (
  allMeta,
  avgUser,
  totalUser,
  weeklyUser,
  totalCountries
) => ({
  type: USERDATA_ACTIONS.FETCH_USERDATA_SUCCESS,
  payload: {
    allMeta,
    avgUser,
    totalUser,
    weeklyUser,
    totalCountries,
  },
});

export const fetchUserDataFailure = error => ({
  type: USERDATA_ACTIONS.FETCH_USERDATA_FAILURE,
  payload: {
    error,
  },
});

export const getUserData = () => {
  let userDataResponse = null;
  return async dispatch => {
    dispatch(fetchUserDataBegin());
    userDataResponse = await fetchUsersData();

    console.log(userDataResponse, 'userdata');

    if (userDataResponse.status === 200) {
      dispatch(
        fetchUserDataSuccess(
          userDataResponse.data.allMetadata,
          userDataResponse.data.averageUser,
          userDataResponse.data.totalUserData,
          userDataResponse.data.monthlyUserData,
          userDataResponse.data.totalCountriesData
        )
      );
    } else {
      dispatch(fetchUserDataFailure(userDataResponse.response));
    }
  };
};
