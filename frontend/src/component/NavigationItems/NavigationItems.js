import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  Nav,
  NavItem
} from "reactstrap";
import "./NavigationItems.css";

class NavigationItems extends Component {
  render() {
    let navItems = (
        <Nav className="ml-auto Link" navbar>
            <NavItem className="m-1 p-1">
              <NavLink to="/login" exact>Login</NavLink>
            </NavItem>
        </Nav>
    );
    if (this.props.isAuth) {
      navItems = (
            <Nav className="ml-auto Link" navbar>
              <NavItem className="m-1 p-1">
                <NavLink to="/myPosts" exact>My Posts</NavLink>
              </NavItem>
              <NavItem className="m-1 p-1">
                <NavLink to="/logout">Logout</NavLink>
              </NavItem>
            </Nav>
      );
    }
    return ( 
        <React.Fragment>
             {navItems}
        </React.Fragment>
        );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  };
};

export default connect(mapStateToProps)(NavigationItems);
