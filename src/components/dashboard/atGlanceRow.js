import React from 'react';
import AtGlance from './atGlance';
import { getSocket, connectLiveServer } from '../../utils/liveConnection';

import './dashboard.css';
let socket = null;

class atGlanceRow extends React.Component {
  constructor() {
    super();

    this.state = {
      liveUsers: 0,
    };
    connectLiveServer();
    // socket.on('liveUsers', users => (liveUsers = users));
    // getSocket().on('liveUsers', console.log);
    // getSocket().on('liveUsersActivity', console.log);
  }

  componentDidMount = () => {
    getSocket().on('liveUsers', users => {
      this.setState({
        liveUsers: users,
      });
    });
  };

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
              data={
                this.props.usersDetails.totalCountries.data[0].totalCountries
              }
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
              data={this.state.liveUsers}
              isIncreased={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default atGlanceRow;
