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
      // osName: [],
      // osNo: [],
      osUsage: [['Os', 'Os Usage']],
    };
  }
  componentDidMount() {
    console.log(this.props);
    let device = this.props.usersDetails.metaData;

    let dev = [
      { os: 'lin' },
      { os: 'lin' },
      { os: 'win' },
      { os: 'ios' },
      { os: 'win' },
      { os: 'unix' },
      { os: 'ios' },
      { os: 'android' },
      { os: 'android' },
      { os: 'unix' },
      { os: 'unix' },
    ];

    var obj = device.reduce(function(acc, curr) {
      acc[curr.os] ? acc[curr.os]++ : (acc[curr.os] = 1);
      return acc;
    }, {});
    console.log(obj);
    var result = Object.keys(obj).map(function(key) {
      console.log([key, obj[key]]);
      return [key, obj[key]];
    });
    console.log(result, 'result');

    let sortList = result.sort(function(a, b) {
      return b[1] - a[1];
    });
    let len = sortList.length > 4 ? 4 : sortList.length;
    console.log(len, 'length');
    let showResult = sortList.splice(0, len);
    let restResult = sortList;
    console.log(sortList, showResult, restResult);
    let q;
    if (restResult.length > 1) {
      q = restResult.reduce((a, b) => a[1] + b[1]);
      showResult.push(['Others', q]);
    } else if (restResult.length === 1) {
      q = restResult[0][1];
      showResult.push(['Others', q]);
    }
    console.log(showResult, 'kkko');

    this.setState(prevState => ({
      // osName: [...prevState.osName, ...osName],
      // osNo: [...prevState.osNo, ...userNo],
      osUsage: [...prevState.osUsage, ...showResult],
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
              {this.state.osUsage.map(person => (
                <tr>
                  <td> {person[0]}</td>
                  <td> {person[1]}</td>
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
