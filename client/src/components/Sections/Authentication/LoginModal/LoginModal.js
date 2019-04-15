/*
ArtXperience Component
LoginModal
*/
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'Layout';
import './LoginModal.css';

class LoginModal extends Component {
  constructor(props) {
    super(props);
  }

  state = { 
    auth: this.props.auth ? this.props.auth : null,
    username: ""
  }

  componentDidMount() { }

  static getDerivedStateFromProps(nextProps, prevState) {
    let state = { };
    if (prevState) {
      for (let key in nextProps) {
        if (prevState.hasOwnProperty(key)) {
          if (nextProps[key] !== prevState[key])
            state[key] = nextProps[key];
        }
      }
    }
    
    return state;
  }

  handleSignIn = (e) => {
    e.preventDefault();
    const { auth, username } = this.state;
    let password = e.target.password.value;
    auth.login(username, password);
  }

  render() {
    const { id, className, children, style, show, toggle } = this.props;
    const { username } = this.state;
    return (
      <Modal id={"login-modal"} show={show} toggle={toggle}>
        <form method="POST" onSubmit={this.handleSignIn}>
          <ModalHeader>
            <h2>Sign in to ArtXperience</h2>
          </ModalHeader>
          
          <ModalBody className="d-flex">
            <FormGroup id="username-input">
              <label>Username or Email Address</label>
              <input id="username" name="username" type="text" value={username} onChange={(e) => { this.setState({ username: e.target.value }) }}/>
            </FormGroup>
            <FormGroup id="password-input">
              <label>Password</label>
              <input id="password" name="password" type="password"/>
              {/*<ForgotPassword/>*/}
            </FormGroup>
          </ModalBody>
          
          <ModalFooter>
            <button className="sign-in" type="submit">Sign In</button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export { LoginModal };