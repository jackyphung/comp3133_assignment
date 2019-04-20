import React, { Component } from 'react';
import { ContentBlock } from 'Layout';
import './ChatHeader.css';

import { Cancel } from '@material-ui/icons';

const ChatHeader = (props) => {
  const { room, toggleRoomList, leaveRoom } = props;

  return (
    <ContentBlock className="chat-header">
      <section className="options">
        <button className="leave-room" type="button" onClick={room ? leaveRoom : toggleRoomList}>
          { room ?
              <React.Fragment>
                <Cancel/><span className="d-inline-block" style={{ margin: "0 5px" }}>Leave #{room}</span>
              </React.Fragment>
            : <span className="d-inline-block">You are currently not in a room. Join a room to start chatting!~</span>
          }
        </button>
      </section>
      <h1>Super Chat</h1>
    </ContentBlock>
  )
}

// class ChatHeader extends Component {
//   constructor(props) {
//     super(props);
//   }

//   state = {

//   }

//   render() {
    
//   }
// }

export { ChatHeader };