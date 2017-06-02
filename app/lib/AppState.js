import {AppState, Text} from 'react-native'
import {store} from '../store';
import * as types from '../actions/types';
import axios from 'axios';

getAspenDetails();
AppState.addEventListener('change', (nextState) => {
    store.dispatch({
        type: types.CHANGE_APP_STATE,
        payload: nextState,
    });
    if(nextState === 'active'){
        getAspenDetails();
    }
});

function getAspenDetails() {
    try {
        axios.get("https://mhs-aspencheck-serve.herokuapp.com/")
            .then((res) => {
                res = res.data;
                store.dispatch({
                    type: types.SET_BLOCK,
                    payload: res.schedule.block,
                });
                store.dispatch({
                    type: types.SET_DAY,
                    payload: res.schedule.day,
                });
            });
    }catch(err) {
        console.log()
    }

}