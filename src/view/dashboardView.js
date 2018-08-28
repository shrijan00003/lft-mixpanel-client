import React from 'react';
import { GeoChart } from './pageOnLoad';
import PagesChartView from './pagesChartView';
import TracksChartView from './tracksChartView';
import AtGlanceRow from '../components/dashboard/atGlanceRow';

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
      <div className="content-wrapper row">
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
            browser breakdown in tracks and pages: showing 10 of 10 rows date
            from and to
            <div className="col-6">
              <div className="padding-left">
                <div className="chart-data">
                  <div style={{ textAlign: 'center', padding: '15px' }}>
                    <h3> Top Os Usage</h3>
                  </div>
                  <TracksChartView {...this.props} />
                </div>
              </div>
            </div>
          </div>
        )}

        {this.props.pageData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div className="col-6">
            <div className="padding-right">
              <div className="chart-data">
                <div style={{ textAlign: 'center', padding: '15px' }}>
                  <h3> Top Referrers</h3>
                </div>
                <PagesChartView {...this.props} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DashboardView;
