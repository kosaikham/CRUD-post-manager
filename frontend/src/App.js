import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/action/posts';
import * as authActions from './store/action/auth';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  componentDidMount(){
    this.props.onTryAuthCheck();
    this.props.onFetchAllPost();
  }

  render() {
    return (
      <Layout />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchAllPost: () => dispatch(actions.fetchAllPosts()),
    onTryAuthCheck: () => dispatch(authActions.authCheckAuto())
  }
}

export default withRouter(connect(null,mapDispatchToProps)(App));
