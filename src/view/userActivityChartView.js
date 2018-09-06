import React from 'react';
import Chart from 'react-google-charts';

const options = {
  curveType: 'function',
  legend: { position: 'top' },
  hAxis: {
    title: 'Time Line',
    logScale: true,
  },
  vAxis: {
    title: 'Users Count',
    logScale: false,
  },
};

class UserActivityChartView extends React.Component {
  constructor() {
    super();
    this.state = {
      userVsdate: [['Date', 'Users']],
    };
  }
  componentDidMount() {
    let userDataFromMeta = this.props.usersDetails.weeklyUser.dataObj;
    let daily = [];
    userDataFromMeta.map((data, index) => {
      let dateData = new Date(data.dailydata);
      let dateAfterSplit = dateData.toString().split(' ');
      daily.push([
        `${dateAfterSplit[1]} ${dateAfterSplit[2]}`,
        Number(data.totaluser),
      ]);
    });
    this.setState(prevState => ({
      userVsdate: [...prevState.userVsdate, ...daily],
    }));
  }
  render() {
    return (
      <div className="row">
        <Chart
          chartType="LineChart"
          data={this.state.userVsdate}
          options={options}
          width={'100%'}
          height="300px"
          legend_toggle
        />
      </div>
    );
  }
}

export default UserActivityChartView;
