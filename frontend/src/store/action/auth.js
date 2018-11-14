import * as actionTypes from './actionTypes';
import axios from 'axios';
import setAuthToken from '../setAuthToken';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (token, id, success) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        id,
        success
    }
}

export const authFail = errorMsg => {
    return {
        type: actionTypes.AUTH_FAIL,
        errorMsg
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    setAuthToken(false);
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiresIn * 1000)
    }
}

export const auth = (email,password,name = null) => {
    return dispatch => {
        dispatch(authStart());
        let url = '/api/users/login';
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        if(name){
            authData.name = name;
            url = '/api/users/register';
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('name', response.data.name);
                setAuthToken(response.data.token);
                dispatch(authSuccess(response.data.token, response.data.id, response.data.success))
                dispatch(authLogout(response.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFail(error.response.data.message));
            })
    }
}

export const authCheckAuto = () => {
    return dispatch => {
        if(!localStorage.getItem('token')){
            dispatch(logout())
        }else{
            const expirationDate = localStorage.getItem('expirationDate');
            if(expirationDate <= new Date()){
                dispatch(logout())
            }else{
                console.log('auto check success');
                const newExpirationDate = (new Date(expirationDate).getTime() - new Date().getTime()) / 1000;
                setAuthToken(localStorage.getItem('token'));
                dispatch(authSuccess(localStorage.getItem('token'), localStorage.getItem('userId'), true))
                dispatch(authLogout(newExpirationDate));
            }
        }
    }
}
