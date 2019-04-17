import openSocket from 'socket.io-client';
import { clearTimeout } from 'timers';
const socket = openSocket(`${location.protocol}//${location.hostname}:${location.port}/`);

const message = $("#message");
const username = $("#username");
const send_message = $("#send_message");
const send_username = $("#send_username");
const chatroom = $("#chatroom");
const typing_feedback = $("#typing-feedback");
const connect_feedback = $('#connect-feedback');
const change_room = $("#change_room");
const join_room = $(".join-room");
const leave_room = $("#leave_room");

var current_room = "";
var typingTimeout;
var connectTimeout;
var disconnectTimeout;


class SocketIO {
  timeoutTyping() {
    socket.emit("typing", {typing: false, room: current_room})
  }

  timeoutConnect() {
    $(".connect").remove();
  }

  timeoutDisconnect() {
    $(".disconnect").remove();
  }

  change_room() {
    change_room.click(() => {
      showModal("rooms");
    })
  }

  send_message() {
    send_message.click(() => {
      let new_message = message.val().trim();
      if (new_message.length > 0) {
        socket.emit('new_message', {message: new_message, room: current_room});
        message.val("");
      }
    })
  }
  
  new_message() {
    socket.on("new_message", (data) => {
      chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
      chatroom.animate({ scrollTop: chatroom.height() }, "fast");
    });
  }

  send_username() {
    send_username.click(function () {
      console.log(username.val())
      socket.emit('change_username', { username: username.val() });
    })
  }

  keypress() {
    message.bind("keypress", (e) => {
      socket.emit('typing', { typing: true, room: current_room });
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(timeoutTyping, 2000);
    });
  }

  keyup() {
    message.on("keyup", (e) => {
      if(e.keyCode == 13) {
        if (message.val().length > 0) {
          send_message.click();
        }
      }
    });
  }

  typing() {
    socket.on('typing', (data) => {
      if(data.typing)
        typing_feedback.html("<p><em><strong>" + data.username + "</strong> is typing a message..." + "</em></p>");
      else
        typing_feedback.html("");
    })
  }

  connected() {
    socket.on("connected", (data) => {
      username.val(data.username);
      message.attr("disabled", true);
      message.attr("placeholder", "You are currently not connected to a room.");
      send_message.attr("disabled", true);
      if (current_room != "") {
        socket.emit("join_room", { room: current_room });
      } else {
        showModal("rooms");
      }
    });
  }

  disconnect_message() {
    socket.on('disconnect_message', (data) => {
      if (connect_feedback.find("p.disconnect").length)
        $(".disconnect").html("<strong>" + data.username + "</strong>" + data.message);
      else
        connect_feedback.append("<p class='disconnect'><strong>" + data.username + "</strong>" + data.message + "</p>");
  
      clearTimeout(disconnectTimeout);
      disconnectTimeout = setTimeout(timeoutDisconnect, 2000);
    });
  }

  join_room() {
    join_room.click((e) => {
      if (e.target.id !== current_room) {
        current_room = e.target.id;
        socket.emit('join_room', { room: current_room });
        chatroom.find('.message').remove();
      }
      hideModal("rooms");
    });
  }

  join_message() {
    socket.on('join_message', (data) => {
      message.removeAttr("disabled");
      message.removeAttr("placeholder");
      send_message.removeAttr("disabled");
      if (connect_feedback.find(".connect").length)
        $(".connect").html("<strong>" + data.username + "</strong>" + data.message);
      else
        connect_feedback.append("<p class='connect'><strong>" + data.username + "</strong>" + data.message + "</p>");
  
      clearTimeout(connectTimeout);
      connectTimeout = setTimeout(timeoutConnect, 2000);
    })
  }

  leave_room() {
    leave_room.click(() => {
      socket.emit('leave_room', { room: current_room });
      current_room = null;
      showModal("rooms");
    })
  }

  leave_message() {
    socket.on('leave_message', (data) => {
      message.attr("disabled", true);
      message.attr("placeholder", "You are currently not connected to a room.");
      send_message.attr("disabled", true);
      if (connect_feedback.find("p.disconnect").length)
        $(".disconnect").html("<strong>" + data.username + "</strong>" + data.message);
      else
        connect_feedback.append("<p class='disconnect'><strong>" + data.username + "</strong>" + data.message + "</p>");
  
      clearTimeout(disconnectTimeout);
      disconnectTimeout = setTimeout(timeoutDisconnect, 2000);
    })
  }
}

export { SocketIO };