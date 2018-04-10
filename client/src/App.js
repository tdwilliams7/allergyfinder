import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Components
import Signup from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Test from './components/test';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/test" component={Test} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
