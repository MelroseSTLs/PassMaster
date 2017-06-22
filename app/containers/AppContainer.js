import React, { Component } from 'react';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet'

import { ActionCreators } from '../actions';

import * as database from '../lib/database';

import Schedule from '../components/Schedule';
import ButtonContainer from '../components/ButtonContainer';

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

  reset = () => {
    this.props.reset()
  };

  test = () => {
    Actions.Login({initial: false});
  };

  render(){
    let text;
    if(this.props.signedOut == false){
      text = "Sign Out"
    }else{
      text = "Sign In"
    }

    let reset;
    if(__DEV__){
      reset = <ButtonContainer title="Reset" text="Reset the state." buttonText="Reset" onPress={this.reset}/>;
    }else{
      reset = null;
    }
    return(
        <View style={styles.view}>
          <View style={styles.container}>
            <Schedule/>
            <ButtonContainer title="Qr" text="This app uses Qr codes as passes to easily let you sign out of a class or get a pass to a room." buttonText="Go to Scanner" onPress={Actions.Scan}/>
            <ButtonContainer title="Login" text="If you want to change your user, use this." buttonText="Go to Login" onPress={() => Actions.Login({initial: false})}/>
            {reset}
          </View>
        </View>
    )
  }
}

const styles = EStyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "$defaultColor",
  },
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
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