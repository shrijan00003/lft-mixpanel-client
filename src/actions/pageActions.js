import { fetchPagesData } from '../services/pageServices';
import { PAGE_ACTIONS } from '../constants/mixpanelConstants';

export const fetchPageBegin = () => ({
  type: PAGE_ACTIONS.FETCH_PAGE_BEGIN,
});

export const fetchPageSuccess = data => ({
  type: PAGE_ACTIONS.FETCH_PAGE_SUCCESS,
  payload: {
    data,
  },
});

export const fetchPageFailure = error => ({
  type: PAGE_ACTIONS.FETCH_PAGE_FAILURE,
  payload: {
    error,
  },
});

export const getPage = () => {
  let pageResponse = null;
  return async dispatch => {
    dispatch(fetchPageBegin());
    pageResponse = await fetchPagesData();
    if (pageResponse.status === 200) {
      dispatch(fetchPageSuccess(pageResponse.data));
    } else {
      dispatch(fetchPageFailure(pageResponse.response));
    }
  };
};
