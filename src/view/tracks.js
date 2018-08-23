import React from 'react';
import AtGlance from '../components/dashboard/atGlance';
import UserSources from '../components/dashboard/userSurces';
// import GeoChart from './geoChart';
import Chart from 'react-google-charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  fetchTracksDataWithCount,
  fetchTracksData,
} from '../services/trackServices';

// import TableData from '../components/dashboard/tableData';
import TableData from '../components/dashboard/tableData';
// import '../components/dashboard/dashboard.css';
import '../components/pages/pages.css';
import store from '../store';
import GeoChartUI from './geoChartUI';
import { getAddress } from '../services/geocodingServices';

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
    <td>{location.address}</td>
  </tr>
);
const Table1 = ({ ...person }) => (
  <tr>
    <td> {person[Object.keys(person)[0]]} </td>
    <td> {person[Object.keys(person)[1]]} </td>
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
      // pageApi: trackResponse.data.metadata.page,
      // pageSizeApi: trackResponse.data.metadata.pageSize,
    });
  }

  async changer(event) {
    await this.setState({ [event.target.name]: event.target.value });
    let trackResponse = await fetchTracksDataWithCount(
      '?get=' +
        this.state.apiCol.split(',')[0] +
        '&table=' +
        this.state.apiCol.split(',')[1]
    );
    this.setState({ ans: trackResponse.data.data });
  }
  async componentDidMount() {
    let list = this.props.trackData.data;
    this.setState({ searchApi: this.props.trackData });

    let trackResponse = await fetchTracksDataWithCount(
      '?get=event_name&table=tracks'
    );
    console.log(trackResponse);
    this.setState({ ans: trackResponse.data.data });
  }

  // async fetchTrack(query) {
  //   console.log('called');
  //   let trackResponse = await fetchTracksDataWithCount(query);
  //   console.log('called', trackResponse);

  //   if (trackResponse.status === 200) {
  //     this.setState({ date: trackResponse.response });
  //   } else {
  //     this.setState({ date: null });
  //   }
  // }

  render() {
    let pageNumbers = [];
    if (this.state.searchApi !== null) {
      for (let i = 1; i <= this.state.searchApi.metadata.pageCount; i++) {
        pageNumbers.push(i);
      }
    }

    // const { search, page, current_page, date } = this.state;

    // let filteredList = list.filter(
    //   e => {
    //     return e.eventName.toLowerCase().includes(search.toLowerCase());
    //     //&&
    //     //e.createdAt.toLowerCase() > date.toLowerCase()

    //     //  e.createdAt.toLowerCase().includes(date.toLowerCase())
    //   }

    // );

    ///// To get the required data in pagination /////

    // const lastDataIndex = current_page * page;

    // let firstDataIndex = lastDataIndex - page;
    // if (firstDataIndex >= list.length) {
    //   firstDataIndex = 0;
    // }

    // const displayData = filteredList.slice(firstDataIndex, lastDataIndex);
    // let totalPage = Math.ceil(filteredList.length / page);

    ////// To display Page numbers /////////

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
            <div className="row">
              Select results to show: &nbsp;
              <div className="col-4">
                <div className="select">
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
              {this.state.ans === null ? (
                <span>Calculaing... </span>
              ) : (
                <div className="col-8">
                  <table>
                    <tr>
                      <td> Name </td>
                      <td> Count </td>
                    </tr>
                    {this.state.ans.map((person, index) => (
                      <Table1 key={index} {...person} />
                    ))}
                  </table>
                </div>
              )}
            </div>
            <div style={{ textAlign: 'center', padding: '25px' }}>
              TRACKS RESULTS
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
                  {this.state.searchApi.data.map((person, index) => (
                    <Table key={index} {...person} />
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
