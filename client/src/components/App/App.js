import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Components
import Signup from '../SignUp/SignUp';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Test from '../test';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';

import { connect } from 'react-redux';
import { logIn } from '../../store/actions/userActions';

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
              <Route path="/profile" component={Profile} />
              <Route path="/test" component={Test} />
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signedIn: state.userReducer.signedIn
  };
};

export default connect(mapStateToProps, { logIn })(App);
