import React, { Component } from 'react';
import { initMap } from '../services/chartServices';
import { getTopData } from '../services/topDataServices';

import Chart from 'react-google-charts';
import isoCountries from '../datas/isoCountries';
import SingleMap from './singleMap';

class WorldMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      code: '',
    };
  }

  async componentDidMount() {
    if (!this.props.chartIsLoaded) {
      let metaData = this.props.usersDetails.metaData;

      let countryName = [];
      let latlngArr = [];
      for (let i in metaData) {
        countryName.push(metaData[i].location.countryName);
        var latlng = {
          lat: parseFloat(metaData[i].location.latitude),
          lng: parseFloat(metaData[i].location.longitude),
        };
        latlngArr.push(Object.values(latlng));
      }

      let userFromCountryResult = [
        ['Country', 'Total Users'],
        ...getTopData(countryName).showTopResult,
      ];
      let latlngArrayResult = [['Latitude', 'Longitude'], ...latlngArr];
      this.props.fetchChart(userFromCountryResult, latlngArrayResult);
    }
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
    if (val) {
      console.log(this.props.chartData, val.row + 1);
      this.getName(this.props.chartData[val.row + 1][0]);
    }
  }
  getName = name => {
    var key = Object.keys(isoCountries).filter(function(key) {
      return isoCountries[key] == name;
    })[0];
    console.log(key);
    this.setState({
      isClicked: true,
      code: key,
    });
  };

  render() {
    return (
      //   <div>Country</div>
      <div className="container row">
        {this.props.chartData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div>
            <div>
              <div className="col-7 ">
                <Chart
                  chartType="GeoChart"
                  width="100%"
                  data={this.props.chartData}
                  chartEvents={this.chartEvents}
                />
              </div>

              {this.state.isClicked ? (
                <div>
                  <SingleMap {...this.state} {...this.props} />
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default WorldMap;
