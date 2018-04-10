import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { Container } from 'styled-container-component';
import { Button } from 'styled-button-component';
// import { Navbar, NavbarLink } from 'styled-navbar-component';
import { Nav } from 'styled-nav-component';
import styled from 'styled-components';
import { Flexrow, Flexcolumn } from '../../style/layout';

// redux
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
  }

  handleOpenCloseNav() {
    this.setState({
      hidden: !this.state.hidden
    });
  }

  render() {
    return (
      <Navbar>
        <Brand size={3}>
          <StyledLink to="/">All Good</StyledLink>
        </Brand>
        <Flexcolumn size={3} />
        <Flexcolumn size={2} />
        <NavItem size={2}>
          <StyledLink to="#">Profile</StyledLink>
        </NavItem>
        <NavItem size={2}>
          {this.props.signedIn ? (
            'SignOut'
          ) : (
            <StyledLink to="/login">Login</StyledLink>
          )}
        </NavItem>
      </Navbar>
    );
  }
}

const Navbar = styled(Flexrow)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(88, 146, 146);
  min-height: 60px;
`;

const Brand = styled(Flexcolumn)`
  font-size: 2em;
  color: rgb(243, 211, 147);
`;

const NavItem = styled(Flexcolumn)`
  text-decoration: none;
  color: rgb(243, 211, 147);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgb(243, 211, 147);
`;

const mapStateToProps = state => {
  return {
    signedIn: state.userReducer.signedIn
  };
};

export default connect(mapStateToProps, null)(Header);
