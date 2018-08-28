import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'react-google-charts';
import TableData from '../components/dashboard/tableData';
import { getTopData } from '../services/topDataServices';
import { pieOptions } from '../constants/chartConstants';

class TracksChartView extends React.Component {
  constructor() {
    super();
    this.state = {
      osUsage: [['Os', 'Os Usage']],
    };
  }
  componentDidMount() {
    let osDataFromMeta = this.props.usersDetails.metaData;
    console.log(this.props);
    let osUse = getTopData(osDataFromMeta, 'os');
    console.log(osUse);

    this.setState(prevState => ({
      osUsage: [...prevState.osUsage, ...osUse.showTopResult],
    }));
  }
  render() {
    return (
      <div className="col-12">
        <div className="row">
          <div className="col-6" style={{ paddingTop: 50 + 'px' }}>
            <Chart
              chartType="PieChart"
              data={this.state.osUsage}
              options={pieOptions}
              graph_id="PieChart"
              width={'100%'}
              height={'180px'}
              legend_toggle
            />
          </div>
          <div className="col-6">
            <TableData data={this.state.osUsage} />
          </div>
        </div>
      </div>
    );
  }
}

export default TracksChartView;
