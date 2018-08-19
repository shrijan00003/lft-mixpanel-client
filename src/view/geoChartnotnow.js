import { connect } from 'react-redux';

import { fetchChartSuccess } from '../actions/chartAction';

import GeoChartUI from './geoChartUI';
import DashboardView from './dashboardView';

const mapStateToProps = state => {
  return {
    chartData: state.chart.chartData,
    trackData: state.track.trackData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChart: chart => dispatch(fetchChartSuccess(chart)),
  };
};

const GeoChart = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeoChartUI);

export default GeoChart;
