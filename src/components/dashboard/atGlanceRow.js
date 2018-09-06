import React from 'react';
import AtGlance from './atGlance';

import './dashboard.css';

class atGlanceRow extends React.Component {
  render() {
    return (
      <div className="row">
        <div>
          <div className="row">
            <AtGlance
              icon="users"
              title="Total Users"
              percentage={this.props.usersDetails.userData.byWeek.percent}
              data={this.props.usersDetails.userData.total}
              isIncreased={this.props.usersDetails.userData.byWeek.isIncrease}
            />
            <AtGlance
              icon="map"
              title="Total Countries"
              percentage={this.props.usersDetails.totalCountries.percent}
              data={this.props.usersDetails.totalCountries.total}
              isIncreased={this.props.usersDetails.totalCountries.isIncrease}
            />
            <AtGlance
              icon="bookmark"
              title="Daily Average Users"
              percentage={this.props.usersDetails.userData.byWeek.percent}
              data={this.props.usersDetails.avgData.dailyUser.average}
              isIncreased={this.props.usersDetails.userData.byWeek.isIncrease}
            />
            <AtGlance
              icon="circle"
              title="Active Users"
              percentage="9"
              data="10"
              isIncreased={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default atGlanceRow;
