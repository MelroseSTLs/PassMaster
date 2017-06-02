'use strict';

import React, { Component } from 'react';
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
                console.log("Class: ",data.class," Current Room: ",this.props.currentRoom," Sign State: "+this.props.signedOut);
                if(this.props.signedOut == false){
                    console.log("Signing Out");
                    this.signOut.bind(this);
                    this.signOut(data.class);
                }else if (this.props.signedOut == true && data.class === this.props.currentRoom){
                    console.log("Signing In");
                    this.signIn.bind(this);
                    this.signIn()
                }else{
                    AlertIOS.alert(
                        "You can only sign out of one room at a time",
                    )
                }
            }
            this.setState({classRoom: data.class});
        } catch (err) {
            console.log(err);
            AlertIOS.alert(
                "Invalid Room",
            )
        }
    }

    signIn(){
        this.props.signIn();
        this.props.resetRoom();
    }

    signOut(leavingClass){
        let d = new Date();
        const mins = d.getMinutes();
        const hours = d.getHours();
        AlertIOS.alert(
            "QR Code Scanner",
            "Leaving room " + leavingClass + " at " + hours + ":" + mins
        );
        this.props.signOut();
        this.props.setCounterTime(d.getTime());
        this.props.setRoom(leavingClass);
    }

    render() {
        this.onSuccess.bind(this);
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Scan a qr code to sign out!</Text>
                <QRCodeScanner onRead={this.onSuccess.bind(this)} cameraStyle={styles.scanner}/>
                <Text>Time since sign out: {this.props.timeOut}</Text>
                <TouchableHighlight onPress={() => this.onSuccess({data: '{"class": "147"}'})}>
                    <Text>Test</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 0,
        backgroundColor: '#F7F7F7',
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
    }
}, mapDispatchToProps)(qrScanner);