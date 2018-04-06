import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    emailDup: false
  };

  submitHandler = event => {
    event.preventDefault();
    axios
      .post('http://localhost:8080/users/signup', this.state)
      .then(success => {
        setTimeout(() => {
          this.props.history.push('/login');
        }, 750);
      })
      .catch(err => {
        const errorCode = err.response.data.err.code;
        console.log({ err: err.response.data.err.code });
        if (errorCode === 11000) {
          this.setState({
            emailDup: true
          });
        }
      });
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  render() {
    return (
      <div>
        <h3>SignUp component</h3>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="FirstName">First Name: </label>
          <input
            onChange={this.inputChangeHandler}
            name="name"
            value={this.state.name}
          />
          <label htmlFor="email">Email: </label>
          <input
            onChange={this.inputChangeHandler}
            name="email"
            value={this.state.email}
          />
          <label htmlFor="FirstName">Password: </label>
          <input
            onChange={this.inputChangeHandler}
            name="password"
            value={this.state.password}
          />
          <button>submit</button>
        </form>
        {this.state.emailDup ? (
          <div>Account with email {this.state.email} already exists. </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Signup);
