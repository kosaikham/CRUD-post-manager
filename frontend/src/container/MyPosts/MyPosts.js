import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../../component/AllPosts/Post/Post';
import { updatedObject, checkValidity, formControls } from '../../shared/utility';
import * as actions from '../../store/action/posts';
import "../Home/Home.css";

const Modal = React.lazy(() => import('../../component/UI/Modal/Modal'));

class MyPosts extends Component {
    state = {
        ...formControls,
        isEditPost: false,
        id: ''
    }

    onEditHandler = post => {
        this.setState(prevState => {
            return {
                isEditPost: !prevState.isEditPost,
                id: post.id,
                formControls: {
                    title: {
                        elementType: "input",
                        elementConfig: {
                          type: "text",
                          placeholder: "Title"
                        },
                        value: post.title,
                        validation: {
                          required: true,
                          minLength: 5
                        },
                        valid: true,
                        touched: false
                      },
                      content: {
                        elementType: "textarea",
                        elementConfig: {
                          type: "text",
                          placeholder: "Content"
                        },
                        value: post.content,
                        validation: {
                          required: true,
                          minLength: 10
                        },
                        valid: true,
                        touched: false
                      }
                }
            }
        })
    }

    onInputChange = (event, type) => {
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

    onAddEditPostHandler = () => {
        this.setState(prevState => {
            return {
                isEditPost: !prevState.isEditPost,
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
                formIsValid: false,
                id: ''
            }
        })
    }

    onPostUpdate = event => {
        event.preventDefault();
        this.onAddEditPostHandler();
        this.props.onPostUpdateDispatch(
            this.state.formControls.title.value,
            this.state.formControls.content.value,
            this.state.id
        )
    }

    render(){
        let AllPosts = <h3>There is no posts.</h3>
        
        const myPosts = this.props.posts.filter(post => post.userId === this.props.id);
        
        if(myPosts.length > 0){
            AllPosts = myPosts.map(post => {
                return <Post 
                    key={post.id} 
                    post={post} 
                    editHandler={() => this.onEditHandler(post)}
                    deleteHandler={() => this.props.onPostDeleteDispatch(post.id)} />
            })
        }

        return (
            <div className="container pl-0 pr-0">
            {this.state.isEditPost && (
                <React.Suspense fallback="">
                    <Modal 
                    show={this.state.isEditPost} 
                    clicked={this.onAddEditPostHandler}
                    modalTitle="EDIT POST">
                <form onSubmit={this.onPostUpdate}>
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
                            disabled={!this.state.formIsValid} >
                        Update
                        </button>
                    </form>
                </Modal>
                </React.Suspense>
            )}
                <div className="AddPost mb-5">
                    <div className="row">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-8">
                    <h2 style={{
                        color: 'white'
                    }}>“Don’t focus on having a great blog. Focus on producing a blog that’s great for your readers.”</h2>
                    </div>
                    </div>
                </div>
                <div>
                    {AllPosts}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        id: state.auth.id,
        posts: state.posts.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostUpdateDispatch: (title,content,id) => dispatch(actions.updatePost(title, content, id)),
        onPostDeleteDispatch: (postId) => dispatch(actions.deletePost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);