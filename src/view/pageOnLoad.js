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

import {
  fetchUserDataBegin,
  fetchUserDataSuccess,
  fetchUserDataFailure,
} from '../actions/userActions';

import { fetchChartSuccess } from '../actions/chartAction';

import { fetchTracksData } from '../services/trackServices';
import { fetchPagesData } from '../services/pageServices';
import { fetchUsersData } from '../services/userDataServices';

import GeoChartView from './geoChartView';
import CheckTracksProps from './checkTrackProps';
import CheckPagesProps from './checkPageProps';
import CheckWorldMapProps from './checkWorldMapProps';

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
    userIsLoaded: state.userData.isLoaded,
    userIsLoading: state.userData.isLoading,
    usersDetails: state.userData,
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
    fetchTrack: async (query = null) => {
      dispatch(fetchTrackBegin());
      trackResponse = await fetchTracksData(query);

      if (trackResponse.status === 200) {
        dispatch(fetchTrackSuccess(trackResponse.data));
      } else {
        dispatch(fetchTrackFailure(trackResponse.response));
      }
    },

    fetchChart: (chart, singleChart) => {
      dispatch(fetchChartSuccess(chart, singleChart));
    },

    fetchUserData: async () => {
      dispatch(fetchUserDataBegin());
      trackResponse = await fetchUsersData();

      if (trackResponse.status === 200) {
        dispatch(
          fetchUserDataSuccess(
            trackResponse.data.allMetadata,
            trackResponse.data.averageUser,
            trackResponse.data.totalUserData
          )
        );
      } else {
        dispatch(fetchUserDataFailure(trackResponse.response));
      }
    },
  };
};

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardView);

export const Tracks = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckTracksProps);

export const Pages = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckPagesProps);

export const WorldMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckWorldMapProps);

export const GeoChart = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeoChartView);
