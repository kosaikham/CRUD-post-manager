import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./NavigationItems.css";

class NavigationItems extends Component {
  render() {
    let navItems = (
      <li className="nav-item m-1 p-1">
        <NavLink to="/login" exact>
          Login
        </NavLink>
      </li>
    );
    if (this.props.isAuth) {
      navItems = (
        <React.Fragment>
          <li className="nav-item m-1 p-1">
            <NavLink to="/myPosts" exact>
              My Posts
            </NavLink>
          </li>
          <li className="nav-item m-1 p-1">
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <ul className="navbar-nav Link ml-auto">{navItems}</ul>
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
