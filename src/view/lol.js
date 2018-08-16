import React, { Component } from 'react';
import Chart from 'react-google-charts';

import store from '../store';
var cssClassNames = {
  headerRow: 'bigAndBoldClass',
  hoverTableRow: 'highlightClass',
};

class Lol extends React.Component {
  componentDidMount() {
    console.log(store.getState().chart.chartData);
  }

  render() {
    return (
      <div>
        <Chart
          chartType="Table"
          width="100%"
          data={store.getState().chart.chartData}
          option={{
            allowHtml: true,
          }}
          cssClassNames={cssClassNames}
        />
      </div>
    );
  }
}

export default Lol;
