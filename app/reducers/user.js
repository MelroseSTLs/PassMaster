import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const userId = createReducer(null, {
  [types.SET_USER_ID](state, action){
    return state = action.payload;
  },
  [types.RESET_USER_ID](state, action){
    return state = '';
  }
});

export const userName = createReducer(null, {
  [types.SET_USER_NAME](state, action){
    return state = action.payload;
  },
  [types.RESET_USER_NAME](state, action){
    return state = '';
  }
});

export const userAvatar = createReducer(null, {
  [types.SET_USER_AVATAR](state, action){
    return state = action.payload;
  },
  [types.RESET_USER_AVATAR](state, action){
    return state = '';
  }
});

export const userEmail = createReducer(null, {
  [types.SET_USER_EMAIL](state, action){
    return state = action.payload;
  },
  [types.RESET_USER_EMAIL](state, action){
    return state = '';
  }
});

export const logState = createReducer(false, {
  [types.LOGIN](state, action){
    return state = true;
  },
  [types.LOGOUT](state, action){
    return state = false;
  }
});