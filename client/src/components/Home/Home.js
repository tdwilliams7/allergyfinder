import React, { Component } from 'react';
import { Flexrow, Flexcolumn } from '../../style/layout';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <Flexrow>
          <Flexcolumn size={8}>
            <MainText>
              Allergy Profiles with serverity, reactions, treatment, and contact
              info
            </MainText>
          </Flexcolumn>
          <Flexcolumn size={1} />
          <Flexcolumn size={3}>
            <Flexrow>
              <form>
                <Flexrow>
                  <Flexcolumn size={12}>
                    <label>Email</label>
                  </Flexcolumn>
                </Flexrow>
                <Flexrow>
                  <Flexcolumn size={12}>
                    <input />
                  </Flexcolumn>
                </Flexrow>
                <Flexrow>
                  <Flexcolumn size={12}>
                    <label>Password</label>
                  </Flexcolumn>
                </Flexrow>
                <Flexrow>
                  <Flexcolumn size={12}>
                    <input />
                  </Flexcolumn>
                </Flexrow>
                <Flexrow>
                  <Flexcolumn size={12}>
                    <button>Login</button>
                  </Flexcolumn>
                </Flexrow>
              </form>
              <p>
                Don't have an account? <Link to="/signup">sign up</Link>
              </p>
            </Flexrow>
          </Flexcolumn>
        </Flexrow>
      </div>
    );
  }
}

const MainText = styled.div`
  font-size: 2.5em;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

export default Home;
