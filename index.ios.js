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
import EStyleSheet from 'react-native-extended-stylesheet';

import qrScanner from './app/containers/qrScanner';
import AppContainer from './app/containers/AppContainer';
import Login from './app/containers/Login';

EStyleSheet.build({
  //$defaultSize: '100% - 20',
  $defaultColor: '#E9EAED',
  $textBoxColor: '#F6F7F8',
  $optionColor: '#FFFFFF',
});
const app = () => (
    <Provider store={store}>
        <Router>
            <Scene key="root">
                <Scene key="App" component={AppContainer} title="App" panHandlers={null}/>
                <Scene key="Scan" component={qrScanner} title="Qr" panHandlers={null}/>
                <Scene key="Login" component={Login} title="Login" initial={true} hideNavBar={true} panHandlers={null}/>
            </Scene>
        </Router>
    </Provider>
);

AppRegistry.registerComponent('testQr', () => app);
