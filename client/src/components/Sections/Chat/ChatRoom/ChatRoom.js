import React, { Component } from 'react';
import { ContentBlock } from 'Layout';
import { ChatMessages, ChatConnectionIndicator, ChatTypingIndicator } from 'Sections';
import './ChatRoom.css';

import { socket } from 'services/socket-io';

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.socket = socket;
    this.typingTimeout = null;
    this.chatRoomEnd = React.createRef();
  }

  state = {
    messages: [],
    newMessage: ''
  }

  componentDidMount() {
    this.scrollToBottom();
    this.socket.on('new_message', message => {
      let messages = this.state.messages;
      messages.push(message);
      this.setState({ messages: messages }, () => console.log(`${new Date().toISOString()} Message received!`));
    })
  }

  componentWillUnmount() {
    this.socket.close();
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
    if (this.props.room !== prevProps.room) {
      this.setState({ messages: [] });
    }
  }

  setNewMessage = (e) => {
    this.setState({ newMessage: e.target.value.trim() });
  }

  sendMessage = (e) => {
    e.preventDefault();
    if (this.state.newMessage.length) {
      this.socket.emit('new_message', {
        message: this.state.newMessage
      });
      console.log("Message sent!");

      e.target.message.value = '';
      this.setState({ newMessage: '' });
    }
  }

  triggerTyping = (e) => {
    const { room } = this.props;
    this.socket.emit('typing', { typing: true, room: room });
    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(this.timeoutTyping, 2000);
  }

  timeoutTyping = () => {
    const { room } = this.props;
    this.socket.emit("typing", { typing: false, room: room });
  }

  scrollToBottom = () => {
    this.chatRoomEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const { room } = this.props;
    const { messages, newMessage } = this.state;
    return (
      <React.Fragment>
        <ContentBlock ref={this.chatRoom} className="chatroom d-flex">
          <ChatTypingIndicator />
          <ChatConnectionIndicator room={room} />
          <ChatMessages messages={messages}/>
          <div ref={(el) => { this.chatRoomEnd = el; }}/>
        </ContentBlock>
        <ContentBlock className="chat-input">
          <form className="d-flex w-10" onSubmit={this.sendMessage}>
            <input className="message-input" name="message" type="text" 
              onChange={this.setNewMessage} onKeyPress={this.triggerTyping} autoComplete="off"
              placeholder={room ? "Send a message." : null}
              value={room ? newMessage : "You are currently not in a room to send a message."}
              disabled={room ? false : true} />
            <button className="send-message" type="submit" disabled={room ? false : true}>Send</button>
          </form>
        </ContentBlock>
      </React.Fragment>
    );
  }
}

export { ChatRoom };