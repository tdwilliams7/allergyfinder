import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Redux stuff
import { connect } from 'react-redux';
import { newUser } from '../../store/actions/userActions';

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    emailDup: false,
    userCreated: false
  };

  componentWillReceiveProps(newProps) {
    if (newProps.userCreated) {
      this.props.history.push('/login');
    }
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.newUser(this.state.name, this.state.email, this.state.password);
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
        {this.props.emailDup ? (
          <div>Account with email {this.state.email} already exists. </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    emailDup: state.userReducer.dupUser,
    userCreated: state.userReducer.userCreated
  };
};

export default withRouter(connect(mapStateToProps, { newUser })(Signup));
