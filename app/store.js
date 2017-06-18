import {rootReducer} from './reducers'
import {loadState, saveState} from './localStorage.js'
import * as asyncInitialState from 'redux-async-initial-state';
import reduxReset from 'redux-reset'

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import throttle from 'lodash/throttle'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__});

function configureStore(initialState){
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
            asyncInitialState.middleware(loadState),
        ),
        reduxReset(),
    );
    return createStore(rootReducer, initialState, enhancer);
}

export let store = configureStore({});


store.subscribe(throttle(() => {
    saveState({
        state: store.getState()
    })
}, 1000));