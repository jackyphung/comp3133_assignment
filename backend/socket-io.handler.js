module.exports = {
  subscribe: (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
      console.log('New user connected');

      socket.username = "Anonymous";

      socket.send('hi');

      //socket.emit('new_connection', { message: " connected", username: socket.username });
      io.emit('new_connection', { message: " has connected", username: socket.username });

      socket.on('change_username', (data) => {
        socket.username = data.username
      });

      socket.on('new_message', (data) => {
        io.sockets.emit('new_message', { message: data.message, username: socket.username });
      });

      socket.on('disconnect', function () {
        console.log('user disconnected');
        socket.broadcast.emit('disconnect_message', { message: 'has disconnected', username: socket.username});
      });

      // listen on typing
      socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { typing: data.typing, username: socket.username });
      });
    });
  }
}