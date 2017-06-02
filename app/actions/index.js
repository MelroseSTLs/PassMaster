import * as SignActions from './sign.js'
import * as AspenActions from './aspen.js'
import * as RoomActions from './room'
import * as AppActions from './app';

export const ActionCreators = Object.assign({},
    SignActions,
    AspenActions,
    RoomActions,
    AppActions,
)