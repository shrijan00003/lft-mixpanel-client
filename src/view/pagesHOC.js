import React from 'react';
import AtGlance from '../components/dashboard/atGlance';
import UserSources from '../components/dashboard/userSurces';
// import GeoChart from './geoChart';
// import TableData from '../components/dashboard/tableData';
import { GeoChart, Country } from './dashboard';
import TableData from '../components/dashboard/tableData';
import '../components/dashboard/dashboard.css';
import store from '../store';
import Page from './pages';

class PageHOC extends React.Component {
  componentDidMount() {
    if (!this.props.pageIsLoaded) {
      this.props.fetchPage();
    }
  }
  render() {
    return (
      <div className="container row">
        {this.props.pageData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div>
            <Page {...this.props} />
          </div>
        )}
      </div>
    );
  }
}

export default PageHOC;
