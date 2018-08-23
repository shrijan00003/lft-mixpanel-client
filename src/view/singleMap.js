import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';
import { fetchTracksData } from '../services/trackServices';

const Table = ({
  eventName,
  os,
  createdAt,
  browser,
  ipAddress,
  device,
  location,
}) => (
  <tr>
    <td> {eventName} </td>
    <td> {os} </td>
    <td> {createdAt} </td>
    <td>{browser}</td>
    <td>{ipAddress}</td>

    <td>{device}</td>
    <td>{JSON.stringify(location)}</td>
  </tr>
);

class SingleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latlngArr: '',
      latlngSearch: '',
      latSearch: '',
      lngSearch: '',
      isClicked: false,
      searchResult: null,
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

  async onSelectEvent(Chart) {
    let val = Chart.chartWrapper.getChart().getSelection()[0];
    if (val) {
      console.log(val.row, 'single', this.state.latlngArr[val.row + 1][0]);
      this.setState({
        latlngSearch:
          'latitude=' +
          this.state.latlngArr[val.row + 1][0] +
          '&longitude=' +
          this.state.latlngArr[val.row + 1][1],
      });
      this.setState({
        isClicked: true,
      });

      let params = {
        // : this.state.search,
        latitude: this.state.latlngArr[val.row + 1][0],

        longitude: this.state.latlngArr[val.row + 1][1],
      };

      let trackResponse = await fetchTracksData(params);
      this.setState({ searchResult: trackResponse.data });
      //  this.props.fetchTrackWithLocation(this.state.latlngSearch);
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
    console.log(this.props, 'single');
    return (
      <div>
        {this.props.trackData === null ? (
          <span>Loading... </span>
        ) : (
          <div>
            <div>
              <Chart
                chartType="GeoChart"
                data={this.state.latlngArr}
                chartEvents={this.chartEvents}
                width="100%"
                height="400px"
                options={{
                  region: this.props.code,
                  resolution: 'country',
                }}
              />
            </div>
            <div>
              {this.state.isClicked ? (
                <div>
                  {this.state.searchResult === null ? (
                    <span>Loading... </span>
                  ) : (
                    <table>
                      <tr>
                        <th> EventName </th>
                        <th> Os </th>
                        <th> Created At </th>
                        <th>Browser</th>
                        <th>IpAddress</th>
                        <th>Device</th>
                        <th>Location</th>
                      </tr>

                      {this.state.searchResult.data.map((person, index) => (
                        <Table key={index} {...person} />
                      ))}
                    </table>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SingleMap;
