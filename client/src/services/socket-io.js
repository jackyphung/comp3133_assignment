import openSocket from 'socket.io-client';
import { clearTimeout } from 'timers';
export const socket = openSocket(`${location.protocol}//${location.hostname}:${location.port}/`);

class SocketIO {
  current_room = ""

  timeoutTyping() {
    socket.emit("typing", {typing: false, room: this.current_room})
  }

  sendMessage(msg) {
    socket.emit('new_message', {message: msg, room: this.current_room});
  }

  sendUsername() {
      socket.emit('change_username', { username: username.val() });
  }

  keypress() {
      socket.emit('typing', { typing: true, room: this.current_room });
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(timeoutTyping, 2000);
  }

  join_room() {
        this.current_room = e.target.id;
        socket.emit('join_room', { room: this.current_room });
        chatroom.find('.message').remove();
  }

  leaveRoom() {
      socket.emit('leave_room', { room: this.change_room });
      this.current_room = null;
  }
}

export { SocketIO };