import React, { Component } from 'react';
import './ChatConnectionIndicator.css';

import { socket } from 'services/socket-io';

class ChatConnectionIndicator extends Component {
  constructor(props) {
    super(props);

    this.socket = socket;
  }

  state = {

  }

  componentDidMount() {
    this.socket.on('', (data) => {
      // do something
    });
  }

  render() { 
    return (  
      <section className="connect-indicator">

      </section>
    );
  }
}

export { ChatConnectionIndicator };