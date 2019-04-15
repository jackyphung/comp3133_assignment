import React, { Component } from 'react';
import { Home, NotFound } from 'Pages';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  componentDidMount() { }
  
  render() {
    return (
      <div className="App">
        <h1>We have something!</h1>
        <Switch>
          <Route path="/" render={(props) => <Home {...props}/>}/>
          <Route path="/room/:roomId" render={(props) => <Home {...props}/>}/>
          <Route path="/admin" component={NotFound}/> {/* Placeholder for Administrators... if we get to it */}
          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;