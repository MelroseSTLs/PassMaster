import * as SignActions from './sign.js'
import * as AspenActions from './aspen.js'
import * as AppActions from './app';
import * as userActions from './user'

export const ActionCreators = Object.assign({},
  SignActions,
  AspenActions,
  AppActions,
  userActions,
)