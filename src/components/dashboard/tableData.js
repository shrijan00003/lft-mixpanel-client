import React, { Component } from 'react';
import Chart from 'react-google-charts';
import './dashboard.css';

class TableData extends React.Component {
  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.props.data.map((data, index) => (
              <tr key={index}>
                <td> {data[0]} </td>
                <td> {data[1]} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableData;
