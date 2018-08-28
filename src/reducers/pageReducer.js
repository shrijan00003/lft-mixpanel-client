import { PAGE_ACTIONS } from '../constants/mixpanelConstants';

const INITIAL_STATE = {
  error: null,
  isLoaded: false,
  isLoading: false,
  pageData: null,
};

const pageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAGE_ACTIONS.FETCH_PAGE_BEGIN:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case PAGE_ACTIONS.FETCH_PAGE_SUCCESS:
      return {
        ...state,
        error: null,
        isLoaded: true,
        isLoading: false,
        pageData: action.payload.data,
      };

    case PAGE_ACTIONS.FETCH_PAGE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoaded: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default pageReducer;
