import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { updatedObject, checkValidity } from "../../shared/utility";
import * as actions from "../../store/action/auth";
import "./Login.css";

class Login extends Component {
  state = {
    isRegister: false,
    formControls: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-Mail"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  };

  onInputChange = (event, type) => {
    const updatedPostElement = updatedObject(this.state.formControls[type], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.formControls[type].validation
      ),
      touched: true
    });

    const updatedPostForm = updatedObject(this.state.formControls, {
      [type]: updatedPostElement
    });

    let formIsValid = true;
    for (let checkFormInput in updatedPostForm) {
      if (checkFormInput === "name") {
        if (!this.state.isRegister) {
          continue;
        }
      }
      formIsValid = updatedPostForm[checkFormInput].valid && formIsValid;
    }
    this.setState({ formControls: updatedPostForm, formIsValid: formIsValid });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.onSubmit(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      this.state.formControls.name.value !== ""
        ? this.state.formControls.name.value
        : null
    );
  };

  onClickRegisterHandler = () => {
    this.setState(prevState => {
      return {
        isRegister: !prevState.isRegister,
        formControls: {
          name: {
            elementType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Name"
            },
            value: "",
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          email: {
            elementType: "input",
            elementConfig: {
              type: "email",
              placeholder: "E-Mail"
            },
            value: "",
            validation: {
              required: true,
              isEmail: true
            },
            valid: false,
            touched: false
          },
          password: {
            elementType: "input",
            elementConfig: {
              type: "password",
              placeholder: "Password"
            },
            value: "",
            validation: {
              required: true,
              minLength: 6
            },
            valid: false,
            touched: false
          }
        },
        formIsValid: false
      };
    });
  };

  render() {
    let redirect = null;
    if (this.props.isAuth) {
      redirect = <Redirect to={this.props.authRedirectPath} />;
    }

    let nameInput = (
      <input
        type="text"
        name="name"
        className={
          !this.state.formControls.name.valid &&
          this.state.formControls.name.touched
            ? "form-control border-danger"
            : "form-control"
        }
        placeholder="Name"
        onChange={event => this.onInputChange(event, "name")}
        value={this.state.formControls.name.value}
      />
    );

    return (
      <div className="container pl-0 pr-0">
        <div className="LoginForm">
          {redirect}
            <div className="login-form">
              <div className="main-div">
                <div className="panel">
                  <h2>{this.state.isRegister ? "Register" : "Login"}</h2>
                  {this.props.error ? (
                      <div className="alert alert-danger" role="alert">
                        {this.props.error}
                      </div>
                  ) : null}
                </div>
                <form onSubmit={this.onSubmitHandler}>
                  <div className="form-group">
                    {this.state.isRegister ? nameInput : null}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className={
                        !this.state.formControls.email.valid &&
                        this.state.formControls.email.touched
                          ? "form-control border-danger"
                          : "form-control"
                      }
                      onChange={event => this.onInputChange(event, "email")}
                      value={this.state.formControls.email.value}
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className={
                        !this.state.formControls.password.valid &&
                        this.state.formControls.password.touched
                          ? "form-control border-danger"
                          : "form-control"
                      }
                      onChange={event => this.onInputChange(event, "password")}
                      value={this.state.formControls.password.value}
                      placeholder="Password"
                    />
                  </div>
                  <div className="switch">
                    <p onClick={this.onClickRegisterHandler}>
                      {this.state.isRegister
                        ? "Switch to Login"
                        : "Switch to Register"}
                    </p>
                  </div>
                  <button
                    className="btn btn-primary"
                    disabled={!this.state.formIsValid}
                  >
                    {this.state.isRegister ? "Register" : "Login"}
                  </button>
                </form>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    authRedirectPath: state.auth.authRedirectPath,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (email, password, name) =>
      dispatch(actions.auth(email, password, name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
