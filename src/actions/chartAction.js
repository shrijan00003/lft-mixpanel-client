// export const FETCH_CHARTS_BEGIN = "FETCH_CHARTS_BEGIN";
export const FETCH_CHART_SUCCESS = 'FETCH_CHART_SUCCESS';
// export const FETCH_CHARTS_FAILURE = "FETCH_CHARTS_FAILURE";

// export const fetchchartsBegin = () => ({
//   type: FETCH_CHARTS_BEGIN
// });

export const fetchChartSuccess = (chart, singleChart) => ({
  type: FETCH_CHART_SUCCESS,
  payload: { chart, singleChart },
});

// export const fetchchartsError = error => ({
//   type: FETCH_CHARTS_FAILURE,
//   payload: { error }
// });
