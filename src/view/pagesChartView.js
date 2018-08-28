import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'react-google-charts';
import { getTopData } from '../services/topDataServices';

class ReferrerChart extends React.Component {
  constructor() {
    super();
    this.state = {
      referrerUsage: [['Top Referrers', 'Total no.']],
    };
  }
  componentDidMount() {
    let referDataFromMeta = this.props.pageData.data;

    let referCount = getTopData(referDataFromMeta, 'referrer');
    this.setState(prevState => ({
      referrerUsage: [...prevState.referrerUsage, ...referCount],
    }));
  }
  render() {
    return (
      <div className="col-12">
        <div className="row">
          <div className="col-6">
            <Chart
              chartType="BarChart"
              data={this.state.referrerUsage} //{data}
              width={'100%'}
              height={'215px'}
            />
          </div>
          <div className="col-6">
            <table>
              {this.state.referrerUsage.map((person, index) => (
                <tr>
                  <td> {person[0]} </td>
                  <td> {person[1]} </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ReferrerChart;
