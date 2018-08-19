import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';

class SingleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latlngArr: '',
    };
  }
  componentDidMount() {
    this.setState({
      latlngArr: this.props.latlngArray,
    });
  }
  chartEvents = [
    {
      eventName: 'select',
      callback: Chart => {
        this.onSelectEvent(Chart);
      },
    },
  ];

  onSelectEvent(Chart) {
    let val = Chart.chartWrapper.getChart().getSelection()[0];
    if (val) {
      console.log(val.row, 'single', this.state.latlngArr[val.row + 1]);
    }
  }

  chartEvents = [
    {
      eventName: 'select',
      callback: Chart => {
        this.onSelectEvent(Chart);
      },
    },
  ];

  render() {
    console.log(this.props, 'lllll');
    return (
      <div className="single-map">
        <Chart
          chartType="GeoChart"
          data={[
            ['Latitude', 'Longitude'],
            [27.7115559, 85.32911899999999],
            [28.238, 83.9956],
            [27.5291, 84.3542],
            [40.714224, -73.961452],
          ]}
          chartEvents={this.chartEvents}
          width="100%"
          height="400px"
          options={{
            region: this.props.code,
            resolution: 'country',
          }}
        />
      </div>
    );
  }
}

export default SingleMap;
