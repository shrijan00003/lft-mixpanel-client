import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'react-google-charts';

let data = [
  ['Element', 'Density'],
  ['Copper', 8.94], // RGB value
  ['Silver', 10.49], // English color name
  ['Gold', 19.3],
  ['Platinum', 21.45],
];
class BarChartData extends React.Component {
  constructor() {
    super();
    this.state = {
      osName: [],
      osNo: [],
      osUsage: [['Top Referrers', 'Total no.']],
    };
  }
  componentDidMount() {
    let device = this.props.pageData.data;

    let osName = [];
    let userNo = [];
    let osUse = [];
    let prev;

    for (let i in device) {
      if (device[i].referrer !== prev) {
        osName.push(device[i].referrer);
        userNo.push(1);
      } else {
        userNo[userNo.length - 1]++;
      }
      prev = device[i].referrer;
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
          <div className="col-6">
            {/*<Chart
                //   chartType="BarChart"
                //   width="100%"
                //   height="400px"
                //   data={[
                //     ['Element', 'Density'],
                //     ['Copper', 8.94], // RGB value
                //     ['Silver', 10.49], // English color name
                //     ['Gold', 19.3],
                //     ['Platinum', 21.45],
                //   ]}
                 // />}*/}
            <Chart
              chartType="BarChart"
              data={this.state.osUsage} //{data}
              width={'100%'}
              height={'215px'}
            />
          </div>
          <div className="col-6">
            <table>
              {this.state.osUsage.map((person, index) => (
                <tr>
                  <td> {person[0]} </td> {/*/{person[0].split('.')[1]}*/}
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

export default BarChartData;
