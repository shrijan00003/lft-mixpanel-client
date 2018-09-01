import React from 'react';
import { GeoChart } from './pageOnLoad';
import PagesChartView from './pagesChartView';
import TracksChartView from './tracksChartView';
import BrowserChartView from './browserChartView';
import AtGlanceRow from '../components/dashboard/atGlanceRow';

import '../components/dashboard/dashboard.css';

class DashboardView extends React.Component {
  componentDidMount() {
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
              <AtGlanceRow {...this.props} />
            </div>

            <div>
              <GeoChart />
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
          </div>
        )}

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
    );
  }
}

export default DashboardView;
