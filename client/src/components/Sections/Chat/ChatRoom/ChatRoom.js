import React, { Component } from 'react';
import { ContentBlock } from 'Layout';
import { ChatMessages, ChatConnectionIndicator, ChatTypingIndicator } from 'Sections';
import './ChatRoom.css';

import { socket } from 'services/socket-io';

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.socket = socket;
  }

  state = {
    messages: [],
    newMessage: ''
  }

  componentDidMount() {
    this.socket.on('new_message', message => {
      let messages = this.state.messages;
      messages.push(message);
      this.setState({ messages: messages }, () => console.log(`${new Date().toISOString()} Message received!`));
    })
  }

  componentWillUnmount() {
    this.socket.close();
  }

  setNewMessage = (e) => {
    this.setState({ newMessage: e.target.value });
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

  render() {
    const { messages } = this.state;
    return (
      <React.Fragment>
        <ContentBlock className="chatroom d-flex">
          <ChatTypingIndicator />
          <ChatConnectionIndicator />
          <ChatMessages messages={messages}/>
        </ContentBlock>
        <ContentBlock className="chat-input">
          <form className="d-flex w-10" onSubmit={this.sendMessage}>
            <input className="message-input" name="message" type="text" onChange={this.setNewMessage}/>
            <button className="send-message" type="submit">Send</button>
          </form>
        </ContentBlock>
      </React.Fragment>
    );
  }
}

export { ChatRoom };