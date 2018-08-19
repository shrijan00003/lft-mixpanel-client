import React, { Component } from 'react';
import Chart from 'react-google-charts';
import store from '../store';

import TableData from '../components/dashboard/tableData';
import Dash from './dash';
import PieChartData from './pieChartData';
import BarChartData from './barChartData';
import { initMap } from '../services/chartServices';
import '../components/dashboard/dashboard.css';

// import SingleMap from "./singleMap";

const data1 = [
  ['Latitude', 'Longitude'],
  [27.7115559, 85.32911899999999],
  [28.238, 83.9956],
  [27.5291, 84.3542],
];

class GeoChartUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      totalUsers: '',
      latlngArray: ['Latitude', 'Longitude'],
    };
  }

  async componentDidMount() {
    // let locationFromStore = store.getState().track.trackData.data[0].location;
    // let loc = [];
    // loc.push(JSON.parse(locationFromStore));

    let loc = [
      { latitude: 40.714224, longitude: -73.961452 },
      { latitude: '27.7115559', longitude: '85.32911899999999' },
      { latitude: '28.238', longitude: '83.9956' },
      { latitude: '39.9042', longitude: '116.4074' },
      { latitude: '27.5291', longitude: '84.3542' },
      // { latitude: "28.7041", longitude: "77.1025" }
      // { latitude: "20.5937", longitude: "78.9629" }
    ];
    let result = await initMap(loc);
    let singleLatLng = result.latlngArr;

    this.setState({
      country: result.countries,
      totalUsers: result.users,
    });
    let chartDataArray = [['Country', 'Total users']];
    for (let i in result.countries) {
      chartDataArray.push([result.countries[i], result.users[i]]);
    }
    this.props.fetchChart(chartDataArray, singleLatLng);
  }

  render() {
    return (
      <div>
        {this.props.chartData === null ? (
          <span>Loading... </span>
        ) : (
          <div>
            <div>
              <Dash {...this.props} />
            </div>
            <div>
              <TableData {...this.props} />
            </div>
            <div className="row">
              <div className="col-6">
                <PieChartData {...this.props} />
              </div>
              <div className="col-6">
                <BarChartData {...this.props} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GeoChartUI;
