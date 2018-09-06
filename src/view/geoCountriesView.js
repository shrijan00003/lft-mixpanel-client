import React from 'react';
import Chart from 'react-google-charts';
import { getTopData } from '../logic/topDataLogic';
import TableData from '../components/dashboard/tableData';

class GeoCountries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: null,
    };
  }
  async componentDidMount() {
    let metaData = this.props.usersDetails.metaData;

    if (metaData.length > 0) {
      let countryName = [];
      let latlngArr = [];
      for (let i in metaData) {
        countryName.push(metaData[i].location.countryName);
      }

      let userFromCountryResult = [
        ['', ''],
        ...getTopData(countryName).showTopResult,
      ];

      this.setState(prevState => ({
        chartData: [...userFromCountryResult],
      }));
    }
  }

  render() {
    return (
      <div className="row">
        {this.state.chartData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div>
            <div className="col-12">
              <div className="users-country row">
                <h3>Where are your users from?</h3>

                <div>
                  <div className="countries-map col-8">
                    <Chart
                      chartType="GeoChart"
                      width="90%"
                      data={this.state.chartData}
                    />
                  </div>
                  <div className="top-countries col-4">
                    <h3>Top Countries</h3>
                    <table className="mixpanel-data-table">
                      <tbody>
                        <tr>
                          <th>Country</th>
                          <th>Users</th>
                        </tr>
                        <TableData data={this.state.chartData} />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GeoCountries;
