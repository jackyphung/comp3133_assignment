import React, { Component } from 'react';
import history from 'History';
import { Home } from 'Pages';

class App extends Component {
  componentDidMount() { }
  
  render() {
    return (
      <div className="App">
        <h1>We have something!</h1>
        <Switch>
          <Route path="/" render={(props) => <Home {...props}/>}/>
          <Route path="/room/:roomId" render={(props) => <Home {...props}/>}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;