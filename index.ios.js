/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import { Provider } from 'react-redux';

import {Scene, Router} from 'react-native-router-flux';
import {store} from './app/store'
import './app/lib/AppState';

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import qrScanner from './app/containers/qrScanner';
import AppContainer from './app/containers/AppContainer';

const app = () => (
    <Provider store={store}>
        <Router>
            <Scene key="root">
                <Scene key="App" component={AppContainer} title="App" initial={true}/>
                <Scene key="Scan" component={qrScanner} title="Qr"/>
            </Scene>
        </Router>
    </Provider>
);

AppRegistry.registerComponent('testQr', () => app);
