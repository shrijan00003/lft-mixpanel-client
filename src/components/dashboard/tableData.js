import React, { Component } from 'react';
import Chart from 'react-google-charts';
import './dashboard.css';

// import store from '../../store';

var cssClassNames = {
  headerRow: 'cssHeaderRow',
  tableRow: 'cssTableRow',
  oddTableRow: 'cssOddTableRow',
  selectedTableRow: 'cssSelectedTableRow',
  hoverTableRow: 'cssHoverTableRow',
  headerCell: 'cssHeaderCell',
  tableCell: 'cssTableCell',
  rowNumberCell: 'cssRowNumberCell',
};

const Page = ({ name, referrer, search, title, url, path }) => (
  <tr>
    <td> {name} </td>
    <td> {referrer} </td>
    <td>{search}</td>
    <td>{title}</td>
    <td>
      <a href={url}>{url}</a>
    </td>
    <td>{path}</td>
  </tr>
);

class TableData extends React.Component {
  render() {
    return (
      <div>
        {this.props.chartData === null ? (
          <span>{this.props.statusMessage}</span>
        ) : (
          <div className="row">
            <div className="col-7">
              <Chart
                chartType="GeoChart"
                width="90%"
                height="500"
                data={this.props.chartData}
              />
            </div>
            <div className="col-3">
              <table>
                {this.props.chartData.map((person, index) => (
                  <tr>
                    <td> {person[0]} </td>
                    <td> {person[1]} </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
          /*} </div>*/
        )}
      </div>
    );
  }
}

export default TableData;
