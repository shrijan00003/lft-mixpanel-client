import React from 'react';
import Track from './trackView';
import { connect } from 'react-redux';

import '../components/dashboard/dashboard.css';
import { getTrack } from '../actions/trackActions';

let statusMessage = null;

const mapStateToProps = state => {
  if (state.track.isLoading) {
    statusMessage = 'Please wait...';
  } else {
    statusMessage = null;
  }

  return {
    statusMessage: statusMessage,
    trackIsLoaded: state.track.isLoaded,
    trackIsLoading: state.track.isLoading,
    trackData: state.track.trackData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrack: async () => dispatch(getTrack()),
  };
};

class CheckTrackProps extends React.Component {
  componentDidMount() {
    if (!this.props.trackIsLoaded) {
      this.props.fetchTrack();
    }
  }
  render() {
    return (
      <div className="container row">
        {this.props.trackData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div>
            <Track {...this.props} />
          </div>
        )}
      </div>
    );
  }
}

const EnhancedCheckTrackProps = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckTrackProps);

export default EnhancedCheckTrackProps;
