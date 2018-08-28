import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'react-google-charts';
import TableData from '../components/dashboard/tableData';

import { getTopData } from '../services/topDataServices';

class ReferrerChart extends React.Component {
  constructor() {
    super();
    this.state = {
      referrerUsage: [['', '']],
    };
  }
  componentDidMount() {
    let referDataFromMeta = this.props.pageData.data;

    let referCount = getTopData(referDataFromMeta, 'referrer');
    this.setState(prevState => ({
      referrerUsage: [...prevState.referrerUsage, ...referCount.showTopResult],
    }));
  }
  render() {
    return (
      <div className="col-12">
        <div className="row">
          <div className="col-8">
            <Chart
              chartType="BarChart"
              data={this.state.referrerUsage} //{data}
              width={'100%'}
              height={'215px'}
            />
          </div>
          <div className="col-4">
            <table className="mixpanel-data-table">
              <thead>
                <tr>
                  <th>Referrers</th>
                  <th>Visits</th>
                </tr>
              </thead>
              <tbody>
                <TableData data={this.state.referrerUsage} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ReferrerChart;
