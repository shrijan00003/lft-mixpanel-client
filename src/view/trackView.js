import React from 'react';
import Chart from 'react-google-charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  fetchTracksDataWithCount,
  fetchTracksData,
} from '../services/trackServices';
import { pieOptions } from '../constants/chartConstants';

import '../components/pages/pages.css';

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

    <td>{device}</td>
    <td>{location.countryName}</td>
  </tr>
);
const Table1 = ({ ...data }) => (
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
    console.log(trackResponse);
    this.setState({
      searchApi: trackResponse.data,
      pageSizeApi: trackResponse.data.metadata.pageSize,
      pageApi: '1',
    });
  }

  async changer(event) {
    await this.setState({ [event.target.name]: event.target.value });
    let params = {
      get: this.state.apiCol.split(',')[0],
      table: this.state.apiCol.split(',')[1],
    };

    let trackResponse = await fetchTracksDataWithCount(params);
    let array = [];
    trackResponse.data.data.map(data =>
      array.push([
        data[Object.keys(data)[0]],
        parseInt(data[Object.keys(data)[1]]),
      ])
    );
    this.setState(prev => ({
      ans: trackResponse.data.data,
      arr: [['Name', 'Count'], ...array],
    }));
  }
  async componentDidMount() {
    let list = this.props.trackData.data;
    this.setState({ searchApi: this.props.trackData });
    let params = {
      get: 'event_name',
      table: 'tracks',
    };
    let trackResponse = await fetchTracksDataWithCount(params);
    let array = [];
    console.log(trackResponse.data.data);
    trackResponse.data.data.map(data =>
      array.push([
        data[Object.keys(data)[0]],
        parseInt(data[Object.keys(data)[1]]),
      ])
    );
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
      <div className="container row">
        {this.props.trackData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div>
            {/*            {JSON.stringify(getAddress(this.props.trackData.data[0].location))}{' '}
        */}{' '}
            <div className="row">
              <div className="col-6">
                <div className="input-label">Search By Event Name</div>
                <input
                  name="search"
                  className="input-search"
                  placeholder="Search by Event Name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-6" style={{ paddingLeft: '70px' }}>
                <div className="input-label">Search By Date (After)</div>

                <input
                  type="date"
                  name="date"
                  className="input-search"
                  placeholder="Search By Date"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                Select results to show: &nbsp;
                <select
                  className="input-select"
                  value={this.state.value}
                  name="apiCol"
                  onChange={this.changer}
                >
                  <option value="device,event_metadata">device</option>
                  <option value="os,event_metadata">os</option>
                  <option selected value="event_name,tracks">
                    event
                  </option>
                </select>
              </div>
            </div>
            <div className="row">
              {this.state.arr === null ? (
                <span>Calculaing... </span>
              ) : (
                <div className="col-6">
                  <Chart
                    chartType="PieChart"
                    data={this.state.arr}
                    options={pieOptions}
                    graph_id="PieChart"
                    width={'100%'}
                    height={'200px'}
                    legend_toggle
                  />
                </div>
              )}
              {this.state.ans === null ? (
                <span>Calculaing... </span>
              ) : (
                <div className="col-6">
                  <table>
                    <tr>
                      <td> Name </td>
                      <td> Count </td>
                    </tr>
                    {this.state.ans.map((data, index) => (
                      <Table1 key={index} {...data} />
                    ))}
                  </table>
                </div>
              )}
            </div>
            <div style={{ textAlign: 'center', padding: '25px' }}>
              TRACKS RESULTS
            </div>
            <div className="select">
              No. of results to show: &nbsp;
              <select
                className="input-select"
                value={this.state.value}
                name="pageSizeApi"
                onChange={this.handleChange}
              >
                <option value="2">2</option>
                <option value="5">5</option>
                <option selected value="10">
                  10
                </option>
              </select>
            </div>
            {this.state.searchApi === null ? (
              <span>Calculaing... </span>
            ) : (
              <table>
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
            {/*<ul className="responsive-table">
             <li class="table-header">
                <div class="col coll-1">Event Title</div>
                <div class="col coll-2">Os </div>
                <div class="col coll-3">created At </div>
                <div class="col coll-4">Browser</div>
                <div class="col coll-5">Ip Address</div>
                <div class="col coll-6">Device</div>
                <div class="col coll-7">Location</div>
              </li> */}
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
        )}
      </div>
    );
  }
}

export default Tracks;
