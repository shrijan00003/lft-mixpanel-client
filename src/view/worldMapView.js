import React, { Component } from 'react';
import { initMap } from '../services/chartServices';

import Chart from 'react-google-charts';
import isoCountries from '../datas/isoCountries';
import SingleMap from './singleMap';

class WorldMap extends React.Component {
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
    let locationFromStore = this.props.usersDetails.metaData;
    let loc = [];
    for (let i in locationFromStore) {
      loc.push(locationFromStore[i].location);
    }
    let result = await initMap(loc);
    let singleLatLng = result.latlngArr;

    let chartDataArray = [['Country', 'Total users']];
    for (let i in result.countries) {
      chartDataArray.push([result.countries[i], result.users[i]]);
    }
    console.log(chartDataArray, singleLatLng);
    this.props.fetchChart(chartDataArray, singleLatLng);
    this.setState({
      country: result.countries,
      totalUsers: result.users,
      chartData: chartDataArray,
    });

    this.setState(prevState => ({
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
    if (val) {
      this.getName(this.state.chartData[val.row + 1][0]);
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
