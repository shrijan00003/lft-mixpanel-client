import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'react-google-charts';

const pieOptions = {
  title: '',
  pieHole: 0.5,
  slices: [
    {
      color: '#2BB673',
    },
    {
      color: '#d91e48',
    },
    {
      color: '#007fad',
    },
    {
      color: '#e9a227',
    },
  ],
  legend: {
    position: 'left',
    alignment: 'center',
    textStyle: {
      color: '#233238',
      fontSize: 14,
    },
  },
  tooltip: {
    showColorCode: true,
  },
  chartArea: {
    left: 0,
    top: 0,
    width: '100%',
    height: '80%',
  },
  fontName: 'Roboto',
};
class PieChartData extends React.Component {
  constructor() {
    super();
    this.state = {
      osName: [],
      osNo: [],
      osUsage: [['Os', 'Os Usage']],
    };
  }
  componentDidMount() {
    // let device = this.props.trackData.data;
    let device = [{ os: 'mint' }, { os: 'mint' }, { os: 'lin' }, { os: 'win' }];
    let osName = [];
    let userNo = [];
    let osUse = [];
    let prev;

    for (let i in device) {
      if (device[i].os !== prev) {
        osName.push(device[i].os);
        userNo.push(1);
      } else {
        userNo[userNo.length - 1]++;
      }
      prev = device[i].os;
    }
    for (let i in osName) {
      osUse.push([osName[i], userNo[i]]);
    }

    console.log(userNo, osName, osUse);
    this.setState(prevState => ({
      osName: [...prevState.osName, ...osName],
      osNo: [...prevState.osNo, ...userNo],
      osUsage: [...prevState.osUsage, ...osUse],
    }));
  }
  render() {
    console.log(this.props, this.state, 'inside piechart');
    return (
      <div className="App">
        <Chart
          chartType="PieChart"
          data={this.state.osUsage}
          options={pieOptions}
          graph_id="PieChart"
          width={'100%'}
          height={'300px'}
          legend_toggle
        />
      </div>
    );
  }
}

export default PieChartData;
