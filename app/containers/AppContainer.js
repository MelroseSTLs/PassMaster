import React, { Component } from 'react';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet'

import { ActionCreators } from '../actions';

import * as database from '../lib/database';

import Schedule from '../components/Schedule';

const {
  View,
  Text,
  TouchableHighlight,
  Button,
} = ReactNative;

class AppContainer extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    console.log("Logstate: "+this.props.logState);

    Actions.App();

  }

  reset(){
    this.props.reset()
  }

  test = () => {
    Actions.Login({initial: false});
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
          <Schedule/>

            <TouchableHighlight onPress={Actions.Scan}>
                <Text>{text}</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => Actions.Login({initial: false})}>
                <Text>Login</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.reset.bind(this)}>
                <Text>Reset</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {database.insertUser("Aidan", "masc1234")}}>
                <Text>Insert</Text>
            </TouchableHighlight>
            <View style={styles.button}>
                <Button title="Test" onPress={this.test} accessibilityLabel="Test Stuff"/>
            </View>
        </View>
    )
  }
}

const styles = EStyleSheet.create({
  schedule: {
    width: '100% - 20',
    display: 'flex',
    flexDirection: 'row',
  },
  block: {
    flexGrow: 1,
    backgroundColor: 'red',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastBlock: {
    flexGrow: 1,
    backgroundColor: 'red',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: "$defaultColor",
  },
  button: {
    padding: 5,
    borderRadius: 3,
    borderWidth: 1,
    alignSelf: 'stretch',
    marginRight: 5,
    marginLeft: 5,
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
    logState: state.logState,
  }
}, mapDispatchToProps)(AppContainer);