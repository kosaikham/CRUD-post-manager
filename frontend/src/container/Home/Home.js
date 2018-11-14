import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllPosts from '../../component/AllPosts/AllPosts';
import Modal from '../../component/UI/Modal/Modal';
import * as actions from '../../store/action/posts';
import { updatedObject, checkValidity } from '../../shared/utility';
import "./Home.css";
import {Button} from "reactstrap";

class Home extends Component {
    state = {
        isAddPost: false,
        formControls: {
            title: {
                elementType: "input",
                elementConfig: {
                  type: "text",
                  placeholder: "Title"
                },
                value: "",
                validation: {
                  required: true,
                  minLength: 5
                },
                valid: false,
                touched: false
              },
              content: {
                elementType: "textarea",
                elementConfig: {
                  type: "text",
                  placeholder: "Content"
                },
                value: "",
                validation: {
                  required: true,
                  minLength: 10
                },
                valid: false,
                touched: false
              }
        },
        formIsValid: false
    }
    onPostSubmit = event => {
        event.preventDefault();
        this.onAddPostHandler();
        this.props.onPostSubmitDispatch(
            this.state.formControls.title.value,
            this.state.formControls.content.value
        )
    }

    onAddPostHandler = () => {
        if(!this.props.isAuth){
            this.props.history.replace('/login')
        }else{
            this.setState(prevState => {
                return {
                    isAddPost: !prevState.isAddPost,
                    formControls: {
                        title: {
                            elementType: "input",
                            elementConfig: {
                              type: "text",
                              placeholder: "Title"
                            },
                            value: "",
                            validation: {
                              required: true,
                              minLength: 5
                            },
                            valid: false,
                            touched: false
                          },
                          content: {
                            elementType: "textarea",
                            elementConfig: {
                              type: "text",
                              placeholder: "Content"
                            },
                            value: "",
                            validation: {
                              required: true,
                              minLength: 10
                            },
                            valid: false,
                            touched: false
                          }
                    },
                    formIsValid: false
                }
            })
        }
    }

    onInputChange = (event, type) => {
        // const value = event.target.value;
        // const updatedObj = {...this.state.formControls, [type]: value};
        // this.setState({
        //     formControls: updatedObj
        // })
        const updatedPostElement = updatedObject(this.state.formControls[type],{
            value: event.target.value,
            valid: checkValidity(
              event.target.value,
              this.state.formControls[type].validation
            ),
            touched: true
          })
      
          const updatedPostForm = updatedObject(this.state.formControls,{
            [type]: updatedPostElement
          })
      
          let formIsValid = true;
          for (let checkFormInput in updatedPostForm) {
            formIsValid = updatedPostForm[checkFormInput].valid && formIsValid;
          }
          this.setState({ formControls: updatedPostForm, formIsValid: formIsValid });
    }

    render(){
        return (
            <div className="container pl-0 pr-0">
                {/* <Modal show={this.state.isAddPost} clicked={this.onAddPostHandler}>
                <form onSubmit={this.onPostSubmit}>
                    <input 
                        type='text' 
                        name='title' 
                        onChange={event => this.onInputChange(event, 'title')} 
                        value={this.state.formControls.title}
                        placeholder='title'/>
                    <input 
                        type='text' 
                        name='content' 
                        onChange={event => this.onInputChange(event, 'content')} 
                        value={this.state.formControls.content}
                        placeholder='content'/>
                    <button>Post</button>
                </form>
                </Modal> */}
                <Modal 
                    show={this.state.isAddPost} 
                    clicked={this.onAddPostHandler}
                    modalTitle="ADD POST">
                <form onSubmit={this.onPostSubmit}>
                        <div className="form-group">
                            <input 
                                type='text' 
                                name='title'
                                onChange={event => this.onInputChange(event, 'title')} 
                                value={this.state.formControls.title.value}
                                className="form-control"
                                placeholder="Title" />
                        </div>
                        <div className="form-group">
                        <textarea 
                          className="form-control"
                          style={{
                            resize: 'none'
                          }}
                          rows="9"
                          onChange={event => this.onInputChange(event, 'content')} 
                        value={this.state.formControls.content.value}
                          placeholder="Content">
                        </textarea>
                        </div>
                        <button 
                            className="btn btn-primary float-right"
                            disabled={!this.state.formIsValid}>
                        Publish
                        </button>
                    </form>
                    </Modal>
                <div className="AddPost mb-5">
                    <div className="row">
                    <div className="col-md-4">
                    <Button onClick={this.onAddPostHandler}>
                    {this.props.isAuth ? 'Add Post' : 'Login to add post' }
                    </Button>
                    </div>
                    <div className="col-md-8">
                    <h2 style={{
                        color: 'white'
                    }}>“Don’t focus on having a great blog. Focus on producing a blog that’s great for your readers.”</h2>
                    </div>
                    </div>
                </div>
                <div>
                    <div>
                    <AllPosts />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostSubmitDispatch: (title,content) => dispatch(actions.addPost(title, content))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);