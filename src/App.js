import store from './store';
import Routes from './routes/routes';
import { Provider } from 'react-redux';
import socketIO from 'socket.io-client';
import React, { Component } from 'react';

import './fontAwesomeIcon/fontAwesomeIcon.js';

import './App.css';

class App extends Component {
  componentDidMount() {
    const endPoint = 'http://127.0.0.1:8848';
    const socket = socketIO(endPoint, {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
    socket.on('FromAPI', data => console.log(data));

    // socket.on('new message', function(data) {
    //   console.log('hello');
    // });
  }

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
