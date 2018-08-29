import React from 'react';
import Chart from 'react-google-charts';
import { pieOptions } from '../constants/chartConstants';
import { fetchPagesData } from '../services/pageServices';
import { fetchPagesDataWithCount } from '../services/pageServices';

import '../components/pages/pages.css';

const Page = ({ name, referrer, title, url, path, createdAt }) => (
  <tr>
    <td> {name} </td>
    <td> {referrer} </td>
    <td>{title}</td>
    <td>{createdAt}</td>
    <td>
      <a href={url}>{url}</a>
    </td>
    <td>{path}</td>
  </tr>
);

const PageAnalyticsTable = ({ ...data }) => (
  <tr>
    <td> {data[Object.keys(data)[0]]} </td>
    <td> {data[Object.keys(data)[4]]} </td>
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
    let pageResponse = await fetchPagesData(params);
    this.setState({
      searchApiResult: pageResponse.data,
      page: '1',
    });
  }

  async changer(event) {
    await this.setState({ [event.target.name]: event.target.value });
    let pageResponse = await fetchPagesDataWithCount(
      '/analytics?getBy=' + this.state.apiCol
    );
    let array = [];

    pageResponse.data.data.map(data =>
      array.push([
        data[Object.keys(data)[0]],
        parseInt(data[Object.keys(data)[4]], 10),
      ])
    );
    this.setState(prev => ({
      ans: pageResponse.data.data,
      arr: [['Name', 'Count'], ...array],
    }));
  }

  async componentDidMount() {
    this.setState({ searchApiResult: this.props.pageData });

    // console.log(this.props.pageData);

    let pageResponse = await fetchPagesDataWithCount('/analytics');
    console.log(pageResponse);
    let array = [];

    pageResponse.data.data.map(data =>
      array.push([
        data[Object.keys(data)[0]],
        parseInt(data[Object.keys(data)[4]], 10),
      ])
    );
    this.setState(prev => ({
      ans: pageResponse.data.data,
      arr: [['Name', 'Count'], ...array],
    }));
  }

  render() {
    const pageNumbers = [];
    if (this.state.searchApiResult !== null) {
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
            <div className="col-12">
              <div className="tracks-data row">
                <div className="tracks-data-header row">
                  <div className="no-margin-no-padding">
                    <div className="tracks-data-header-title">
                      <h3>Pages Statistics</h3>
                    </div>
                  </div>
                </div>
                {this.state.arr === null ? (
                  <span>Calculaing... </span>
                ) : (
                  <div className="col-8">
                    <div className="select-track">
                      Showing&nbsp;
                      <select
                        className="input-select"
                        value={this.state.value}
                        name="apiCol"
                        onChange={this.changer}
                      >
                        <option value="path">Path</option>
                        <option value="referrer">Referrer</option>
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
                  <div className="col-4">
                    <table className="mixpanel-data-table">
                      <tbody>
                        <tr>
                          <th> Name </th>
                          <th> Count </th>
                        </tr>
                        {this.state.ans.map((data, index) => (
                          <PageAnalyticsTable key={index} {...data} />
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
                    <h3>Pages Tracked</h3>
                  </div>
                </div>
                <div className="col-6">
                  <div className="search-field-wrapper">
                    <input
                      name="search"
                      className="track-search"
                      placeholder="Search by Name"
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
                      name="page_size"
                      onChange={this.handleChange}
                    >
                      <option value="5">5</option>
                      <option value="2">2</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>
                {this.state.searchApiResult === null ? (
                  <span>Calculaing... </span>
                ) : (
                  <table className="mixpanel-data-table">
                    <tbody>
                      <tr>
                        <th>Name </th>
                        <th>Referrer </th>
                        <th>Title</th>
                        <th>Created At</th>
                        <th>Url</th>
                        <th>Path</th>
                      </tr>

                      {this.state.searchApiResult.data.map((data, index) => (
                        <Page key={index} {...data} />
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
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Pages;
