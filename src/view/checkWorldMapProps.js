import React from 'react';
import { connect } from 'react-redux';

import WorldMapView from './worldMapView';
import '../components/dashboard/dashboard.css';

import { getUserData } from '../actions/userActions';

let statusMessage = null;

const mapStateToProps = state => {
  if (state.userData.isLoading) {
    statusMessage = 'Please wait...';
  } else {
    statusMessage = null;
  }

  return {
    statusMessage: statusMessage,
    usersDetails: state.userData,
    userIsLoaded: state.userData.isLoaded,
    userIsLoading: state.userData.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserData: async () => dispatch(getUserData()),
  };
};

class CheckWorldMapProps extends React.Component {
  componentDidMount() {
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

const EnhancedCheckWorldMapProps = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckWorldMapProps);

export default EnhancedCheckWorldMapProps;
