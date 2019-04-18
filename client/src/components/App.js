import React, { Component } from 'react';
import 'assets/css/App.css';
import 'assets/css/Animations.css';
import 'assets/css/General.css';
import 'assets/css/Users.css';
import { Switch, Route } from 'react-router-dom';
import history from 'History';

import { ContentBody, ContentArea, ContentBlock, NavBar, NavSection, NavLink } from 'Layout';
import { Home, NotFound, Admin } from 'Pages';
import { LoginButton, ChangeUsername } from 'Sections';
import { socket } from 'services/socket-io';

class App extends Component {
  state = {
    username: "",
    location: history.location.pathname,
    showChangeUsername: history.location.pathname.includes("/admin") ? false : true
  }

  componentDidMount() { 
    socket.on("connected", (data) => {
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
    this.setState(data, cb)
  }

  forceStateUpdate = () => {
    this.setState(this.state);
  }

  render() {
    const { username, showChangeUsername } = this.state;
    console.log(`location: ${history.location.pathname}`);
    return (
      <div className="App">
        <ContentBody>
          <NavBar>
            <NavSection align="left">
              {showChangeUsername ? 
                  <ChangeUsername setUsername={this.setUsername} username={username} />
                : <NavLink Url="/" onClick={this.forceStateUpdate} PageName="Return to Chat"/> 
              }
            </NavSection>
            <NavSection align="right">
              <LoginButton Header="Administrative Access" label="Administrator Login"/>
            </NavSection>
          </NavBar>

          <Switch>
            <Route exact path="/" render={(props) => <Home {...props}/>}/>
            <Route path="/room/:roomId" render={(props) => <Home {...props}/>}/>
            <Route path="/admin" render={(props) => <Admin {...props}/>}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        </ContentBody>
      </div>
    );
  }
}

export default App;