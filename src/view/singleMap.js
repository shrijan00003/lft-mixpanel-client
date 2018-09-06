import React from 'react';
import { Chart } from 'react-google-charts';

// const data = [
//   ['Year', 'Fixations'],
//   ['2015', '80 <bold>iii</bold>'],
//   ['2016', '90'],
//   ['2017', '100'],
//   ['2018', '90'],
//   ['2019', '80'],
// ];

const columns = [
  {
    type: 'number',
    label: 'Latitude',
  },
  {
    type: 'number',
    label: 'Longitude',
  },
  { type: 'string', role: 'tooltip', p: { html: true } },
];

// const Table = ({
//   eventName,
//   os,
//   createdAt,
//   browser,
//   ipAddress,
//   device,
//   location,
// }) => (
//   <tr>
//     <td> {eventName} </td>
//     <td> {os} </td>
//     <td> {createdAt} </td>
//     <td> {browser}</td>
//     <td>{ipAddress}</td>

//     <td>{device}</td>
//     <td>{JSON.stringify(location)}</td>
//   </tr>
// );

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
    // let val = Chart.chartWrapper.getChart().getSelection()[0];
    // if (val) {
    //   // console.log(this.props.latLngArray);
    //   this.setState({
    //     isClicked: true,
    //   });
    //   let params = {
    //     latitude: this.props.latLngArray[val.row + 1][0],
    //     longitude: this.props.latLngArray[val.row + 1][1],
    //   };
    //   console.log(params, val.row, this.props.latLngArray);
    // let trackResponse = await fetchTracksData(params);
    // this.setState({ searchResult: trackResponse.data });
    //}
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
        <div>
          <div>
            <Chart
              chartType="GeoChart"
              rows={this.props.latLngArray}
              columns={columns} //data={this.props.latLngArray}
              chartEvents={this.chartEvents}
              width="100%"
              height="378px"
              options={{
                region: this.props.code,
                resolution: 'country',
                datalessRegionColor: 'white',
                tooltip: { isHtml: true },
              }}
            />
          </div>
          {/* <div>
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
            </div>*/}
        </div>
      </div>
    );
  }
}

export default SingleMap;
