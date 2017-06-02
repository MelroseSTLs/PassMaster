import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const currentRoom = createReducer("0", {
    [types.SET_ROOM](state, action){
        return state = action.payload;
    },

    [types.RESET_ROOM](state, action){
        return state = '0';
    }
});