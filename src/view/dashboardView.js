import React from 'react';
import AtGlance from '../components/dashboard/atGlance';
import UserSources from '../components/dashboard/userSurces';
// import GeoChart from './geoChart';
// import TableData from '../components/dashboard/tableData';
import { GeoChart } from './dashboard';
import TableData from '../components/dashboard/tableData';
import '../components/dashboard/dashboard.css';
import store from '../store';
import GeoChartUI from './geoChartUI';

class DashboardView extends React.Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.fetchTrack();
    }
    if (!this.props.pageIsLoaded) {
      this.props.fetchPage();
    }
    if (!this.props.userIsLoaded) {
      this.props.fetchUserData();
    }
  }
  render() {
    return (
      <div className="container row">
        {this.props.usersDetails.userData === null ? (
          <span>
            {this.props.statusMessage}
            kkkkk...{' '}
          </span>
        ) : (
          <div>
            <GeoChart />
          </div>
        )}
      </div>
    );
  }
}

export default DashboardView;
