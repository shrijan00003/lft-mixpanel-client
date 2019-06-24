import { connect } from 'react-redux';
import DashboardView from './dashboardView';

import { getPage } from '../actions/pageActions';
import { getUserData } from '../actions/userActions';
import { fetchChartSuccess } from '../actions/chartActions';

let statusMessage = null;

const mapStateToProps = state => {
  if (state.userData.isLoading || state.page.isLoading) {
    statusMessage = 'Please wait...';
  } else if (state.userData.error) {
    statusMessage = state.userData.error.data.message;
  } else if (state.page.error) {
    statusMessage = state.page.error.data.message;
  } else {
    statusMessage = null;
  }

  return {
    statusMessage: statusMessage,
    pageIsLoaded: state.page.isLoaded,
    pageIsLoading: state.page.isLoading,
    pageData: state.page.pageData,
    userIsLoaded: state.userData.isLoaded,
    userIsLoading: state.userData.isLoading,
    usersDetails: state.userData,
    chartIsLoaded: state.chart.isLoaded,
    chartData: state.chart.chartData,
    chartSingleData: state.chart.chartSingleData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPage: async () => dispatch(getPage()),
    fetchUserData: async () => dispatch(getUserData()),
    fetchChart: (chart, singleChart) => {
      dispatch(fetchChartSuccess(chart, singleChart));
    },
  };
};

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardView);

export default Dashboard;
