import { FETCH_CHART_SUCCESS } from '../actions/chartAction';

const INITIAL_STATE = {
  error: null,
  isLoaded: false,
  //   isLoading: false,
  chartData: null,
  chartSingleData: null,
  //   charts: [],
  //   metadata: {},
  //   loading: true,
  //   error: null,
};

const chartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case FETCH_CHARTS_BEGIN:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null,
    //   };

    case FETCH_CHART_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        chartData: action.payload.chart,
        chartSingleData: action.payload.singleChart, // data: action.payload.data,
        //options: action.payload.options
      };

    // case FETCH_CHARTS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //     charts: [],
    //   };

    default:
      return state;
  }
};

export default chartReducer;
