import * as types from './types';

export function reset(){
    return {
        type: "RESET",
        payload: {},
    }
}