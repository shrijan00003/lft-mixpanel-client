import React, { Component } from 'react';
import Chart from 'react-google-charts';
import './dashboard.css';

class TableData extends React.Component {
  render() {
    return (
      <div>
        <table>
          {this.props.data.map((data, index) => (
            <tr key={index}>
              <td> {data[0]} </td>
              <td> {data[1]} </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default TableData;
