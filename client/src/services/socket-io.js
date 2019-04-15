import openSocket from 'socket.io-client';
const socket = openSocket(`${location.protocol}//${location.hostname}:${location.port}/`);

class SocketIO {
  
}

export { SocketIO };