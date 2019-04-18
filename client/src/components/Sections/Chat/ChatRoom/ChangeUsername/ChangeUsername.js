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
      console.log(`Username was set to ${this.state.username}!`);
      socket.emit('change_username', { username: this.state.username })
    })
  }

  handleInput = (e) => {
    this.setState({ username: e.target.value.trim() });
  }

  render() {
    const { username } = this.state;
    return (
      <form className="change-username d-flex" onSubmit={this.changeUsername}>
        <input className="username" name="chat-username" type="text" placeholder="Username" value={username} onChange={this.handleInput}/>
        <button className="send-username" type="submit">Set Username</button>
      </form>
    );
  }
}

export { ChangeUsername };