import store from './store';
import Routes from './routes/routes';
import { Provider } from 'react-redux';
import socketIO from 'socket.io-client';
import React, { Component } from 'react';

import './fontAwesomeIcon/fontAwesomeIcon.js';

import './App.css';

class App extends Component {
  constructor() {
    super();
    const endPoint = 'http://127.0.0.1:8848';
    const socket = socketIO(endPoint);
    socket.on('FromAPI', console.log);
  }

  // componentDidMount() {

  //   // socket.on('new message', function(data) {
  //   //   console.log('hello');
  //   // });
  // }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Routes />
        </div>
      </Provider>
    );
  }
}

export default App;
