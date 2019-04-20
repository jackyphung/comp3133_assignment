/*
ArtXperience Component
LoginButton
*/
import React, { Component } from 'react';
import { NavLink } from 'Layout';
import { LoginModal } from 'Sections';
import history from 'History';
import './LoginButton.css';

import { ExitToAppSharp } from '@material-ui/icons';

class LoginButton extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    linkLabel: this.props.label ? this.props.label : "Sign In",
    showModal: false,
    user_data: this.props.user_data
  }

  componentDidUpdate(prevProps) {
    if (this.props.user_data !== prevProps.user_data) {
      this.setState({ user_data: this.props.user_data });
    }
  }

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal }, () => {
      console.log("Login Modal Toggle")
    });
  }

  render() { 
    const { auth, label, Header, setLoginState } = this.props;
    const { showModal, user_data } = this.state;

    let LinkLabel = user_data ? 
      <span className="d-flex" style={{ alignItems: "center", alignContent: "center" }}>
        <ExitToAppSharp />
        <span className="d-inline-block" style={{ marginLeft: "5px" }}>Log Out</span>
      </span>
      : label ? label : "Sign In";

    return (  
      <React.Fragment>
        { user_data ? 
             <NavLink onClick={(e) => { setLoginState({ user_data: null }, () => history.replace('')) } }>
                {LinkLabel}
             </NavLink>
          :  <NavLink PageName={LinkLabel} onClick={this.toggleModal}/>
        }
        { user_data == null && 
          <LoginModal Header={Header} auth={auth} show={showModal} toggle={this.toggleModal} setLoginState={setLoginState}/>
        }
      </React.Fragment>
    );
  }
}
 
export { LoginButton };