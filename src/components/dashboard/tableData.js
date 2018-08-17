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

class TableData extends React.Component {
  render() {
    return (
      <div>
        {this.props.chartData === null ? (
          <span>Loading... </span>
        ) : (
          <div className="row">
            <div className="col-4">
              <Chart
                chartType="Table"
                width="100%"
                data={this.props.chartData}
                option={{
                  showRowNumber: true,
                  allowHtml: true,
                  cssClassNames: cssClassNames,
                }}
              />
            </div>
            <div className="col-8">
              <Chart
                chartType="GeoChart"
                width="100%"
                height="500"
                data={this.props.chartData}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TableData;
