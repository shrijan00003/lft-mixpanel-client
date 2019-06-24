import React from 'react';
import GeoChartView from './geoCountriesView';
import PagesChartView from './pagesChartView';
import TracksChartView from './tracksChartView';
import LiveUserActivity from './liveUserActivity';
import BrowserChartView from './browserChartView';
import UserActivityChartView from './userActivityChartView';
// import { connectLiveServer } from '../utils/liveConnection';
import AtGlanceRow from '../components/dashboard/atGlanceRow';

import '../components/dashboard/dashboard.css';

class DashboardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCountries: null,
    };
    // connectLiveServer();
  }
  componentDidMount() {
    if (!this.props.pageIsLoaded) {
      this.props.fetchPage();
    }
    if (!this.props.userIsLoaded) {
      this.props.fetchUserData();
    }
  }

  // Renders dashboard
  render() {
    if (this.props.usersDetails.userData !== null) {
      return (
        <div className="container row">
          <div>
            <div>
              <AtGlanceRow {...this.props} />
            </div>

            <div className="col-7">
              <div className="chart-data row">
                <h3>Users Incoming Rate</h3>
                <UserActivityChartView {...this.props} />
              </div>
            </div>

            <div className="col-5">
              <div className="chart-data row">
                <h3>Live Users Activity</h3>
                <LiveUserActivity />
              </div>
            </div>

            <div>
              <GeoChartView {...this.props} />
            </div>

            <div className="col-6">
              <div className="chart-data row">
                <h3> Top Operating System Usage</h3>
                <TracksChartView {...this.props} />
              </div>
            </div>

            <div className="col-6">
              <div className="chart-data row">
                <h3> Top Browser Usage</h3>
                <BrowserChartView {...this.props} />
              </div>
            </div>

            {this.props.pageData === null ? (
              <span>{this.props.statusMessage} </span>
            ) : (
              <div className="col-12">
                <div className="chart-data row">
                  <h3> Top Referrers</h3>

                  <PagesChartView {...this.props} />
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return '';
    }
  }
}

export default DashboardView;
