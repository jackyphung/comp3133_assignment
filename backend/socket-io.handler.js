module.exports = {
  subscribe: (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
      console.log('New user connected')
  
      socket.username = "Anonymous"
  
      socket.on('change_username', (data) => {
          socket.username = data.username
      })
  
      socket.on('new_message', (data) => {
          io.sockets.emit('new_message', {message : data.message, username : socket.username});
      })
  
      socket.on('disconnect', function() {
          console.log('user disconnected');
      })
    });
  }
}