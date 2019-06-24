import React, { Component } from 'react';
import Chart from 'react-google-charts';
import store from '../store';

import TableData from '../components/dashboard/tableData';
import Dash from './dash';
import TracksChartView from './tracksChartView';
import PagesChartView from './pagesChartView';
import { initMap } from '../services/chartServices';
import { getTopData } from '../services/topDataServices';
import '../components/dashboard/dashboard.css';

// import SingleMap from "./singleMap";

class GeoChartView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [['Country', 'Total Users']],
    };
  }
  async componentDidMount() {
    if (!this.props.chartIsLoaded) {
      let metaData = this.props.usersDetails.metaData;
      console.log(metaData);
      if (metaData.length > 0) {
        let countryName = [];
        let latlngArr = [];
        for (let i in metaData) {
          countryName.push(metaData[i].location.countryName);
          var details = {
            lat: parseFloat(metaData[i].location.latitude),
            lng: parseFloat(metaData[i].location.longitude),
            userId: metaData[i].userId,
          };
          latlngArr.push(Object.values(details));
        }

        let userFromCountryResult = [
          ['Country', 'Total Users'],
          ...getTopData(countryName).showTopResult,
        ];
        console.log(latlng, 'jdfojdsofjf');
        let latlngArrayResult = [
          ['Latitude', 'Longitude', 'User Id'],
          ...latlngArr,
        ];
        this.props.fetchChart(userFromCountryResult, latlngArrayResult);

        this.setState(prevState => ({
          chartData: [...prevState.chartData, ...userFromCountryResult],
        }));

        //console.log(userFromCountryResult, 'userrrr');
        // this.setState(prevState => ({
        //   chartData: [
        //     ...prevState.chartData,
        //     ...getTopData(countryName).showTopResult,
        //   ],
        // }));
        // console.log(this.state.chartData);
      }
    }
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
