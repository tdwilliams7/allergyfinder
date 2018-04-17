import React, { Component } from 'react';
import { Flexrow, Flexcolumn } from '../../style/layout';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { logIn } from '../../store/actions/userActions';

class Home extends Component {
  state = {
    email: '',
    password: ''
  };

  componentDidMount() {
    if (!this.props.signedIn) {
      this.props.logIn();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.signedIn) {
      this.props.history.push('/profile');
    }
  }

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  logInHandler = () => {
    this.props.logIn(this.state);
  };

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
              <form onSubmit={() => this.logInHandler()}>
                <Flexrow>
                  <Flexcolumn size={12}>
                    <label>Email</label>
                  </Flexcolumn>
                </Flexrow>
                <Flexrow>
                  <Flexcolumn size={12}>
                    <input
                      name="email"
                      value={this.state.email}
                      onChange={this.inputChangeHandler}
                    />
                  </Flexcolumn>
                </Flexrow>
                <Flexrow>
                  <Flexcolumn size={12}>
                    <label>Password</label>
                  </Flexcolumn>
                </Flexrow>
                <Flexrow>
                  <Flexcolumn size={12}>
                    <input
                      name="password"
                      value={this.state.password}
                      onChange={this.inputChangeHandler}
                    />
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
const mapStateToProps = state => {
  return {
    signedIn: state.userReducer.signedIn
  };
};

export default withRouter(connect(mapStateToProps, { logIn })(Home));
