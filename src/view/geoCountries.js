import React from 'react';
import Chart from 'react-google-charts';
import { getTopData } from '../services/topDataServices';
import TableData from '../components/dashboard/tableData';

class GeoCountries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [['Country', 'Users']],
    };
  }
  async componentDidMount() {
    if (!this.props.chartIsLoaded) {
      let metaData = this.props.usersDetails.metaData;

      if (metaData.length > 0) {
        let countryName = [];
        let latlngArr = [];
        for (let i in metaData) {
          countryName.push(metaData[i].location.countryName);
          var latlng = {
            lat: parseFloat(metaData[i].location.latitude),
            lng: parseFloat(metaData[i].location.longitude),
          };
          latlngArr.push(Object.values(latlng));
        }

        let userFromCountryResult = [
          ['', ''],
          ...getTopData(countryName).showTopResult,
        ];

        let latlngArrayResult = [['Latitude', 'Longitude'], ...latlngArr];

        this.props.fetchChart(userFromCountryResult, latlngArrayResult);

        this.setState(prevState => ({
          chartData: [...prevState.chartData, ...userFromCountryResult],
        }));
      }
    }
  }

  render() {
    return (
      <div className="container row">
        {this.props.chartData === null ? (
          <span>{this.props.statusMessage} </span>
        ) : (
          <div>
            <div className="col-12">
              <div className="users-country row">
                <h3>Where are your users from</h3>
                {this.props.chartData === null ? (
                  <span>{this.props.statusMessage}</span>
                ) : (
                  <div>
                    <div className="countries-map col-8">
                      <Chart
                        chartType="GeoChart"
                        width="90%"
                        data={this.props.chartData}
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
                          <TableData data={this.props.chartData} />
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GeoCountries;
