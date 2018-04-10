import React, { Component } from 'react';
import styled from 'styled-components';

// Redux
import { connect } from 'react-redux';
import { logIn } from '../../store/actions/userActions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    signingIn: false,
    signedIn: false
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.logIn(this.state.email, this.state.password);
  };

  render() {
    return (
      <div>
        <Title>Login Component</Title>
        <form onSubmit={this.submitHandler}>
          <Label htmlFor="email">EMAIL</Label>
          <Input
            name="email"
            value={this.state.email}
            onChange={this.inputChangeHandler}
          />
          <Label htmlFor="password">PASSWORD</Label>
          <Input
            name="password"
            value={this.state.password}
            onChange={this.inputChangeHandler}
            type="password"
          />
          <button>log in</button>
        </form>
      </div>
    );
  }
}
const Title = styled.h1`
  font-size: 1.5em;
  color: purple;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: maroon;
  background: papayawhip;
  border: none;
  border-radius: none;
`;

const Label = styled.label`
  font-size: 1em;
`;

const mapStateToProps = state => {
  return {
    signingIn: state.userReducer.signingIn,
    signedIn: state.userReducer.signedIn
  };
};

export default connect(mapStateToProps, { logIn })(Login);
