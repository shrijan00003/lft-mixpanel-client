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

    var ob = dev.reduce(function(acc, curr) {
      acc[curr.os] ? acc[curr.os]++ : (acc[curr.os] = 1);
      return acc;
    }, {});

    var resultt = Object.keys(ob).map(function(key) {
      return [key, ob[key]];
    });
    // let w = resultt.sort(function(a, b) {
    //   return b[1] - a[1];
    // });
    // let d = w.length > 3 ? 3 : w.length;
    // console.log(d, 'length');
    // let s = w.splice(0, d);
    // let t = w;
    // console.log(w, s, t);
    // if (t.length > 0) {
    //   let q = t.reduce((a, b) => a[1] + b[1]);
    //   console.log(q);
    //   s.push(['Others', q]);
    // }

    // console.log(s, 'kkko');

    // let osName = [];
    // let userNo = [];
    // let osUse = [];
    // let prev;

    // for (let i in device) {
    //   if (device[i].os !== prev) {
    //     osName.push(device[i].os);
    //     userNo.push(1);
    //   } else {
    //     userNo[userNo.length - 1]++;
    //   }
    //   prev = device[i].os;
    // }

    var obj = device.reduce(function(acc, curr) {
      acc[curr.os] ? acc[curr.os]++ : (acc[curr.os] = 1);
      return acc;
    }, {});
    console.log(obj);
    let result = [];
    if (obj) {
      Object.keys(obj).map(function(key) {
        result.push([key, obj[key]]);
      });
    }
    console.log(result, 'result');

    let w = result.sort(function(a, b) {
      return b[1] - a[1];
    });
    let d = w.length > 1 ? 1 : w.length;
    console.log(d, 'length');
    let s = w.splice(0, d);
    let t = w;
    console.log(w, s, t);
    if (t.length > 0) {
      let q = t.reduce((a, b) => a[1] + b[1]);
      console.log(q);
      s.push(['Others', q]);
    }

    console.log(s, 'kkko');

    // let sortedResult = result.sort(function(a, b) {
    //   return b[1] - a[1];
    // });
    // let len = sortedResult.length > 1 ? 1 : sortedResult.length;
    // // console.log(len, 'length');
    // let showResult = sortedResult.splice(0, len);
    // let restResult = sortedResult;
    // console.log(sortedResult, showResult, restResult);
    // if (restResult.length > 0) {
    //   let others = restResult.reduce((a, b) => a[1] + b[1]);
    //   console.log(others);
    //   showResult.push(['Others', others]);
    // }

    // console.log(showResult, 'kkko');

    // for (let i in osName) {
    //   osUse.push([osName[i], userNo[i]]);
    // }
    // console.log(result, osUse);

    this.setState(prevState => ({
      // osName: [...prevState.osName, ...osName],
      // osNo: [...prevState.osNo, ...userNo],
      osUsage: [...prevState.osUsage, ...result],
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
