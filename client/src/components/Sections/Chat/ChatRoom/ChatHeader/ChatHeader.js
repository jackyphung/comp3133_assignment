import React, { Component } from 'react';
import { ContentBlock } from 'Layout';
import './ChatHeader.css';

import { Cancel } from '@material-ui/icons';

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
            <button className="leave-room" type="button">
              <Cancel/>
              <span className="d-inline-block" style={{ margin: "0 5px" }}>Leave Room</span>
            </button>
          </div>
        </section>
        <h1>Super Chat</h1>
      </ContentBlock>
    )
  }
}

export { ChatHeader };