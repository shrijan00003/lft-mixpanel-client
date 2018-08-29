import React from 'react';
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
      isClicked: false,
      searchResult: null,
    };
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
      console.log(
        val.row,
        'single',
        this.props.chartSingleData[val.row + 1][0]
      );

      this.setState({
        isClicked: true,
      });

      let params = {
        latitude: this.props.chartSingleData[val.row + 1][0],

        longitude: this.props.chartSingleData[val.row + 1][1],
      };

      let trackResponse = await fetchTracksData(params);
      this.setState({ searchResult: trackResponse.data });
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
    return (
      <div>
        {this.props.trackData === null ? (
          <span>{this.props.statusMessage}</span>
        ) : (
          <div>
            <div className="col-5">
              <Chart
                chartType="GeoChart"
                data={this.props.chartSingleData}
                chartEvents={this.chartEvents}
                width="100%"
                height="400px"
                options={{
                  region: this.props.code,
                  resolution: 'country',
                  datalessRegionColor: 'white',
                }}
              />
            </div>
            <div>
              {this.state.isClicked ? (
                <div className="row">
                  {this.state.searchResult === null ? (
                    <span>{this.props.statusMessage} </span>
                  ) : (
                    <table>
                      <tbody>
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
                      </tbody>
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
