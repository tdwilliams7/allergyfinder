import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { addContactToUser } from '../../store/actions/userActions';

class ContactForm extends Component {
  state = {
    name: '',
    phone: '',
    email: '',
    relation: '',
    comments: ''
  };

  componentDidMount() {
    if (!this.props.signedIn) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.signedIn) {
      this.props.history.push('/login');
    }
  }

  addUser = () => {
    this.props.addContactToUser(this.state);
    this.setState({
      name: '',
      phone: '',
      email: '',
      relation: '',
      comments: ''
    });
    this.props.history.push('/profile');
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  render() {
    return (
      <div>
        <h1>Doctor Form</h1>
        <h1>Name</h1>
        <input
          required
          name="name"
          value={this.state.name}
          onChange={this.inputChangeHandler}
        />
        <h1>Phone Number</h1>
        <input
          required
          name="phone"
          value={this.state.phone}
          onChange={this.inputChangeHandler}
        />
        <h1>email</h1>
        <input
          required
          name="email"
          value={this.state.email}
          onChange={this.inputChangeHandler}
        />
        <h1>Relation</h1>
        <input
          name="relation"
          value={this.state.relation}
          onChange={this.inputChangeHandler}
        />
        <h1>Comments</h1>
        <textarea
          name="comments"
          value={this.state.comments}
          onChange={this.inputChangeHandler}
        />
        <div>
          <button onClick={() => this.addUser()}>submit</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signedIn: state.userReducer.signedIn
  };
};

export default withRouter(
  connect(mapStateToProps, { addContactToUser })(ContactForm)
);
