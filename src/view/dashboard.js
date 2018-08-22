import React from 'react';
import { connect } from 'react-redux';
import DashboardView from './dashboardView';
import {
  fetchTrackBegin,
  fetchTrackSuccess,
  fetchTrackFailure,
  fetchTrackWithLocationBegin,
  fetchTrackWithLocationSuccess,
  fetchTrackWithLocationFailure,
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

import {
  fetchTracksData,
  fetchTracksDataWithLocation,
} from '../services/trackServices';
import { fetchPagesData } from '../services/pageServices';

import GeoChartUI from './geoChartUI';
import TracksView from './tracksHOC';
import PagesView from './pagesHOC';
import CountryView from './countryHOC';
import { fetchUsersData } from '../services/userDataServices';

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
    locIsLoading: state.track.locIsLoading,
    locIsLoaded: state.track.locIsLoaded,
    trackDataWithLoc: state.track.trackDataWithLoc,
    userIsLoaded: state.userData.isLoaded,
    userIsLoading: state.userData.isLoading,
    usersDetails: state.userData.userData,
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
      console.log(query, 'Dashboard');
      dispatch(fetchTrackBegin());
      trackResponse = await fetchTracksData(query);

      if (trackResponse.status === 200) {
        console.log(trackResponse, 'resp');

        dispatch(fetchTrackSuccess(trackResponse.data));
      } else {
        dispatch(fetchTrackFailure(trackResponse.response));
      }
    },
    fetchTrackWithLocation: async (query = null) => {
      dispatch(fetchTrackWithLocationBegin());
      trackResponse = await fetchTracksDataWithLocation(query);

      if (trackResponse.status === 200) {
        dispatch(fetchTrackWithLocationSuccess(trackResponse.data));
      } else {
        dispatch(fetchTrackWithLocationFailure(trackResponse.response));
      }
    },
    fetchChart: (chart, singleChart) =>
      dispatch(fetchChartSuccess(chart, singleChart)),

    fetchUserData: async () => {
      dispatch(fetchUserDataBegin());
      trackResponse = await fetchUsersData();

      if (trackResponse.status === 200) {
        dispatch(fetchUserDataSuccess(trackResponse.data));
      } else {
        dispatch(fetchUserDataSuccess(trackResponse.response));
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
