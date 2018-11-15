import React, { Component } from "react";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Toolbar from "../../component/Toolbar/Toolbar";
import Home from "../../container/Home/Home";
import LazyLoading from '../LazyLoading/LazyLoading';

const Login = LazyLoading(() => {
  return import('../../container/Login/Login');
})

const MyPosts = LazyLoading(() => {
  return import('../../container/MyPosts/MyPosts');
})

const Logout = LazyLoading(() => {
  return import('../../component/NavigationItems/Logout/Logout');
})

class Layout extends Component {
  render() {
    let routes = (
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    );

    if (this.props.isAuth) {
      routes = (
        <div>
          <Switch>
            <Route path="/myPosts" component={MyPosts} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </Switch>
        </div>
      );
    }
    return (
      <React.Fragment>
        <Toolbar />
        {routes}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  };
};

export default withRouter(connect(mapStateToProps)(Layout));
