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
    position: 'bottom',
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
    console.log(this.props);
    let device = this.props.trackData.data;
    // let device = [{ os: 'mint' }, { os: 'mint' }, { os: 'lin' }, { os: 'win' }];
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

    this.setState(prevState => ({
      osName: [...prevState.osName, ...osName],
      osNo: [...prevState.osNo, ...userNo],
      osUsage: [...prevState.osUsage, ...osUse],
    }));
  }
  render() {
    return (
      <div className="App">
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
            <table>
              {this.state.osUsage.map((person, index) => (
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

export default PieChartData;
