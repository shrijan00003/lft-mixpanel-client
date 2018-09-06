import React from 'react';
import AtGlance from './atGlance';
import { connectLiveServer } from '../../utils/liveConnection';

import './dashboard.css';
let socket = null;

class atGlanceRow extends React.Component {
  constructor() {
    super();
    socket = connectLiveServer();

    this.state = {
      liveUsers: 0,
    };

    // socket.on('liveUsers', users => (liveUsers = users));
    socket.on('liveUsers', console.log);
  }

  componentDidMount = () => {
    socket.on('liveUsers', users => {
      this.setState({
        liveUsers: users,
      });
    });
  };

  render() {
    return (
      <div className="row">
        {this.props.usersDetails === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
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
                percentage=""
                data={this.state.liveUsers}
                isIncreased={true}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default atGlanceRow;
