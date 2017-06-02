import * as types from './types';
import axios from 'axios';

export function getBlock() {
    return dispatch => {
        try {
            axios.get("https://mhs-aspencheck-serve.herokuapp.com/")
                .then((res) => {
                    res = res.data;
                    dispatch({
                        type: types.SET_BLOCK,
                        payload: res.schedule.block,
                    });
                    dispatch({
                        type: types.SET_DAY,
                        payload: res.schedule.day,
                    });
                });
        }catch(err) {
            console.log()
        }
    }
}