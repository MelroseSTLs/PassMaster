'use strict';

import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableOpacity,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';

import * as database from '../lib/database';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import QRCodeScanner from 'react-native-qrcode-scanner';

class qrScanner extends Component{
  constructor() {
    super();

    this.state = {classRoom: '', secondsOut: 0};
  }

  onSuccess(e) {
    try {
      const data = JSON.parse(e.data);
      if (!(data.class)) {
        AlertIOS.alert(
          "Invalid Room",
        )
      } else {
        database.getUserState(this.props.user)
          .then((res) => {
            console.log("Res: "+res);
            if(res === 'Failed'){
              AlertIOS.alert(
                "Failed: Please try again soon.",
              )
            }else if(res === "true"){
              console.log("Signing In");
              this.signIn.bind(this);
              this.signIn(data.class);
            }else if(res === "false"){
              console.log("Signing Out");
              this.signOut.bind(this);
              this.signOut(data.class);
            }else{
              AlertIOS.alert(
                "Failed: Please try again soon.",
              )
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
      this.setState({classRoom: data.class});
    } catch (err) {
      console.log(err);
      AlertIOS.alert(
        "Invalid Room",
      )
    }
  }

  signIn(intoClass){
    database.signIn(this.props.user, intoClass)
      .then((res) => {
        if(res){
          console.log("Signing in");
          this.props.resetCounter();
          AlertIOS.alert(
            "QR Code Scanner",
            "Signing in"
          );
        }else{
          console.log("Sign in rejected");
        }
      })
  }

  signOut(leavingClass){
    database.signOut(this.props.user, leavingClass)
      .then((res) => {
        if(res){
          let d = new Date();
          const mins = d.getMinutes();
          const hours = d.getHours();
          AlertIOS.alert(
            "QR Code Scanner",
            "Leaving room " + leavingClass + " at " + hours + ":" + mins
          );
          this.props.setCounterTime(d.getTime());
        }else{
          console.log("Sign out rejected");
        }
      })
  }

  timeToString(time){
    const seconds = time%60;
    const mins = (time-seconds)/60;

    if(time > 300){
      this.props.resetCounter();
      AlertIOS.alert(
        "QR Code Scanner",
        "You were out for too long"
      );
    }

    if(mins == 0){
      return seconds+"s";
    }else{
      return mins+" minutes, "+seconds+" seconds";
    }
  }

  render() {
    this.onSuccess.bind(this);
    return (
      <View style={styles.container}>
          <Text style={styles.text}>Scan a qr code to sign out!</Text>
          <QRCodeScanner onRead={this.onSuccess.bind(this)} cameraStyle={styles.scanner}/>
          <Text>Time since sign out: {this.timeToString(this.props.timeOut)}</Text>
          <TouchableHighlight onPress={() => this.onSuccess({data: '{"class": "234"}'})}>
              <Text>Test</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 0,
    backgroundColor: '$defaultColor',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    flex: 0,
    marginTop: 30,
  },

  scanner: {
    flex: 5,
    marginBottom: 100,
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  return {
    timeOut: state.counterTime,
    signedOut: state.signedOut,
    currentRoom: state.currentRoom,
    user: state.userId
  }
}, mapDispatchToProps)(qrScanner);