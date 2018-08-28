import React from 'react';
import WorldMapView from './worldMapView';

import '../components/dashboard/dashboard.css';

class CheckWorldMapProps extends React.Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.fetchTrack();
    }
    if (!this.props.pageIsLoaded) {
      this.props.fetchPage();
    }
    if (!this.props.userIsLoaded) {
      this.props.fetchUserData();
    }
  }
  render() {
    return (
      <div className="container row">
        {this.props.usersDetails.userData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div>
            <WorldMapView {...this.props} />
          </div>
        )}
      </div>
    );
  }
}

export default CheckWorldMapProps;
