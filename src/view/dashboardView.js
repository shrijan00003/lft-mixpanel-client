import React from 'react';
import { GeoChart } from './pageOnLoad';
import PagesChartView from './pagesChartView';
import TracksChartView from './tracksChartView';
import BrowserChartView from './browserChartView';
import UserActivityChartView from './userActivityChartView';
import AtGlanceRow from '../components/dashboard/atGlanceRow';

import '../components/dashboard/dashboard.css';

class DashboardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCountries: null,
    };
  }
  componentDidMount() {
    if (!this.props.userIsLoaded) {
      this.props
        .fetchUserData()
        .then(() => {
          if (!this.props.pageIsLoaded) {
            this.props.fetchPage();
          }
        })
        .catch(err => console.log(err));
    }
  }

  componentWillReceiveProps(nextProps) {
    // let metaData = this.props.usersDetails.metaData;
    // let countryName = [];
    // for (let i in metaData) {
    //   countryName.push(metaData[i].location.countryName);
    // }
    // let y = getTopData(countryName).result;
    // console.log(y.length, 'iiiiiiiii');
    // this.
  }

  // Renders dashboard
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
            <div className="col-7">
              <div className="chart-data row">
                <h3>User Activities</h3>
                <UserActivityChartView {...this.props} />
              </div>
            </div>
            <div className="col-5">
              <div className="chart-data row">
                <h3> Top Browser Usage</h3>
                <BrowserChartView {...this.props} />
              </div>
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
            {this.props.pageData === null ? (
              <span>{this.props.statusMessage} </span>
            ) : (
              <div className="col-6">
                <div className="chart-data row">
                  <h3> Top Referrers</h3>

                  <PagesChartView {...this.props} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default DashboardView;
