module.exports = {
  subscribe: (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
      console.log('New user connected');

      socket.user = {
        name: "Anonymous",
        room: "main-room",
      }

      socket.join(socket.user["room"]);

      socket.send('hi');

      //socket.emit('new_connection', { message: " connected", username: socket.user["name"] });
      io.emit('new_connection', {
        username: socket.user["name"], 
        message: " has connected"
      });

      socket.on('change_username', (data) => {
        socket.user["name"] = data.username
      });

      socket.on('new_message', (data) => {
        io.to(socket.user["room"]).emit('new_message', {
          room: data.room,
          username: socket.user["name"],  
          message: data.message 
        });
      });

      socket.on('disconnect', function () {
        console.log('user disconnected');
        socket.broadcast.to(socket.user["room"]).emit('disconnect_message', {
          username: socket.user["name"], 
          message: ' has disconnected', 
        });
      });

      // listen on typing
      socket.on('typing', (data) => {
        socket.broadcast.to(socket.user["room"]).emit('typing', {
          room: data.room, 
          username: socket.user["name"],
          typing: data.typing
        });
      });

      socket.on('join_room', (data) => {
        if (data.room !== socket.user["room"]) {
          socket.leave(socket.user["room"], () => {
            console.log(`${socket.user["name"]} left #${data.room}`);
          });
          io.to(socket.user["room"]).emit('leave_message', { 
            room: data.room,
            username: socket.user["name"], 
            message: ` has left the ${socket.user["room"]}`, 
          });
          
          socket.user["room"] = data.room;
          socket.join(data.room, () => {
            console.log(`${socket.user["name"]} joined #${data.room}`);
            io.to(data.room).emit('join_message', { room: data.room, 
              message: ` has joined #${data.room}`, 
              username: socket.user["name"]
            });
          });
        }
      })

      socket.on('leave_room', (data) => {
        socket.leave(data.room, () => {
          console.log(`${socket.user["name"]} has left #${data.room}`);
          io.to(data.room).emit('leave_message', {
            room: data.room,
            username: socket.user["name"],
            message: ` has left #${data.room}`
          });
        });
      })
    });
  }
}