import React, { Component } from 'react';
import 'assets/css/App.css';
import 'assets/css/Animations.css';
import 'assets/css/General.css';
import 'assets/css/Users.css';
import { Switch, Route } from 'react-router-dom';
import history from 'History';

import { ContentBody, ContentArea, ContentBlock, NavBar, NavSection, NavLink } from 'Layout';
import { Chat, NotFound, Admin } from 'Pages';
import { LoginButton, ChangeUsername } from 'Sections';

import { withStyles } from '@material-ui/core/styles';
import { KeyboardBackspace, List, Settings, PersonPin } from '@material-ui/icons';

import { socket } from 'services/socket-io';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = socket;
  }

  state = {
    user_data: null,
    username: "",
    location: history.location.pathname,
    showChangeUsername: history.location.pathname.includes("/admin") ? false : true,
    showRoomList: true,
  }

  componentDidMount() { 
    this.socket.on("connected", (data) => {
      this.setState({ username: data.username }, () => {
        console.log(`Username was set to ${this.state.username}!`);
      })
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (history.location.pathname !== prevState.location.pathname) {
      if (history.location.pathname.includes("/admin")) {
        this.setState({ location: history.location, showChangeUsername: false })
      } else {
        this.setState({ location: history.location, showChangeUsername: true })
      }
    }
  }

  setUsername = (data, cb) => {
    cb();
    this.setState(data, () => {
      this.forceStateUpdate();
    });
  }

  forceStateUpdate = () => {
    this.setState(this.state);
  }

  setLoginState = (data, cb) => {
    cb();
    this.setState(data, () => {
      this.forceStateUpdate();
    });
  }

  toggleRoomList = () => {
    const { showRoomList } = this.state;
		this.setState({ showRoomList: !showRoomList }, () => {
			console.log('Rooms List Toggle');
		});
  }

  render() {
    const { username, showChangeUsername, showRoomList, user_data } = this.state;

    return (
      <div className="App">
        <ContentBody>
          <NavBar>
            <NavSection align="left">
              {showChangeUsername ? 
                  <ChangeUsername setUsername={this.setUsername} username={username} />
                : <NavLink Url="/" onClick={this.forceStateUpdate}>
                    <span className="d-flex" style={{ alignItems: "center", alignContent: "center" }}>
                      <KeyboardBackspace/><span className="d-inline-block" style={{ marginLeft: "5px" }}>Return to Chat</span>
                    </span>
                  </NavLink> 
              }
            </NavSection>
            <NavSection align="right">
              {!history.location.pathname.startsWith("/admin") &&
                <React.Fragment>
                  <NavLink onClick={this.toggleRoomList}>
                    <span className="d-flex" style={{ alignItems: "center", alignContent: "center" }}>
                      <List/><span className="d-inline-block" style={{ marginLeft: "5px" }}>Room List</span>
                    </span>
                  </NavLink>
                  {user_data && 
                    <NavLink Url="/admin" onClick={this.forceStateUpdate}>
                      <span className="d-flex" style={{ alignItems: "center", alignContent: "center" }}>
                        <Settings/><span className="d-inline-block" style={{ marginLeft: "5px" }}>Admin Panel</span>
                      </span>
                    </NavLink>
                  }
                </React.Fragment>
              }
              <LoginButton Header="Administrative Access" user_data={user_data} setLoginState={this.setLoginState} location={history.location} label={
                <React.Fragment>
                  <span className="d-flex" style={{ alignItems: "center", alignContent: "center" }}>
                    <PersonPin /><span className="d-inline-block" style={{ marginLeft: "5px" }}>Administrator Login</span>
                  </span>
                </React.Fragment>
              }/>
            </NavSection>
          </NavBar>

          <Switch>
            <Route exact path="/" render={(props) => <Chat {...props} toggleRoomList={this.toggleRoomList} showRoomList={showRoomList} username={username}/>}/>
            <Route path="/room/:roomId" render={(props) => <Chat {...props} toggleRoomList={this.toggleRoomList} showRoomList={showRoomList} username={username}/>}/>
            {user_data && <Route path="/admin" render={(props) => <Admin {...props}/>}/>}
            <Route path="*" component={NotFound}/>
          </Switch>
        </ContentBody>
      </div>
    );
  }
}

export default App;