import React from 'react';
import AtGlance from '../components/dashboard/atGlance';
import UserSources from '../components/dashboard/userSurces';
// import GeoChart from './geoChart';
import Chart from 'react-google-charts';
import '../components/pages/pages.css';
import { fetchPagesData } from '../services/pageServices';
import { fetchPagesDataWithCount } from '../services/pageServices';
// import TableData from '../components/dashboard/tableData';
import TableData from '../components/dashboard/tableData';
import '../components/dashboard/dashboard.css';
import store from '../store';
import GeoChartUI from './geoChartUI';

const Page = ({ name, referrer, search, title, url, path, createdAt }) => (
  <tr>
    <td> {name} </td>
    <td> {referrer} </td>
    <td>{search}</td>
    <td>{title}</td>
    <td>{createdAt}</td>
    <td>
      <a href={url}>{url}</a>
    </td>
    <td>{path}</td>
  </tr>
);

const Table1 = ({ ...person }) => (
  <tr>
    <td> {person[Object.keys(person)[0]]} </td>
    <td> {person[Object.keys(person)[1]]} </td>
  </tr>
);

class Pages extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      page_size: '10',
      page: 1,
      date: '',
      searchApiResult: null,
      ans: null,
      apiCol: 'referrer',
    };

    this.handleChange = this.handleChange.bind(this);
    this.changer = this.changer.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }
  // handleClick(event) {
  //   this.setState({
  //     current_page: Number(event.target.id),
  //   });
  // }

  async handleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });

    let params = {
      search: this.state.search,
      date: this.state.date,
      page: this.state.page,
      page_size: this.state.page_size,
    };
    let trackResponse = await fetchPagesData(params);
    this.setState({
      searchApiResult: trackResponse.data,
      page: '1',
    });
  }

  async changer(event) {
    await this.setState({ [event.target.name]: event.target.value });
    let trackResponse = await fetchPagesDataWithCount(
      '?get=' + this.state.apiCol + '&table=pages'
    );
    console.log(trackResponse, 'trackresp');
    this.setState({ ans: trackResponse.data.data });
  }

  async componentDidMount() {
    let list = this.props.pageData.data;
    this.setState({ searchApiResult: this.props.pageData });

    let trackResponse = await fetchPagesDataWithCount(
      '?get=search&table=pages'
    );
    console.log(trackResponse);
    this.setState({ ans: trackResponse.data.data });
  }

  render() {
    // let pagesArray = [];

    // const { search, page, current_page, date } = this.state;
    // // var newdate = date.split("/").reverse().join("-");

    // let filteredList = list.filter(
    //   e => {
    //     return (
    //       e.name.toLowerCase().includes(search.toLowerCase()) &&
    //       e.createdAt.toLowerCase() > date.toLowerCase()
    //     );

    //     //  e.createdAt.toLowerCase().includes(date.toLowerCase())
    //   }
    //   // ||
    //   // e.gender.toLowerCase().startsWith(search.toLowerCase()) ||
    //   // e.company.toLowerCase().includes(search.toLowerCase())
    // );

    // ///// To get the required data in pagination /////

    // const lastDataIndex = current_page * page;

    // let firstDataIndex = lastDataIndex - page;
    // if (firstDataIndex >= list.length) {
    //   firstDataIndex = 0;
    // }

    // const displayData = filteredList.slice(firstDataIndex, lastDataIndex);
    // let totalPage = Math.ceil(filteredList.length / page);

    ////// To display Page numbers /////////

    const pageNumbers = [];
    if (this.state.searchApiResult !== null) {
      console.log(this.state.searchApiResult, 'why is it');
      for (let i = 1; i <= this.state.searchApiResult.meta.pageCount; i++) {
        pageNumbers.push(i);
      }
    }

    return (
      <div className="container row">
        {this.props.pageData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div>
            {/*            {JSON.stringify(getAddress(this.props.trackData.data[0].location))}{' '}
        */}{' '}
            <div className="row">
              <div className="col-6">
                <div className="input-label">Search By Name</div>
                <input
                  name="search"
                  className="input-search"
                  placeholder="Search by Name"
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
                name="page_size"
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
                    <option value="path">path</option>
                    <option value="referrer">referrer</option>
                    <option selected value="search">
                      search
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
              PAGES RESULTS
            </div>
            {this.state.searchApiResult === null ? (
              <span>Calculaing... </span>
            ) : (
              <table>
                <tr>
                  <th>Name </th>
                  <th>Referrer </th>
                  <th>Search</th>
                  <th>Title</th>
                  <th>Created At</th>
                  <th>Url</th>
                  <th>Path</th>
                </tr>

                {this.state.searchApiResult.data.map((person, index) => (
                  <Page key={index} {...person} />
                ))}
              </table>
            )}
            <div className="pagination">
              <strong>
                Pages: &nbsp;
                {pageNumbers.map((number, index) => (
                  <button
                    className="pager"
                    key={index}
                    name="page"
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

export default Pages;
