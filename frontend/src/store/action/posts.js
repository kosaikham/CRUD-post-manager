import * as actionTypes from './actionTypes';
import axios from 'axios';

const postStart = () => {
    return {
        type: actionTypes.POST_START
    }
}

const postFail = err => {
    return {
        type: actionTypes.POST_FAIL,
        error: err
    }
}

const postSuccess = post => {
    return {
        type: actionTypes.POST_SUCCESS,
        post
    }
}

const updatePostStart = () => {
    return {
        type: actionTypes.UPDATE_POST_START
    }
}

const updatePostSuccess = post => {
    return {
        type: actionTypes.UPDATE_POST_SUCCESS,
        post
    }
}

const updatePostFail = err => {
    return {
        type: actionTypes.UPDATE_POST_FAIL,
        error: err
    }
}

export const updatePost = (title, content, postId) => {
    return dispatch => {
        dispatch(updatePostStart());
        const data = {
            title,
            content,
            id: postId
        }
        axios.put('/api/posts/update', data)
            .then(res => {
                dispatch(updatePostSuccess(res.data))
            })
            .catch(err => {
                dispatch(updatePostFail(err))
            })
    }
}

const deletePostStart = () => {
    return {
        type: actionTypes.DELETE_POST_START
    }
}

const deletePostSuccess = post => {
    return {
        type: actionTypes.DELETE_POST_SUCCESS,
        post
    }
}

const deletePostFail = error => {
    return {
        type: actionTypes.DELETE_POST_FAIL,
        error
    }
}

export const deletePost = postId => {
    return dispatch => {
        dispatch(deletePostStart())
        axios.delete('/api/posts/delete/' + postId)
            .then(res => {
                dispatch(deletePostSuccess(res.data))
            })
            .catch(err => {
                dispatch(deletePostFail(err))
            })
    }
}

export const addPost = (title, content) => {
    return dispatch => {
        dispatch(postStart())
        const data = {
            title,
            content
        }
        axios.post('/api/posts/add', data)
            .then(res => {
                dispatch(postSuccess(res.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(postFail(err))
            })
    }
}

const fetchAllPostsStart = () => {
    return {
        type: actionTypes.FETCH_ALL_POSTS_START
    }
}

const fetchAllPostsSuccess = posts => {
    return {
        type: actionTypes.FETCH_ALL_POSTS_SUCCESS,
        posts
    }
}

const fetchAllPostsFail = err => {
    return {
        type: actionTypes.FETCH_ALL_POSTS_FAIL,
        err
    }
}

export const fetchAllPosts = () => {
    return dispatch => {
        dispatch(fetchAllPostsStart());
        axios.get('/api/posts/all')
            .then(res => {
                dispatch(fetchAllPostsSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchAllPostsFail(err))
            })
    }
}