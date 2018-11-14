import * as actionTypes from '../action/actionTypes';

const initialState = {
    posts: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.POST_START: return {
            ...state,
            loading: true
        }
        case actionTypes.POST_FAIL: return {
            ...state,
            loading: false
        }
        case actionTypes.POST_SUCCESS: return {
            ...state,
            loading: false,
            posts: [action.post, ...state.posts]
        }
        case actionTypes.FETCH_ALL_POSTS_START: return {
            ...state,
            loading: true
        }
        case actionTypes.FETCH_ALL_POSTS_SUCCESS: return {
            ...state,
            posts: state.posts.concat(action.posts),
            loading: false
        }
        case actionTypes.FETCH_ALL_POSTS_FAIL: return {
            ...state,
            loading: false
        }
        case  actionTypes.UPDATE_POST_START: return {
            ...state,
            loading: true
        }
        case actionTypes.UPDATE_POST_SUCCESS: 
            const index = [...state.posts].findIndex(post => post.id === action.post.id);
            const clonePosts = [...state.posts];
            clonePosts.splice(index, 1, action.post);
            return {
            ...state,
            loading: false,
            posts: clonePosts
        }
        case actionTypes.UPDATE_POST_FAIL: return {
            ...state,
            loading: false
        }
        case actionTypes.DELETE_POST_START: return {
            ...state,
            loading: true
        }
        case actionTypes.DELETE_POST_SUCCESS: 
            const indexToRemove = [...state.posts].findIndex(post => post.id === action.post.id);
            const clonePostsToRemove = [...state.posts];
            clonePostsToRemove.splice(indexToRemove, 1);
            return {
            ...state,
            loading: false,
            posts: clonePostsToRemove
        }
        case actionTypes.DELETE_POST_FAIL: return {
            ...state,
            loading: false
        }
        default: return state;
    }
}

export default reducer;