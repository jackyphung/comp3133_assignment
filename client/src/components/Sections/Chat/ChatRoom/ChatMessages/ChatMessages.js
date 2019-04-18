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
          <p className="message"><strong>{message.username}</strong>: {message.message}</p>
        ))}
      </React.Fragment>
    );
  }
}

export { ChatMessages };