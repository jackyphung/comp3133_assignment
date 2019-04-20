import React, { Component } from 'react';
import './ChatMessages.css';

import { Tooltip } from '@material-ui/core';

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
            <Tooltip title={message.username} placement="right">
              <div className="message-user">
                <strong>{message.username}</strong> :
              </div>
            </Tooltip>
            <div className="message">{message.message}</div>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

export { ChatMessages };