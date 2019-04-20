import React, { Component } from 'react';
import { ContentBlock } from 'Layout';
import './ChatHeader.css';

class ChatHeader extends Component {
  constructor(props) {
    super(props);
  }

  state = {

  }

  render() {
    return (
      <ContentBlock className="chat-header">
        <section className="options">
          <div className="right">
            <button className="leave-room" type="button">Leave Room</button>
          </div>
        </section>
        <h1>Super Chat</h1>
      </ContentBlock>
    )
  }
}

export { ChatHeader };