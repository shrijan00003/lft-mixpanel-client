import React from 'react';
import AtGlance from '../components/dashboard/atGlance';
import UserSources from '../components/dashboard/userSurces';
import GeoChart from './geoChart';
import Chart from 'react-google-charts';

// import TableData from '../components/dashboard/tableData';
import TableData from '../components/dashboard/tableData';
import '../components/dashboard/dashboard.css';
import store from '../store';
import GeoChartUI from './geoChartUI';

class Tracks extends React.Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.fetchTrack();
    }
    // if(this.props.trackData){

    // }
  }
  render() {
    return (
      <div className="container row">
        {this.props.trackData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div>
            hihi
            <Chart
              chartType="Table"
              width="100%"
              data={this.props.trackData.data}
              option={{
                showRowNumber: true,
                allowHtml: true,
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Tracks;
