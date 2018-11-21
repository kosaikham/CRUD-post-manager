import React, { Component } from "react";
import { connect } from "react-redux";
import AllPosts from "../../component/AllPosts/AllPosts";
import * as actions from "../../store/action/posts";
import { updatedObject, checkValidity, formControls } from "../../shared/utility";
import "./Home.css";

const Modal = React.lazy(() => import("../../component/UI/Modal/Modal"));

class Home extends Component {
  state = {
    ...formControls,
    isAddPost: false
  };

onPostSubmit = event => {
  event.preventDefault();
  this.onAddPostHandler();
  this.props.onPostSubmitDispatch(
    this.state.formControls.title.value,
    this.state.formControls.content.value
  );
};

onAddPostHandler = () => {
  if (!this.props.isAuth) {
    this.props.history.replace("/login");
  } else {
    this.setState(prevState => {
      return {
        ...formControls,
        isAddPost: !prevState.isAddPost
      }
    });
  }
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
    formIsValid = updatedPostForm[checkFormInput].valid && formIsValid;
  }
  this.setState({ formControls: updatedPostForm, formIsValid: formIsValid });
};

render() {
  return (
    <div className="container pl-0 pr-0">
      {this.props.isAuth && this.state.isAddPost && (
        <React.Suspense fallback="">
        <Modal
          show={this.state.isAddPost}
          clicked={this.onAddPostHandler}
          modalTitle="ADD POST"
        >
          <form onSubmit={this.onPostSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="title"
                onChange={event => this.onInputChange(event, "title")}
                value={this.state.formControls.title.value}
                className="form-control"
                placeholder="Title"
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                style={{
                  resize: "none"
                }}
                rows="9"
                onChange={event => this.onInputChange(event, "content")}
                value={this.state.formControls.content.value}
                placeholder="Content"
              />
            </div>
            <button
              className="btn btn-primary float-right"
              disabled={!this.state.formIsValid}
            >
              Publish
            </button>
          </form>
        </Modal>
      </React.Suspense>
      )}
      <div className="AddPost mb-5">
        <div className="row">
          <div className="col-md-4">
            <button
              className="btn btn-secondary"
              onClick={this.onAddPostHandler}
            >
              {this.props.isAuth ? "Add Post" : "Login to add post"}
            </button>
          </div>
          <div className="col-md-8">
            <h2
              style={{
                color: "white"
              }}
            >
              “Don’t focus on having a great blog. Focus on producing a blog
              that’s great for your readers.”
            </h2>
          </div>
        </div>
      </div>
      <div>
        <div>
          <AllPosts />
        </div>
      </div>
    </div>
  );
}
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPostSubmitDispatch: (title, content) =>
      dispatch(actions.addPost(title, content))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
