import * as types from './types'

let counterInterval;

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

export function resetCounter(){
    return dispatch => {
        clearInterval(counterInterval);
        dispatch({
            type: types.RESET_COUNTER_TIME
        })
    }
}