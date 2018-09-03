import React from 'react';

import SingleMap from './singleMap';
import Chart from 'react-google-charts';
import isoCountries from '../datas/isoCountries';
import { getTopData } from '../services/topDataServices';

import '../components/tracks/tracks.css';

const Table = ({ ...data }) => {
  if (data[0] && data[1]) {
    return (
      <tr>
        <td> {data[0]} </td>
        <td> {data[1]} </td>
      </tr>
    );
  }
  return (
    <tr>
      <td>No Data found!!!</td>
    </tr>
  );
};

class WorldMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      code: '',
      countryTotalUsers: '',
      currentPageNo: '1',
      pageSize: '2',
      displayData: null,
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
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

      let userFromCountryResult = [['', ''], ...getTopData(countryName).result];

      let latlngArrayResult = [['Latitude', 'Longitude'], ...latlngArr];
      this.setState(prevState => ({
        countryTotalUsers: [
          ...prevState.countryTotalUsers,
          ...userFromCountryResult,
        ],
        displayData: userFromCountryResult.slice(1, 3),
      }));
      this.props.fetchChart(userFromCountryResult, latlngArrayResult);
    } else {
      this.setState({
        countryTotalUsers: this.props.chartData,
        displayData: this.props.chartData.slice(1, 3),
      });
    }
  }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value,
    });

    const { pageSize, currentPageNo, countryTotalUsers } = this.state;

    if (countryTotalUsers) {
      const lastDataIndex = currentPageNo * pageSize + 1;

      let firstDataIndex = lastDataIndex - pageSize;
      if (firstDataIndex >= countryTotalUsers.length) {
        firstDataIndex = 0;
      }
      this.setState({
        displayData: countryTotalUsers.slice(firstDataIndex, lastDataIndex),
      });

      //  displayData = countryTotalUsers.slice(firstDataIndex, lastDataIndex);
    }
  }

  async handleClick(event) {
    await this.setState({
      [event.target.name]: event.target.value,
    });
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
      this.getName(this.props.chartData[val.row + 1][0]);
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
    const { pageSize, countryTotalUsers } = this.state;
    // let displayData = null;
    // const pageNumbers = [];

    // if (countryTotalUsers) {
    //   const lastDataIndex = currentPageNo * pageSize;

    //   let firstDataIndex = lastDataIndex - pageSize;
    //   if (firstDataIndex >= countryTotalUsers.length) {
    //     firstDataIndex = 0;
    //   }

    //   displayData = countryTotalUsers.slice(firstDataIndex, lastDataIndex);

    //   console.log(
    //     displayData,
    //     countryTotalUsers,
    //     'firstDataIndex',
    //     this.props.chartData
    //   );
    const pageNumbers = [];

    let totalPage = Math.ceil((countryTotalUsers.length - 1) / pageSize);

    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="container row">
        {this.props.chartData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div>
            <div className="col-12">
              <div className="tracks-data row">
                <div className="tracks-data-header row">
                  <div className="no-margin-no-padding">
                    <div className="tracks-data-header-title">
                      <h3>Where are your users located?</h3>
                    </div>
                  </div>
                </div>
                <div className="col-8">
                  <Chart
                    chartType="GeoChart"
                    width="100%"
                    data={this.props.chartData}
                    chartEvents={this.chartEvents}
                  />
                </div>

                {this.state.isClicked ? (
                  <div className="col-4">
                    <SingleMap {...this.state} {...this.props} />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="col-12">
              <div className="tracks-data row">
                <div className="col-6">
                  <div className="tracks-data-header-title">
                    <h3>User Details</h3>
                  </div>
                </div>
                <div className="col-6">
                  <div className="search-field-wrapper">
                    <select
                      className="track-search"
                      value={this.state.value}
                      name="pageSize"
                      onChange={this.handleChange}
                    >
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>
                {this.state.displayData === null ? (
                  <span>Calculating... </span>
                ) : (
                  <div>
                    <table className="mixpanel-data-table">
                      <tbody>
                        <tr>
                          <th> Country Name </th>
                          <th> Total Users </th>
                        </tr>
                        {this.state.displayData.map((data, index) => (
                          <Table key={index} {...data} />
                        ))}
                      </tbody>
                    </table>
                    <div className="pagination">
                      <strong>
                        Pages: &nbsp;
                        {pageNumbers.map((number, index) => (
                          <button
                            className="pager"
                            key={index}
                            name="currentPageNo"
                            value={number}
                            onClick={this.handleChange}
                          >
                            {number}
                          </button>
                        ))}
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default WorldMap;
