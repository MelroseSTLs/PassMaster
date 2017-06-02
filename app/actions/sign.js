import * as types from './types'

var counterInterval;

export function signOut(){
    return {
        type: types.SIGN_OUT,
        payload: {},
    }
}

export function signIn() {
    clearInterval(counterInterval);
    return {
        type: types.SIGN_IN,
        payload: {},
    }
}

export function setTimeOut() {
    return{
        type: types.SET_TIME_OUT,
        payload: {},
    }
}

export function setCounterTime(timeOut) {
    return dispatch => {
        counterInterval = setInterval(() => {
            let currentTime = new Date();
            let timeChange = currentTime.getTime() - timeOut;
            let seconds = Math.floor(timeChange/1000);
            dispatch({
                type: types.SET_COUNTER_TIME,
                payload: seconds,
            })
        }, 1000)
    }
}