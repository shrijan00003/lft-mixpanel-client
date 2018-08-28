import React, { Component } from 'react';
import Chart from 'react-google-charts';
import store from '../store';

import TableData from '../components/dashboard/tableData';
import Dash from './dash';
import TracksChartView from './tracksChartView';
import PagesChartView from './pagesChartView';
import { initMap } from '../services/chartServices';
import '../components/dashboard/dashboard.css';

// import SingleMap from "./singleMap";

class GeoChartView extends React.Component {
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
    let locationFromStore = this.props.usersDetails.metaData;
    let loc = [];
    for (let i in locationFromStore) {
      loc.push(locationFromStore[i].location);
    }
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
      <div className="container row">
        {this.props.chartData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div>
            <div className="col-12">
              <div className="chart-data">
                <div style={{ textAlign: 'center', padding: '15px' }}>
                  <h3> Users Location</h3>
                </div>
                <div>
                  {this.props.chartData === null ? (
                    <span>{this.props.statusMessage}</span>
                  ) : (
                    <div className="row">
                      <div className="col-7">
                        <Chart
                          chartType="GeoChart"
                          width="90%"
                          height="500"
                          data={this.props.chartData}
                        />
                      </div>
                      <div className="col-3">
                        <TableData data={this.props.chartData} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GeoChartView;
