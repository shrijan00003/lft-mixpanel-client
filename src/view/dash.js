import React from 'react';
import AtGlance from '../components/dashboard/atGlance';
import UserSources from '../components/dashboard/userSurces';
// import GeoChart from './geoChart';
// import TableData from '../components/dashboard/tableData';
import TableData from '../components/dashboard/tableData';
import '../components/dashboard/dashboard.css';
import store from '../store';
import GeoChartUI from './geoChartUI';

class Dash extends React.Component {
  render() {
    return (
      <div className="container row">
        <div className="col-12">
          <div className="row">
            <AtGlance
              icon="users"
              title="Total Users"
              percentage="4"
              data={this.props.trackData.data.length}
              isIncreased={false}
            />
            <AtGlance
              icon="map"
              title="Total Countries"
              percentage="10"
              data={this.props.chartData.length - 1}
              isIncreased={true}
            />
            <AtGlance
              icon="bookmark"
              title="Daily Average Users"
              percentage="5"
              data="103"
              isIncreased={false}
            />
            <AtGlance
              icon="circle"
              title="Active Users"
              percentage="9"
              data="10"
              isIncreased={true}
            />
          </div>
          <div className="row">
            <UserSources />
          </div>
        </div>
      </div>
    );
  }
}

export default Dash;
