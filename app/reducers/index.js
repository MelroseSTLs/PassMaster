import { combineReducers } from 'redux';
import * as asyncInitialState from 'redux-async-initial-state';
import * as signReducer from './sign.js';
import * as aspenReducer from './aspen';
import * as appReducer from './app';
import * as userReducer from './user'

export const rootReducer = asyncInitialState.outerReducer(combineReducers(Object.assign({asyncInitialState: asyncInitialState.innerReducer,},
  signReducer,
  aspenReducer,
  appReducer,
  userReducer,
)));