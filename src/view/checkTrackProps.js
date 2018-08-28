import React from 'react';
import '../components/dashboard/dashboard.css';
import Track from './trackView';

class CheckTrackView extends React.Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
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

export default CheckTrackView;
