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
      referrerUsage: [['Top Referrers', 'Total no.']],
    };
  }
  componentDidMount() {
    let refer = this.props.pageData.data;

    var obj = refer.reduce(function(acc, curr) {
      acc[curr.os] ? acc[curr.os]++ : (acc[curr.os] = 1);
      return acc;
    }, {});

    var result = Object.keys(obj).map(function(key) {
      return [key, obj[key]];
    });
    this.setState(prevState => ({
      referrerUsage: [...prevState.referrerUsage, ...result],
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
              data={this.state.referrerUsage} //{data}
              width={'100%'}
              height={'215px'}
            />
          </div>
          <div className="col-6">
            <table>
              {this.state.referrerUsage.map((person, index) => (
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
