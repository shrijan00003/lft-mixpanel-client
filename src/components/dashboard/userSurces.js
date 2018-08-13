import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const renderUserSource = () => {
  //   func('c');
  return (
    <div>
      <div>
        <h2> Where are your users coming from</h2>
      </div>
    </div>
  );
};

// function func(input) {
//   var arr = ['a', 'b', 'c', 'd', 'e'];
//   var previous = '',
//     after = '';

//   arr.map(function(value) {
//     if (value == input) {
//       for (var i = arr.indexOf(input) - 1; i >= 0; i--) {
//         previous += arr[i];
//       }

//       for (i = arr.indexOf(input) + 1; i < arr.length; i++) {
//         after += arr[i];
//       }
//     }
//   });

//   console.log('Previous ' + input + ':' + previous);
//   console.log('After ' + input + ':' + after);
// }

export default renderUserSource;
