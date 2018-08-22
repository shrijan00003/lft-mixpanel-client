import React from 'react';
import AtGlance from '../components/dashboard/atGlance';
import UserSources from '../components/dashboard/userSurces';
// import GeoChart from './geoChart';
// import TableData from '../components/dashboard/tableData';
import { GeoChart, Country } from './dashboard';
import TableData from '../components/dashboard/tableData';
import '../components/dashboard/dashboard.css';
import store from '../store';
import Track from './tracks';

class TrackHOC extends React.Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.fetchTrack();
    }
  }
  render() {
    return (
      <div className="container row">
        {this.props.trackData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div>
            <Track {...this.props} />
          </div>
        )}
      </div>
    );
  }
}

export default TrackHOC;
