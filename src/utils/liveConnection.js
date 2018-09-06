import auth from './auth';
import socketIO from 'socket.io-client';
import { USER_NAME } from '../constants/authConstants';

let socket = null;
const endPoint = 'http://127.0.0.1:8848';

export const connectLiveServer = () => {
  const room = auth.getDetails(USER_NAME);
  socket = socketIO(endPoint);

  socket.on('connect', function() {
    console.log(room);
    socket.emit('room', room);
  });

  return socket;
};

export const disconnectRoom = () => {
  // socket.on('connect', function() {
  //   socket.leave('room', room);
  // });
  if (socket) {
    socket.disconnect();
  }
};
