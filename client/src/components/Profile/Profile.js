import './Profile.css';
import React, { Component } from 'react';
import { Flexrow, Flexcolumn } from '../../style/layout';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import profilePic from '../../assets/icons8-user-50.png';

import { connect } from 'react-redux';
import { updateUser } from '../../store/actions/userActions';
import { getAllergies } from '../../store/actions/allergyActions';

class Profile extends Component {
  state = {
    allergies: [],
    contacts: [{ name: 'Mom' }, { name: 'Dad' }],
    doctor: [
      { name: 'DR. Doctorman', phone: '555-555-5555', type: 'Pediatrician' },
      { name: 'Allergist', phone: '5587464734934', type: 'Allergist' }
    ],
    editing: false,
    profile: {
      dob: '',
      name: ''
    }
  };

  componentDidMount() {
    if (!this.props.signedIn) {
      this.props.history.push('/login');
    }
    this.setState({
      ...this.state,
      profile: {
        name: this.props.name,
        dob: this.props.dob
      }
    });
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.signedIn) {
      this.props.history.push('/');
    }
  }

  inputChangeHandler = ({ target }) => {
    this.setState({
      profile: {
        ...this.state.profile,
        [target.name]: target.value
      }
    });
  };

  updateProfileInfo = () => {
    this.props.updateUser(this.state.profile);
    this.setState({
      editing: false
    });
  };

  editProfileHandler = () => {
    this.setState({
      editing: true
    });
  };

  render() {
    return (
      <div>
        {this.state.editing ? (
          <ProfTop>
            <Flexcolumn size={3}>
              {this.props.pictureUrl ? (
                <Img src={this.props.pictureUrl} />
              ) : (
                <Img src={profilePic} />
              )}
            </Flexcolumn>
            <Flexcolumn size={6} />
            <Flexcolumn size={3}>
              {this.props.name ? (
                <input
                  onChange={this.inputChangeHandler}
                  name="name"
                  value={this.state.profile.name}
                  // placeholder={this.props.name}
                />
              ) : (
                <input
                  onChange={this.inputChangeHandler}
                  name="name"
                  value={this.state.profile.name}
                  placeholder="Add your name"
                />
              )}
              {this.props.dob ? (
                <input
                  onChange={this.inputChangeHandler}
                  name="dob"
                  value={this.state.profile.dob}
                  placeholder={this.props.dob}
                />
              ) : (
                <input
                  onChange={this.inputChangeHandler}
                  name="dob"
                  value={this.state.profile.dob}
                  placeholder="MM/DD/YYYY"
                />
              )}
              <button onClick={() => this.updateProfileInfo()}>Submit</button>
            </Flexcolumn>
          </ProfTop>
        ) : (
          <ProfTop>
            <Flexcolumn size={3}>
              {this.props.pictureUrl ? (
                <Img src={this.props.pictureUrl} />
              ) : (
                <Img src={profilePic} />
              )}
            </Flexcolumn>
            <Flexcolumn size={6} />
            <Flexcolumn size={3}>
              {this.props.name ? (
                <Title>{this.props.name}</Title>
              ) : (
                <Title>Add a Name</Title>
              )}
              {this.props.dob ? (
                <Title>{this.props.dob}</Title>
              ) : (
                <Title>Add a date of birth</Title>
              )}
              <button onClick={() => this.editProfileHandler()}>
                edit profile
              </button>
            </Flexcolumn>
          </ProfTop>
        )}
        <LabelRow>
          <Label size={6}>Allergies</Label>
          <Flexcolumn size={4} />
          <LabelButton size={2}>
            <Link to="/allergy/new">
              <button>+</button>
            </Link>
          </LabelButton>
        </LabelRow>
        {this.props.signedIn ? (
          this.props.allergies.map((allergy, i) => {
            let className = null;
            if (allergy.severity === 1) {
              className = 'severe';
            } else if (allergy.severity === 2) {
              className = 'moderate';
            } else if (allergy.severity === 3) {
              className = 'avoid';
            } else {
              className = 'clear';
            }
            return (
              <AllergyRow key={i} className={className}>
                <AllergyName size={8}>
                  <h5>{allergy.name}</h5>
                </AllergyName>
                <Flexcolumn size={2} />
                <AllergyArrow size={2}>></AllergyArrow>
              </AllergyRow>
            );
          })
        ) : (
          <h1>Loading...</h1>
        )}
        <LabelRow>
          <Label size={6}>Emergency Contacts</Label>
          <Flexcolumn size={4} />
          <LabelButton size={2}>
            <Link to="/contact/new">
              <button>+</button>
            </Link>
          </LabelButton>
        </LabelRow>
        {this.props.contacts.map(contact => {
          return (
            <ContactRow key={contact._id}>
              <AllergyName size={8}>
                <h5>{contact.name}</h5>
              </AllergyName>
              <Flexcolumn size={2} />
              <AllergyArrow size={2}>></AllergyArrow>
            </ContactRow>
          );
        })}
        <LabelRow>
          <Label size={6}>Primary Care Doctor</Label>
          <Flexcolumn size={4} />
          <LabelButton size={2}>
            <Link to="/doctor/new">
              <button>+</button>
            </Link>
          </LabelButton>
        </LabelRow>
        <div>
          {this.props.doctors.map(doc => {
            return (
              <ContactRow key={doc._id}>
                <ContactName size={8}>
                  <h5>{doc.name}</h5>
                  <h5>{doc.phone}</h5>
                  <h5>{doc.specialty}</h5>
                </ContactName>
                <Flexcolumn size={2} />
                <AllergyArrow size={2}>></AllergyArrow>
              </ContactRow>
            );
          })}
        </div>
      </div>
    );
  }
}

const Title = styled.h2`
  display: flex;
  justify-content: center;
`;

const AllergyRow = styled(Flexrow)`
  margin-left: 10vw;
  margin-right: 10vw;
  margin-top: 0.1%;
  align-items: center;
  color: rgb(255, 244, 223);
`;

const ContactRow = styled(Flexrow)`
  margin-left: 10vw;
  margin-right: 10vw;
  margin-top: 0.1%;
  align-items: center;
  background-color: lightgrey;
`;

const ContactName = styled(Flexcolumn)`
  display: flex;
  justify-content: space-between;
`;

const AllergyName = styled(Flexcolumn)`
  display: flex;
  justify-content: flex-start;
`;

const AllergyArrow = styled(Flexcolumn)`
  display: flex;
  justify-content: flex-end;
`;

const Label = styled(Flexcolumn)`
  font-size: 2em;
  display: flex;
  justify-content: flex-start;
`;

const LabelButton = styled(Flexcolumn)`
  display: flex;
  justify-content: flex-end;
`;

const LabelRow = styled(Flexrow)`
  display: flex;
  margin-left: 10vw;
  margin-right: 10vw;
  color: grey;
`;

const ProfTop = styled(Flexrow)`
  display: flex;
  justify-content: space-between;
  margin-right: 10vw;
  margin-left: 10vw;
`;

const Img = styled.img`
  border-radius: 50%;
`;

const mapStateToProps = state => {
  return {
    name: state.userReducer.name,
    pictureUrl: state.userReducer.pictureUrl,
    signedIn: state.userReducer.signedIn,
    dob: state.userReducer.dob,
    allergies: state.userReducer.allergies,
    contacts: state.userReducer.contacts,
    doctors: state.userReducer.doctors
  };
};

export default connect(mapStateToProps, { updateUser, getAllergies })(Profile);
