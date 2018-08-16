import React from 'react';
import { connect } from 'react-redux';
import DashboardView from './dashboardView';
import {
  fetchTrackBegin,
  fetchTrackSuccess,
  fetchTrackFailure,
} from '../actions/trackActions';
import { fetchChartSuccess } from '../actions/chartAction';

import { fetchTracksData } from '../services/trackServices';
import GeoChartUI from './geoChartUI';

let statusMessage = null;
let trackResponse = null;

const mapStateToProps = state => {
  if (state.track.isLoading) {
    statusMessage = 'Please wait...';
  } else if (state.track.error) {
    statusMessage = state.track.error.data.message;
  } else {
    statusMessage = null;
  }

  return {
    statusMessage: statusMessage,
    isLoaded: state.track.isLoaded,
    isLoading: state.track.isLoading,
    trackData: state.track.trackData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrack: async () => {
      dispatch(fetchTrackBegin());
      trackResponse = await fetchTracksData();
      if (trackResponse.status === 200) {
        dispatch(fetchTrackSuccess(trackResponse.data));
      } else {
        dispatch(fetchTrackFailure(trackResponse.response));
      }
    },
  };
};

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardView);

export default Dashboard;
