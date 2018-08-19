import React from 'react';
import AtGlance from '../components/dashboard/atGlance';
import UserSources from '../components/dashboard/userSurces';
// import GeoChart from './geoChart';
import Chart from 'react-google-charts';

// import TableData from '../components/dashboard/tableData';
import TableData from '../components/dashboard/tableData';
import '../components/dashboard/dashboard.css';
import store from '../store';
import GeoChartUI from './geoChartUI';

const Table = ({ eventName, os, browser, ipAddress, device, location }) => (
  <tr>
    <td> {eventName} </td>
    <td> {os} </td>
    <td>{browser}</td>
    <td>{ipAddress}</td>

    <td>{device}</td>
    <td>{location}</td>
  </tr>
);

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
            {' '}
            <table>
              <tr>
                <th> EventName </th>
                <th> Os </th>
                <th>Browser</th>
                <th>IpAddress</th>
                <th>Device</th>
                <th>Location</th>
              </tr>

              {this.props.trackData.data.map((person, index) => (
                <Table key={index} {...person} />
              ))}
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default Tracks;
