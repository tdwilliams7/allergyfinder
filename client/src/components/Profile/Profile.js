import React, { Component } from 'react';
import { Flexrow, Flexcolumn } from '../../style/layout';
import styled from 'styled-components';

import './Profile.css';

class Profile extends Component {
  state = {
    allergies: [
      { name: 'Beef', severity: 1 },
      { name: 'Pork', severity: 2 },
      { name: 'Eggs', severity: 3 },
      { name: 'water', severity: 0 }
    ],
    contacts: [{ name: 'Mom' }, { name: 'Dad' }],
    doctor: [{ name: 'DR. Doctorman', phone: '555-555-5555' }]
  };
  render() {
    return (
      <div>
        <Flexrow>
          <Flexcolumn size={12}>
            <Title>Welcome Troy</Title>
          </Flexcolumn>
        </Flexrow>
        <LabelRow>
          <Label size={6}>Allergies</Label>
          <Flexcolumn size={4} />
          <LabelButton size={2}>
            <button>+</button>
          </LabelButton>
        </LabelRow>
        {this.state.allergies.map(allergy => {
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
            <AllergyRow key={allergy.severity} className={className}>
              <AllergyName size={8}>
                <h5>
                  {allergy.name} {allergy.severity}
                </h5>
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
        {this.state.contacts.map(contact => {
          return (
            <ContactRow>
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
        {this.state.doctor.map(doc => {
          return (
            <ContactRow key={99}>
              <AllergyName size={8}>
                <h5>{doc.name}</h5>
                <h5>{doc.phone}</h5>
              </AllergyName>
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
`;

const ContactRow = styled(Flexrow)`
  margin-left: 10vw;
  margin-right: 10vw;
  margin-top: 0.1%;
  align-items: center;
  background-color: lightgrey;
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

export default Profile;
