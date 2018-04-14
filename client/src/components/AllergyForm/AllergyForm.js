import React, { Component } from 'react';
import styled from 'styled-components';

class AllergyForm extends Component {
  render() {
    return (
      <div>
        <h1>AllergyForm</h1>
        <h1>Name</h1>
        <select>
          <option value="food or medicine">food or medicine</option>
        </select>
        <h1>Severity</h1>
        <Select>
          <option value="1">1 low</option>
          <option value="2">2 mild</option>
          <option value="3">3 high</option>
        </Select>
        <h1>Reaction</h1>
        <Select>
          <option value="food or medicine">
            find a list of common reactions
          </option>
          <option value="3">3 high</option>
        </Select>
        <h1>Treatment</h1>
        <TextArea />
        <h1>Comments</h1>
        <TextArea placeholder="Add comments about reactions and treatment here" />
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

export default AllergyForm;
