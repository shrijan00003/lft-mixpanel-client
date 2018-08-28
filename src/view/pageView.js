import React from 'react';

import Chart from 'react-google-charts';
import '../components/pages/pages.css';
import { fetchPagesData } from '../services/pageServices';
import { fetchPagesDataWithCount } from '../services/pageServices';
import { pieOptions } from '../constants/chartConstants';

import '../components/dashboard/dashboard.css';

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

const Table1 = ({ ...data }) => (
  <tr>
    <td> {data[Object.keys(data)[0]]} </td>
    <td> {data[Object.keys(data)[1]]} </td>
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
      arr: null,
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
    let list = this.props.pageData.data;

    this.setState({ searchApiResult: this.props.pageData });

    let trackResponse = await fetchPagesDataWithCount(
      '?get=search&table=pages'
    );
    let array = [];
    if (!trackResponse.data) {
      throw new Error('hello');
    }
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
              <div className="col-6">
                Select results to show: &nbsp;
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

                {this.state.searchApiResult.data.map((data, index) => (
                  <Page key={index} {...data} />
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
