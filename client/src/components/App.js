import React, { Component } from 'react';
import 'assets/css/App.css';
import 'assets/css/Animations.css';
import 'assets/css/General.css';
import 'assets/css/Users.css';
import { Switch, Route } from 'react-router-dom';
import { ContentBody, ContentArea, ContentBlock } from 'Layout';
import { Home, NotFound, Admin } from 'Pages';

class App extends Component {
  componentDidMount() { }
  
  render() {
    return (
      <div className="App">
        <ContentBody>
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props}/>}/>
            <Route path="/room/:roomId" render={(props) => <Home {...props}/>}/>
            <Route path="/admin" render={(props) => <Admin {...props}/>}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        </ContentBody>
        {/* <div id="rooms" className="modal show">
					<div className="modal-content">
						<div className="modal-header">
							Super Chat Room List
							<h6>Please select a room:</h6>
						</div>
						<div className="modal-body">
								<div id="main-room" className="join-room" type="button">main-room</div>
								<div id="alt-room" className="join-room" type="button">alt-room</div>
						</div>
					</div>
				</div> */}
      </div>
    );
  }
}

export default App;