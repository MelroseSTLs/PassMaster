import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const appState = createReducer("active", {
    [types.CHANGE_APP_STATE](state, action){
        return state = action.payload;
    }
});
