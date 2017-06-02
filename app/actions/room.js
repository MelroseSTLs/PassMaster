import * as types from './types'

export function setRoom(room){
    return {
        type: types.SET_ROOM,
        payload: room,
    }
}

export function resetRoom(){
    return{
        type: types.RESET_ROOM,
    }
}