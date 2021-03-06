import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { getAllergies } from '../../store/actions/allergyActions';
import { addAllergyToUser } from '../../store/actions/userActions';
import { getReactions } from '../../store/actions/reactionActions';

class AllergyForm extends Component {
  state = {
    name: 'Ants',
    severity: 1,
    reaction: '',
    treatment: '',
    comments: ''
  };

  componentDidMount() {
    if (!this.props.signedIn) {
      this.props.history.push('/login');
    }
    this.props.getAllergies();
    this.props.getReactions();
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.signedIn) {
      this.props.history.push('/');
    }
  }

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  addAllergyHandler = () => {
    this.props.addAllergyToUser(this.state);
    this.props.history.push('/profile');
  };

  render() {
    return (
      <div>
        <h1>Name</h1>
        <select name="name" required onChange={this.inputChangeHandler}>
          <option>Select name</option>
          {this.props.allergies.map((allergy, i) => {
            return (
              <option key={i} value={allergy.name}>
                {allergy.name}
              </option>
            );
          })}
        </select>
        <h1>Severity</h1>
        <Select name="severity" onChange={this.inputChangeHandler}>
          <option>Select Severity Level</option>
          <option value="1">1 high</option>
          <option value="2">2 mild</option>
          <option value="3">3 low</option>
        </Select>
        <h1>Reaction</h1>
        <Select name="reaction" onChange={this.inputChangeHandler}>
          <option>Select Main Reaction</option>
          {this.props.reactions.map(reaction => {
            return (
              <option key={reaction._id} value={reaction.name}>
                {reaction.name}
              </option>
            );
          })}
        </Select>
        <h1>Treatment</h1>
        <TextArea
          name="treatment"
          onChange={this.inputChangeHandler}
          placeholder="EpiPen, Benadryl, Emergency care..."
        />
        <h1>Comments</h1>
        <TextArea
          name="comments"
          onChange={this.inputChangeHandler}
          placeholder="Add comments about reactions and treatment here"
        />
        <button onClick={() => this.addAllergyHandler()}>submit</button>
      </div>
    );
  }
}

const Select = styled.select`
  min-width: 15vw;
  text-align-last: center;
`;

const TextArea = styled.textarea`
  width: 80vw;
  min-height: 100px;
`;

const mapStateToProps = state => {
  return {
    allergies: state.allergyReducer.allergies,
    reactions: state.reactionReducer.reactions,
    signedIn: state.userReducer.signedIn
  };
};

export default withRouter(
  connect(mapStateToProps, { getAllergies, addAllergyToUser, getReactions })(
    AllergyForm
  )
);
