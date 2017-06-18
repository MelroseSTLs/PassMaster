//This function gets the persisted state out of local storage
import {AsyncStorage} from 'react-native'

import {store} from './store';
import * as types from './actions/types'

const key = 'testQrState';

export const loadState = () => {
    console.log("Loading State");
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key)
            .then((serializedData)=>{
                if(serializedData === null){
                    resolve(undefined)
                }

                const data = JSON.parse(serializedData);
                resolve(data.state)
            })
            .catch ((err) => {
                resolve(undefined);
                throw ("Could not get localStorage state");
            });
    })
};

export const saveState = (fullState) => {
    const state = {...fullState.state};
    exclusions.forEach((item) => {
        delete state[item];
    });
    //State is saved as a string so it has to be stringified
    AsyncStorage.setItem(key, JSON.stringify({state: state}));
};

const exclusions = [
    'timeOut',
    'counterTime',
    'appState',
    'currentBlock',
    'currentDay',
    'currentRoom',
    'timeOut',
    'signedOut',
];
