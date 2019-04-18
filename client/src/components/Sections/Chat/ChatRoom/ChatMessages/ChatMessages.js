import React, { Component } from 'react';
import './ChatMessages.css';

class ChatMessages extends Component {
  constructor(props) {
    super(props);
  }

  state = {

  }

  render() {
    const { messages } = this.props;
    return (
      <React.Fragment>
        {messages.map(message => (
          <React.Fragment>
            <div className="message-user"><strong>{message.username}</strong>:</div>
            <div className="message">{message.message}</div>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

export { ChatMessages };