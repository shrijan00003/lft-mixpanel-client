import React from 'react';
import Chart from 'react-google-charts';
import { getTopData } from '../logic/topDataLogic';
import { pieOptions } from '../constants/chartConstants';

import TableData from '../components/dashboard/tableData';

class BrowserChart extends React.Component {
  constructor() {
    super();
    this.state = {
      browserUsage: [['', '']],
    };
  }
  componentDidMount() {
    let browserDataFromMeta = this.props.usersDetails.metaData;

    let browserCount = getTopData(browserDataFromMeta, 'browser');
    this.setState(prevState => ({
      browserUsage: [...prevState.browserUsage, ...browserCount.showTopResult],
    }));
  }
  render() {
    return (
      <div className="col-12">
        <div className="row">
          <div className="col-7">
            <Chart
              chartType="PieChart"
              data={this.state.browserUsage} //{data}
              options={pieOptions}
              width={'100%'}
              legend_toggle
            />
          </div>
          <div className="col-5">
            <table className="mixpanel-data-table">
              <tbody>
                <tr>
                  <th>Browsers</th>
                  <th>Visits</th>
                </tr>
                <TableData data={this.state.browserUsage} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default BrowserChart;
