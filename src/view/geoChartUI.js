import React, { Component } from 'react';
import Chart from 'react-google-charts';
import store from '../store';
import TableData from '../components/dashboard/tableData';
import Dash from './dash';
import PieChartData from './pieChartData';
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
    };
  }

  initMap = async () => {
    var geocoder = new window.google.maps.Geocoder();

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

      //  { latitude: "20.5937", longitude: "78.9629" }
    ];

    return new Promise(resolve => {
      let array = [];
      for (let input in loc) {
        var latlng = {
          lat: parseFloat(loc[input].latitude),
          lng: parseFloat(loc[input].longitude),
        };

        geocoder.geocode({ location: latlng }, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              //   console.log(results[results.length - 1].formatted_address);
              array.push(results[results.length - 1].formatted_address);
              // console.log(array, inputs, "init");
              if (array.length === loc.length) {
                resolve(array);
              }
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }
    });
  };

  async componentDidMount() {
    let country = await this.initMap();

    let countries = [],
      users = [],
      prev;

    country.sort();
    for (let i = 0; i < country.length; i++) {
      if (country[i] !== prev) {
        countries.push(country[i]);
        users.push(1);
      } else {
        users[users.length - 1]++;
      }
      prev = country[i];
    }

    // let arrPop = [10, 2000, 800];
    // let r = [];
    this.setState({
      country: countries,
      totalUsers: users,
    });
    let array = [['Country', 'Total users']];
    for (let i in countries) {
      array.push([countries[i], users[i]]);
    }
    this.props.fetchChart(array);
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
            <div>
              <PieChartData {...this.props} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GeoChartUI;
