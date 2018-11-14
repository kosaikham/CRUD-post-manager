import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post/Post';

class AllPosts extends Component {
    render(){
        let posts = <h3>there is no posts!</h3>
        if(this.props.posts.length > 0){
            posts = this.props.posts.map(post => {
                return <Post key={post.id} post={post}/>
            })
        }

        return (
            <React.Fragment>
                {posts}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts
    }
}

export default connect(mapStateToProps)(AllPosts);