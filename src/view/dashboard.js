import React from 'react';
import { connect } from 'react-redux';
import DashboardView from './dashboardView';
import {
  fetchTrackBegin,
  fetchTrackSuccess,
  fetchTrackFailure,
} from '../actions/trackActions';
import {
  fetchPageBegin,
  fetchPageSuccess,
  fetchPageFailure,
} from '../actions/pageActions';
import { fetchChartSuccess } from '../actions/chartAction';

import { fetchTracksData } from '../services/trackServices';
import { fetchPagesData } from '../services/pageServices';

import GeoChartUI from './geoChartUI';
import TracksView from './tracks';
import PagesView from './pages';
import CountryView from './country';

let statusMessage = null;
let trackResponse = null;
let pageResponse = null;

const mapStateToProps = state => {
  if (state.track.isLoading || state.page.isLoading) {
    statusMessage = 'Please wait...';
  } else if (state.track.error) {
    statusMessage = state.track.error.data.message;
  } else if (state.page.error) {
    statusMessage = state.page.error.data.message;
  } else {
    statusMessage = null;
  }

  return {
    statusMessage: statusMessage,
    isLoaded: state.track.isLoaded,
    isLoading: state.track.isLoading,
    trackData: state.track.trackData,
    pageIsLoaded: state.page.isLoaded,
    pageIsLoading: state.page.isLoading,
    pageData: state.page.pageData,
    chartData: state.chart.chartData,
    chartSingleData: state.chart.chartSingleData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPage: async () => {
      dispatch(fetchPageBegin());
      pageResponse = await fetchPagesData();
      if (pageResponse.status === 200) {
        dispatch(fetchPageSuccess(pageResponse.data));
      } else {
        dispatch(fetchPageFailure(pageResponse.response));
      }
    },
    fetchTrack: async () => {
      dispatch(fetchTrackBegin());
      trackResponse = await fetchTracksData();

      if (trackResponse.status === 200) {
        dispatch(fetchTrackSuccess(trackResponse.data));
      } else {
        dispatch(fetchTrackFailure(trackResponse.response));
      }
    },
    fetchChart: (chart, singleChart) =>
      dispatch(fetchChartSuccess(chart, singleChart)),
  };
};

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardView);

export const Tracks = connect(
  mapStateToProps,
  mapDispatchToProps
)(TracksView);

export const Pages = connect(
  mapStateToProps,
  mapDispatchToProps
)(PagesView);

export const Country = connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryView);

export const GeoChart = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeoChartUI);

// export default Dashboard;
