import React from 'react';
import Chart from 'react-google-charts';
import { getTopData } from '../services/topDataServices';
import TableData from '../components/dashboard/tableData';

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
      <div>
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
            <tbody>
              <tr>
                <th>Referrers</th>
                <th>Visits</th>
              </tr>
              <TableData data={this.state.referrerUsage} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ReferrerChart;
