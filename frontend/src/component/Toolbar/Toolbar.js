import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import NavigationItems from "../NavigationItems/NavigationItems";
import './Toolbar.css';

class Toolbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState(prevState => {
      return {
        isOpen: !prevState.isOpen
      };
    });
  };

  render() {
    return (
      <div className="container pl-0 pr-0">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="/">Post Manager</NavLink>
          <button 
            className={this.state.isOpen ? "navbar-toggler" : "navbar-toggler collapsed"} 
            onClick={this.toggle}
            type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div 
            className={this.state.isOpen ? "navbar-collapse collapse show " : "navbar-collapse collapse"} >
            <NavigationItems />
          </div>
        </nav>
      </div>
    );
  }
}

export default Toolbar;
