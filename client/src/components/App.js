import React, { Component } from 'react';
import 'assets/css/App.css';
import 'assets/css/Animations.css';
import 'assets/css/General.css';
import 'assets/css/Users.css';
import { Switch, Route } from 'react-router-dom';
import { ContentBody, ContentArea, ContentBlock, NavBar, NavSection, NavLink } from 'Layout';
import { LoginButton } from 'Sections';
import { Home, NotFound, Admin } from 'Pages';

class App extends Component {
  componentDidMount() { }

  render() {
    return (
      <div className="App">
        <ContentBody>
          <NavBar>
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