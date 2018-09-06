import React from 'react';
import {
  fetchTracksDataWithCount,
  fetchTracksData,
} from '../services/trackServices';
import utils from '../utils/utils';
import Chart from 'react-google-charts';
import { pieOptions } from '../constants/chartConstants';

import '../components/tracks/tracks.css';

let deviceData = {};

const Table = ({
  eventName,
  os,
  createdAt,
  browser,
  ipAddress,
  device,
  location,
}) => (
  <tr>
    <td> {eventName} </td>
    <td> {os} </td>
    <td> {createdAt} </td>
    <td>{browser}</td>
    <td>{ipAddress}</td>

    <td>{utils.deviceDetector((deviceData = { device })).device}</td>
    <td>{location.countryName}</td>
  </tr>
);
const TrackAnalyticsTable = ({ ...data }) => (
  <tr>
    <td> {data[Object.keys(data)[0]]} </td>
    <td> {data[Object.keys(data)[1]]} </td>
  </tr>
);

class Tracks extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      date: '',
      apiTable: 'tracks',
      apiCol: 'event_name',
      ans: null,
      searchApi: null,
      pageApi: '1',
      pageSizeApi: '10',
      arr: null,
      searchApiData: null,
      arrData: null,
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.changer = this.changer.bind(this);
  }
  // handleClick(event) {
  //   this.setState({
  //     pageApi: Number(event.target.id),
  //   });
  // }

  // handleChange(event) {
  //   this.setState({ [event.target.name]: event.target.value });
  // }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value,
    });

    let params = {
      event_name: this.state.search,
      date: this.state.date,
      page: this.state.pageApi,
      page_size: this.state.pageSizeApi,
    };

    let trackResponse = await fetchTracksData(params);
    console.log(trackResponse, 'track');
    this.setState({
      searchApi: trackResponse.data,
      pageSizeApi: trackResponse.data.metadata.pageSize,
      pageApi: '1',
    });
  }

  async changer(event) {
    await this.setState({
      [event.target.name]: event.target.value,
    });

    let params = {
      get: this.state.apiCol.split(',')[0],
      table: this.state.apiCol.split(',')[1],
    };

    let trackResponse = await fetchTracksDataWithCount(params);
    let array = [];
    trackResponse.data.data.map(data => {
      if (this.state.apiCol.split(',')[0] === 'device') {
        data = utils.deviceDetector(data);
      }
      return array.push([
        data[Object.keys(data)[0]],
        parseInt(data[Object.keys(data)[1]], 10),
      ]);
    });
    this.setState(() => ({
      ans: trackResponse.data.data,
      arr: [['Name', 'Count'], ...array],
    }));
  }

  async componentDidMount() {
    this.setState({ searchApi: this.props.trackData });
    let params = {
      get: 'event_name',
      table: 'tracks',
    };
    let trackResponse = await fetchTracksDataWithCount(params);
    console.log(trackResponse, 'trackresponse', this.props.trackData);

    let array = [];
    trackResponse.data.data.map(data => {
      array.push([
        data[Object.keys(data)[0]],
        parseInt(data[Object.keys(data)[1]], 10),
      ]);
    });
    this.setState(prev => ({
      ans: trackResponse.data.data,
      arr: [['Name', 'Count'], ...array],
    }));
  }

  render() {
    let pageNumbers = [];
    if (this.state.searchApi !== null) {
      for (let i = 1; i <= this.state.searchApi.metadata.pageCount; i++) {
        pageNumbers.push(i);
      }
    }

    return (
      <div className="container no-margin-no-padding">
        {this.props.trackData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div>
            <div className="col-12">
              <div className="tracks-data row">
                <div className="tracks-data-header">
                  <div className="no-margin-no-padding">
                    <div className="tracks-data-header-title">
                      <h3>Tracks Statistics</h3>
                    </div>
                  </div>
                </div>

                {this.state.arr === null ? (
                  <span>Calculaing... </span>
                ) : (
                  <div className="col-7">
                    <div className="select-track">
                      Showing&nbsp;
                      <select
                        value={this.state.value}
                        name="apiCol"
                        onChange={this.changer}
                      >
                        <option value="event_name,tracks">Event</option>
                        <option value="device,event_metadata">Device</option>
                        <option value="os,event_metadata">OS</option>
                        <option value="browser,event_metadata">Browser</option>
                      </select>
                    </div>
                    <Chart
                      chartType="PieChart"
                      data={this.state.arr}
                      options={pieOptions}
                      graph_id="PieChart"
                      width={'100%'}
                      height={'300px'}
                      legend_toggle
                    />
                  </div>
                )}

                {this.state.ans === null ? (
                  <span>Calculaing... </span>
                ) : (
                  <div className="col-5">
                    <table className="mixpanel-data-table">
                      <tbody>
                        <tr>
                          <th> Name </th>
                          <th> Users </th>
                        </tr>
                        {this.state.ans.map((data, index) => (
                          <TrackAnalyticsTable key={index} {...data} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="tracks-data row">
                <div className="col-6">
                  <div className="tracks-data-header-title">
                    <h3>Events Tracked</h3>
                  </div>
                </div>
                <div className="col-6">
                  <div className="search-field-wrapper">
                    <input
                      name="search"
                      className="track-search"
                      placeholder="Search by Event Name"
                      onChange={this.handleChange}
                    />
                    <input
                      type="date"
                      name="date"
                      className="track-search"
                      placeholder="Search By Date"
                      onChange={this.handleChange}
                    />

                    <select
                      className="track-search"
                      value={this.state.value}
                      name="pageSizeApi"
                      onChange={this.handleChange}
                    >
                      <option value="5">5</option>
                      <option value="2">2</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>
                {this.state.searchApi === null ? (
                  <span>Calculaing... </span>
                ) : (
                  <table className="mixpanel-data-table">
                    <tbody>
                      <tr>
                        <th> Event Name </th>
                        <th> Os </th>
                        <th> Created At </th>
                        <th>Browser</th>
                        <th>Ip Address</th>
                        <th>Device</th>
                        <th>Location</th>
                      </tr>
                      {this.state.searchApi.data.map((data, index) => (
                        <Table key={index} {...data} />
                      ))}
                    </tbody>
                  </table>
                )}

                <div className="pagination">
                  <strong>
                    Pages: &nbsp;
                    {pageNumbers.map((number, index) => (
                      <button
                        className="pager"
                        name="pageApi"
                        key={index}
                        value={number}
                        onClick={this.handleChange}
                      >
                        {number}
                      </button>
                    ))}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Tracks;
