import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const currentBlock = createReducer("Z", {
  [types.SET_BLOCK](state, action){
    return state = action.payload;
  }
});

export const blockSchedule = createReducer(["A", "B", "C", "D", "E", "F",], {
  [types.SET_SCHEDULE](state, action){
    return state = action.payload;
  }
});

export const currentDay = createReducer("0", {
  [types.SET_DAY](state, action){
    return state = action.payload;
  },
})