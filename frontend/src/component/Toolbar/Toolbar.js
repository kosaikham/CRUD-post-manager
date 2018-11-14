import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import NavigationItems from "../NavigationItems/NavigationItems";
import { Collapse, Navbar, NavbarToggler } from "reactstrap";
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
        <Navbar color="light" light expand="md">
          <div className="Brand">
            <h3>
            <NavLink to="/">Post Manager</NavLink>
            </h3>
          </div>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <NavigationItems />
          </Collapse>
        </Navbar>
      </div>

      //   <div>
      //
      //     <div>
      //       <NavigationItems />
      //     </div>
      //   </div>
    );
  }
}

export default Toolbar;
