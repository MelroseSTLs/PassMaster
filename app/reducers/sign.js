import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const timeOut = createReducer(0, {
    [types.RESET_TIME_OUT](state, action){
        return state = 0;
    },
    [types.SET_TIME_OUT](state, action){
        const d = new Date();
        return state = d.getTime();
    }
});

export const counterTime = createReducer(0, {
    [types.RESET_COUNTER_TIME](state, action){
        return state = 0;
    },
    [types.SET_COUNTER_TIME](state, action){
        return state = action.payload;
    }
})