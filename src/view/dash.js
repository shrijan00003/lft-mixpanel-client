import React from 'react';
import AtGlance from '../components/dashboard/atGlance';
import UserSources from '../components/dashboard/userSurces';

import '../components/dashboard/dashboard.css';

class Dash extends React.Component {
  render() {
    return (
      <div className="container row">
        {this.props.usersDetails === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div className="col-12">
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
                percentage={this.props.usersDetails.userData.byWeek.percent}
                data="1"
                isIncreased={this.props.usersDetails.userData.byWeek.isIncrease}
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
            <div className="row">
              <UserSources />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Dash;
