import React, { Component } from 'react';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { ActionCreators } from '../actions';

import * as database from '../lib/database';

const {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
} = ReactNative;

class AppContainer extends Component{
    constructor(props){
        super(props);

        test();
    }

    reset(){
        this.props.reset()
    }

    render(){
        let text;
        if(this.props.signedOut == false){
            text = "Sign Out"
        }else{
            text = "Sign In"
        }
        return(
            <View style={styles.view}>
                <Text>Day: {this.props.day}, Block: {this.props.block}</Text>
                <TouchableHighlight onPress={Actions.Scan}>
                    <Text>{text}</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.reset.bind(this)}>
                    <Text>Reset</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {database.insertUser("Aidan", "masc1234")}}>
                    <Text>Insert</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        marginTop: 65,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
    return {
        signedOut: state.signedOut,
        day: state.currentDay,
        block: state.currentBlock,
    }
}, mapDispatchToProps)(AppContainer);