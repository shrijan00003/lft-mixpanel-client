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
      color: '233238',
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
  render() {
    console.log(this.props, 'inside piechart');
    return (
      <div className="App">
        <Chart
          chartType="PieChart"
          data={[['Age', 'Weight'], ['a', 12], ['b', 5.5]]}
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
