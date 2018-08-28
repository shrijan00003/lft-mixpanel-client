import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'react-google-charts';
import TableData from '../components/dashboard/tableData';

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
      referrerUsage: [...prevState.referrerUsage, ...referCount.showTopResult],
    }));
  }
  render() {
    return (
      <div className="App">
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
            <TableData data={this.state.referrerUsage} />
          </div>
        </div>
      </div>
    );
  }
}

export default ReferrerChart;
