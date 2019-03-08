const EventLog = require('./models/EventLog');
const History = require("./models/History");

module.exports = {
  subscribe: (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
      const id = socket.id
      socket.user = {
        name: `Anonymous-${id.substr(0, 5)}`,
        room: "",
      }

      let event = EventLog({ 
        event: "User Connection",
        user: socket.user["name"],
        message: `${socket.user["name"]} connected`
      });
      event.save();
      console.log(`[Event][${event.event}] ${event.message}`);

      socket.emit("connected", {
        username: socket.user["name"]
      });

      socket.on('change_username', (data) => {
        let event = EventLog({ 
          event: "Username Changed",
          user: socket.user["name"],
          message: `${socket.user["name"]} changed their username to ${data.username}`
        });
        event.save();

        console.log(`[Event][${event.event}] ${event.message}`);

        socket.user["name"] = data.username;
      });

      socket.on('new_message', (data) => {
        let messageData = {
          username: socket.user["name"],
          message: data.message
        }
        History.findOneAndUpdate({ room: data.room }, {
          $push: { chat_history: messageData }
        }, (err, history) => {
          if (err)
            throw err;
          
          let event = EventLog({ 
            event: "Message Sent",
            user: socket.user["name"],
            message: `${socket.user["name"]} sent a message to #${data.room}`
          });
          event.save();
          console.log(`[Event][${event.event}] ${event.message}`);

          messageData.room = data.room
          io.to(socket.user["room"]).emit('new_message', messageData);
        })
      });

      socket.on('disconnect', function () {
        let event = EventLog({ 
          event: "User Disconnection",
          user: socket.user["name"],
          message: `${socket.user["name"]} has disconnected`
        });
        event.save();
        console.log(`[Event][${event.event}] ${event.message}`);

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
          if (socket.user["room"] != "") {
            socket.leave(socket.user["room"], () => {
              console.log(`${socket.user["name"]} left #${data.room}`);
            });

            let event = EventLog({ 
              event: "Room Left",
              user: socket.user["name"],
              message: `${socket.user["name"]} has left #${socket.user["room"]}`
            });
            event.save();
            console.log(`[Event][${event.event}] ${event.message}`);

            io.to(socket.user["room"]).emit('leave_message', { 
              room: data.room,
              username: socket.user["name"], 
              message: ` has left the ${socket.user["room"]}`, 
            });
          }
          
          socket.user["room"] = data.room;
          socket.join(data.room, () => {
            let event = EventLog({ 
              event: "Room Joined",
              user: socket.user["name"],
              message: `${socket.user["name"]} joined #${data.room}`
            });
            event.save();
            console.log(`[Event][${event.event}] ${event.message}`);

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

          let event = EventLog({ 
            event: "Room Left",
            user: socket.user["name"],
            message: `${socket.user["name"]} has left #${data.room}`
          });
          event.save();
          console.log(`[Event][${event.event}] ${event.message}`);

          socket.emit('leave_message', leaveData);
          io.to(data.room).emit('leave_message', leaveData);
        });
      })
    });
  }
}