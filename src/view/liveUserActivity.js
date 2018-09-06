import React from 'react';
import { getSocket } from '../utils/liveConnection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class liveUserActivity extends React.Component {
  constructor() {
    super();
    this.state = {
      liveUsers: 0,
      liveActivity: [],
    };
  }

  componentDidMount = () => {
    let activityArr = [];
    getSocket().on('liveUsersActivity', activity => {
      activityArr = [...this.state.liveActivity];
      activityArr.unshift(activity);

      if (activityArr.length > 5) {
        activityArr.pop();
      }

      this.setState({
        liveActivity: [...activityArr],
      });
    });

    getSocket().on('liveUsers', users => {
      this.setState({
        liveUsers: users,
      });
    });
  };

  render() {
    return (
      <div className="col-12">
        <div className="activity-list">
          {/* <h1>{this.state.liveUsers} Online</h1> */}
          <ul>
            {this.state.liveActivity.length > 0 ? (
              this.state.liveActivity.map((activity, key) => (
                <li key={key}>
                  <span>{activity}</span>
                </li>
              ))
            ) : (
              <p>No Activity yet.</p>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default liveUserActivity;
