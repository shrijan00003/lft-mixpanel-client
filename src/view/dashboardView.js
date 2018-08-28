import React from 'react';
import Dash from './dash';
import store from '../store';
// import GeoChart from './geoChart';
import Chart from 'react-google-charts';
import { GeoChart } from './pageOnLoad';
import GeoChartView from './geoChartView';
import PagesChartView from './pagesChartView';
import TracksChartView from './tracksChartView';
import AtGlance from '../components/dashboard/atGlance';
import TableData from '../components/dashboard/tableData';
// import TableData from '../components/dashboard/tableData';
import UserSources from '../components/dashboard/userSurces';

import '../components/dashboard/dashboard.css';

class DashboardView extends React.Component {
  componentDidMount() {
    console.log(this.props);

    if (!this.props.pageIsLoaded) {
      this.props
        .fetchPage()
        .then(() => {
          if (!this.props.userIsLoaded) {
            this.props.fetchUserData();
          }
        })
        .catch(err => console.log(err));
    }
  }
  render() {
    return (
      <div className="container row">
        {this.props.usersDetails.userData === null ? (
          <span>{this.props.statusMessage}</span>
        ) : (
          <div>
            <div>
              <Dash {...this.props} />
            </div>
            <div>
              <GeoChart />
            </div>
            browser breakdown in tracks and pages: showing 10 of 10 rows date
            from and to
            <div className="col-6">
              <div className="chart-data">
                <div style={{ textAlign: 'center', padding: '15px' }}>
                  <h3> Top Os Usage</h3>
                </div>
                <TracksChartView {...this.props} />
              </div>
            </div>
          </div>
        )}

        {this.props.pageData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div className="col-6">
            <div className="chart-data">
              <div style={{ textAlign: 'center', padding: '15px' }}>
                <h3> Top Referrers</h3>
              </div>
              <PagesChartView {...this.props} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DashboardView;
