import * as actionTypes from '../action/actionTypes';

const initialState = {
    token: null,
    id: null,
    name: null,
    error: null,
    loading: false,
    isAuth: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return {
            ...state,
            loading: true
        }
        case actionTypes.AUTH_SUCCESS: return {
            ...state,
            token: action.token,
            id: action.id,
            loading: false,
            error: null,
            isAuth: action.success
        }
        case actionTypes.AUTH_FAIL: return {
            ...state,
            loading: false,
            error: action.errorMsg
        }
        case actionTypes.AUTH_LOGOUT: return {
            ...state,
            token: null,
            id: null,
            isAuth: false
        }
        default: return state;
    }
}

export default reducer;