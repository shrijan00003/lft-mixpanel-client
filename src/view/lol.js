import React from 'react';
import AtGlance from '../components/dashboard/atGlance';
import UserSources from '../components/dashboard/userSurces';
// import GeoChart from './geoChart';
import Chart from 'react-google-charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

class Tracks extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      page: '10',
      current_page: 1,
      date: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({
      current_page: Number(event.target.id),
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    let pagesArray = [];

    let list = this.props.trackData.data;

    const { search, page, current_page, date } = this.state;
    // var newdate = date.split("/").reverse().join("-");

    let filteredList = list.filter(
      e => {
        return (
          e.eventName.toLowerCase().includes(search.toLowerCase()) &&
          e.createdAt.toLowerCase() > date.toLowerCase()

          //  e.createdAt.toLowerCase().includes(date.toLowerCase())
        );
      }
      // ||
      // e.gender.toLowerCase().startsWith(search.toLowerCase()) ||
      // e.company.toLowerCase().includes(search.toLowerCase())
    );

    ///// To get the required data in pagination /////

    const lastDataIndex = current_page * page;

    let firstDataIndex = lastDataIndex - page;
    if (firstDataIndex >= list.length) {
      firstDataIndex = 0;
    }

    const displayData = filteredList.slice(firstDataIndex, lastDataIndex);
    let totalPage = Math.ceil(filteredList.length / page);

    ////// To display Page numbers /////////

    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
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
            <div className="select">
              No. of results to show: &nbsp;
              <select
                className="input-select"
                value={this.state.value}
                name="page"
                onChange={this.handleChange}
              >
                <option value="2">2</option>
                <option value="5">5</option>
                <option selected value="10">
                  10
                </option>
              </select>
            </div>
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
                {displayData.map((person, index) => (
                  <Table key={index} {...person} />
                ))}
              </tbody>
            </table>
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
                    key={index}
                    id={number}
                    onClick={this.handleClick}
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

// select * from tracks join event_metadata
// on tracks.metadata_id = event_metadata.id where tracks.event_name=delete_account;
