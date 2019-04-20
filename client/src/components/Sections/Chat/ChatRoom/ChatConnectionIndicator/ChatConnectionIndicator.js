import React, { Component } from 'react';
import './ChatConnectionIndicator.css';

import { socket } from 'services/socket-io';

class ChatConnectionIndicator extends Component {
  constructor(props) {
    super(props);

    this.socket = socket;
    this.connectTimeout = null;
    this.disconnectTimeout = null;
  }

  state = {
    connections: [],
    disconnections: []
  }

  componentDidMount() {
    this.socket.on('join_message', (data) => {
      let newConnections = this.state.connections;
      newConnections.push({ username: data.username, message: data.message });
      this.setState({ connections: newConnections })
  
      clearTimeout(this.connectTimeout);
      this.connectTimeout = setTimeout(this.timeoutConnect, 2000);
    })

    this.socket.on('disconnect_message', (data) => {
      this.handleDisconnect(data);
    });

    this.socket.on('leave_message', (data) => {
      this.handleDisconnect(data);
    })
  }

  handleDisconnect = (data) => {
    let newDisconnections = this.state.disconnections;
    newDisconnections.push({ username: data.username, message: data.message });
    this.setState({ disconnections: newDisconnections })

    clearTimeout(this.disconnectTimeout);
    this.disconnectTimeout = setTimeout(this.timeoutDisconnect, 2000);
  }

  timeoutConnect = () => {
    this.setState({ connections: [] });
  }

  timeoutDisconnect = () => {
    this.setState({ disconnections: [] });
  }

  render() { 
    const { connections, disconnections } = this.state;

    return (  
      <section className="connection-indicator">
        {connections.length > 0 &&
          connections.map(connection =>
            <p className='connect'><strong>{connection.username}</strong> {connection.message}</p>
          )
        }
        {disconnections.length > 0 &&
          disconnections.map(disconnection => 
            <p className='disconnect'><strong>{disconnection.username}</strong> {disconnection.message}</p>
          )
        }
      </section>
    );
  }
}

export { ChatConnectionIndicator };