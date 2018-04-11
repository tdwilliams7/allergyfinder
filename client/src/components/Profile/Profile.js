import './Profile.css';
import React, { Component } from 'react';
import { Flexrow, Flexcolumn } from '../../style/layout';
import styled from 'styled-components';

import { connect } from 'react-redux';
import profilePic from '../../assets/icons8-user-50.png';

class Profile extends Component {
  state = {
    allergies: [
      { name: 'Beef', severity: 3 },
      { name: 'Pork', severity: 3 },
      { name: 'Eggs', severity: 1 },
      { name: 'water', severity: 5 },
      { name: 'Dairy', severity: 1 }
    ],
    contacts: [{ name: 'Mom' }, { name: 'Dad' }],
    doctor: [
      { name: 'DR. Doctorman', phone: '555-555-5555', type: 'Pediatrician' },
      { name: 'Allergist', phone: '5587464734934', type: 'Allergist' }
    ]
  };

  componentDidMount() {
    if (!this.props.signedIn) {
      this.props.history.push('/login');
    }
    this.sortAllergies();
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.signedIn) {
      this.props.history.push('/login');
    }
  }

  sortAllergies = () => {
    let allergies = this.state.allergies.slice(0);
    allergies = allergies.sort((a, b) => {
      return a.severity - b.severity;
    });
    this.setState({
      allergies
    });
  };
  render() {
    return (
      <div>
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
            <Title>03/20/1990</Title>
          </Flexcolumn>
        </ProfTop>
        <LabelRow>
          <Label size={6}>Allergies</Label>
          <Flexcolumn size={4} />
          <LabelButton size={2}>
            <button>+</button>
          </LabelButton>
        </LabelRow>
        {this.state.allergies.map((allergy, i) => {
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
        })}
        <LabelRow>
          <Label size={6}>Emergency Contacts</Label>
          <Flexcolumn size={4} />
          <LabelButton size={2}>
            <button>+</button>
          </LabelButton>
        </LabelRow>
        {this.state.contacts.map((contact, i) => {
          return (
            <ContactRow key={i}>
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
            <button>+</button>
          </LabelButton>
        </LabelRow>
        {this.state.doctor.map((doc, i) => {
          return (
            <ContactRow key={i}>
              <ContactName size={8}>
                <h5>{doc.name}</h5>
                <h5>{doc.phone}</h5>
                <h5>{doc.type}</h5>
              </ContactName>
              <Flexcolumn size={2} />
              <AllergyArrow size={2}>></AllergyArrow>
            </ContactRow>
          );
        })}
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
    signedIn: state.userReducer.signedIn
  };
};

export default connect(mapStateToProps, null)(Profile);
