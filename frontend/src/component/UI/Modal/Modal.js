import React, { Component } from "react";
import {Modal as ModalReact, ModalHeader, ModalBody } from 'reactstrap';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render(){
    return (
      <div>
        <ModalReact isOpen={this.props.show} toggle={this.props.clicked}>
          <ModalHeader toggle={this.props.clicked} className="text-light bg-dark">{this.props.modalTitle}</ModalHeader>
          <ModalBody>
          {this.props.children}
          </ModalBody>
        </ModalReact>
      </div>
      
    );
  }
}

export default Modal;
