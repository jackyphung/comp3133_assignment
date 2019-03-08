module.exports = {
  subscribe: (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
      const id = socket.id
      socket.user = {
        name: `Anonymous-${id.substr(0, 5)}`,
        room: "",
      }

      console.log(`${socket.user["name"]} connected`);

      socket.emit("connected", {
        username: socket.user["name"]
      })

      io.to(socket.user["room"]).emit('new_connection', {
        username: socket.user["name"], 
        message: ` has joined #${socket.user["room"]}`
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
        console.log(`${socket.user["name"]} has disconnected`);
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

          if (socket.user["room"] != "")
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
        socket.user["room"] = null;
        socket.leave(data.room, () => {
          leaveData = {
            room: data.room,
            username: socket.user["name"],
            message: ` has left #${data.room}`
          };
          console.log(`${socket.user["name"]} has left #${data.room}`);
          socket.emit('leave_message', leaveData);
          io.to(data.room).emit('leave_message', leaveData);
        });
      })
    });
  }
}