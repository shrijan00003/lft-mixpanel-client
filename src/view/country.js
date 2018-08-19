import React, { Component } from 'react';
import { initMap } from '../services/chartServices';

import Chart from 'react-google-charts';
import isoCountries from '../datas/isoCountries';
import store from '../store';
import TableData from '../components/dashboard/tableData';
import Dash from './dash';
import PieChartData from './pieChartData';
import SingleMap from './singleMap';

// import SingleMap from "./singleMap";

const data1 = [
  ['Latitude', 'Longitude'],
  [27.7115559, 85.32911899999999],
  [28.238, 83.9956],
  [27.5291, 84.3542],
];

class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      totalUsers: '',
      latlngArray: [['Latitude', 'Longitude']],
      chartData: '',
      isClicked: false,
      code: '',
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

    let chartDataArray = [['Country', 'Total users']];
    for (let i in result.countries) {
      chartDataArray.push([result.countries[i], result.users[i]]);
    }
    this.props.fetchChart(chartDataArray, singleLatLng);
    this.setState(prevState => ({
      country: result.countries,
      totalUsers: result.users,
      chartData: chartDataArray,
      latlngArray: [...prevState.latlngArray, ...singleLatLng],
    }));
  }

  chartEvents = [
    {
      eventName: 'select',
      callback: Chart => {
        this.onSelectEvent(Chart);
      },
    },
  ];

  onSelectEvent(Chart) {
    let val = Chart.chartWrapper.getChart().getSelection()[0];
    console.log(val.row, Chart.props);
    if (val) {
      console.log(this.state);
      this.getName(this.state.chartData[val.row + 1][0]);
    }
  }
  getName = name => {
    var key = Object.keys(isoCountries).filter(function(key) {
      return isoCountries[key] === name;
    })[0];
    this.setState({
      isClicked: true,
      code: key,
    });
  };

  render() {
    return (
      //   <div>Country</div>
      <div>
        {this.props.chartData === null ? (
          <span>Loading... </span>
        ) : (
          <div>
            <div className="col-5">
              <Chart
                chartType="GeoChart"
                width="100%"
                height="400"
                data={this.props.chartData}
                chartEvents={this.chartEvents}
              />
            </div>
            {this.state.isClicked ? (
              <div className="col-5">
                <SingleMap {...this.state} />
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default Country;
