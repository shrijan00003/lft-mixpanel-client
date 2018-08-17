import {
  FETCH_PAGE_BEGIN,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_FAILURE,
} from '../constants/trackConstants';

export const fetchPageBegin = () => ({
  type: FETCH_PAGE_BEGIN,
});

export const fetchPageSuccess = data => ({
  type: FETCH_PAGE_SUCCESS,
  payload: {
    data,
  },
});

export const fetchPageFailure = error => ({
  type: FETCH_PAGE_FAILURE,
  payload: {
    error,
  },
});
