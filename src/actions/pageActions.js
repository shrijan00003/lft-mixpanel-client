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
