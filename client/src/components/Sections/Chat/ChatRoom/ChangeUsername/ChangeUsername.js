import React, { Component } from 'react';
import './ChangeUsername.css';

import { socket } from 'services/socket-io';

class ChangeUsername extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: this.props.username ? this.props.username : ""
  }

  changeUsername = (e) => {
    e.preventDefault();
    const { setUsername } = this.props;
    setUsername({ username: e.target["chat-username"].value }, () => {
      socket.emit('change_username', { username: e.target["chat-username"].value })
    })
  }

  render() {
    return (
      <form className="change-username d-flex" onSubmit={this.changeUsername}>
        <input className="username" name="chat-username" type="text" placeholder="Username"/>
        <button className="send-username" type="submit">Set Username</button>
      </form>
    );
  }
}

export { ChangeUsername };