import React, { Component } from 'react';
import { Flexrow, Flexcolumn } from '../style/layout';
import styled from 'styled-components';

class Test extends Component {
  render() {
    return (
      <div>
        <Flexrow>
          <Flexcolumn size={12}>
            <h1>12</h1>
          </Flexcolumn>
        </Flexrow>
        <Flexrow>
          <Flexcolumn size={3}>
            <h1>3</h1>
          </Flexcolumn>
          <Flexcolumn size={6}>
            <h1>6</h1>
          </Flexcolumn>
          <Flexcolumn size={3}>
            <h1>3</h1>
          </Flexcolumn>
        </Flexrow>
        <Flexrow>
          <Flexcolumn size={8}>
            <h1>8</h1>
          </Flexcolumn>
          <Flexcolumn size={4}>
            <h1>4</h1>
          </Flexcolumn>
        </Flexrow>
        <Flexrow>
          <Flexcolumn size={3}>
            <h1>3</h1>
          </Flexcolumn>
          <Flexcolumn size={9}>
            <h1>9</h1>
          </Flexcolumn>
        </Flexrow>
        <Flexrow>
          <Brand size={3}>All Good</Brand>
          <Flexcolumn size={3} />
          <Flexcolumn size={2} />
          <NavItem size={2}>Profile</NavItem>
          <NavItem size={2}>Login</NavItem>
        </Flexrow>
      </div>
    );
  }
}

const Brand = styled(Flexcolumn)`
  font-size: 1.5em;
  color: grey;
`;

const NavItem = styled(Flexcolumn)`
  color: grey;
  cursor: pointer;
`;

export default Test;
