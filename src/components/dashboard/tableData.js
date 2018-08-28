import React from 'react';
import './dashboard.css';

class TableData extends React.Component {
  render() {
    return this.props.data.map((data, index) => {
      if (data[0] && data[1]) {
        return (
          <tr key={index}>
            <td> {data[0]} </td>
            <td> {data[1]} </td>
          </tr>
        );
      }
    });
  }
}

export default TableData;
