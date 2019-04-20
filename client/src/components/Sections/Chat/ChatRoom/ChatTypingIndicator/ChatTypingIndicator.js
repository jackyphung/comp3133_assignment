import React, { Component } from 'react';
import './ChatTypingIndicator.css';

import { socket } from 'services/socket-io';

class ChatTypingIndicator extends Component {
  constructor(props) {
    super(props);

    this.socket = socket;
  }

  state = {
    usersTyping: []
  }

  componentDidMount() {
    this.socket.on('typing', (data) => {
      let currentUsersTyping = this.state.usersTyping;
      if (data.typing) {
        if(!currentUsersTyping.includes(data.username)) {
          currentUsersTyping.push(data.username);
          this.setState({ usersTyping: currentUsersTyping });
        }
      } else {
        currentUsersTyping = currentUsersTyping.filter(user => user !== data.username);
        this.setState({ usersTyping: currentUsersTyping })
      }
    });
  }

  render() {
    const { usersTyping } = this.state; 
    return (  
      <section className="typing-indicator">
        { usersTyping.length > 0 &&
          <p><em><strong>{usersTyping.length > 4 ? "Several people" : usersTyping.join(", ")}</strong> {usersTyping.length > 1 ? "are" : "is"} typing a message...</em></p>
        }
      </section>
    );
  }
}

export { ChatTypingIndicator };