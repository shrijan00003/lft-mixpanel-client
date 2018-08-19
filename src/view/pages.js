import React from 'react';
import AtGlance from '../components/dashboard/atGlance';
import UserSources from '../components/dashboard/userSurces';
// import GeoChart from './geoChart';
import Chart from 'react-google-charts';
import '../components/pages/pages.css';

// import TableData from '../components/dashboard/tableData';
import TableData from '../components/dashboard/tableData';
import '../components/dashboard/dashboard.css';
import store from '../store';
import GeoChartUI from './geoChartUI';

const Page = ({ name, referrer, search, title, url, path }) => (
  <tr>
    <td> {name} </td>
    <td> {referrer} </td>
    <td>{search}</td>
    <td>{title}</td>
    <td>
      <a href={url}>{url}</a>
    </td>
    <td>{path}</td>
  </tr>
);

class Pages extends React.Component {
  componentDidMount() {
    if (!this.props.pageIsLoaded) {
      this.props.fetchPage();
    }
    console.log(this.props);
    // if(this.props.pageData){

    // }
  }
  render() {
    return (
      <div className="container row">
        {this.props.pageData === null ? (
          <span>Loading...</span>
        ) : (
          <div>
            {' '}
            <table>
              <tr>
                <th> Name </th>
                <th> Referrer </th>
                <th>Search</th>
                <th>Title</th>
                <th>Url</th>
                <th>Path</th>
              </tr>

              {this.props.pageData.data.map((person, index) => (
                <Page key={index} {...person} />
              ))}
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default Pages;
