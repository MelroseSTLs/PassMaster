import React, { Component } from 'react';
import ReactNative from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { connect } from 'react-redux';
const {
  View,
  Text,
  Button,
} = ReactNative;

class ButtonContainer extends Component{
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
        <View style={styles.button}>
          <Button title={this.props.buttonText} onPress={this.props.onPress}/>
        </View>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
    container: {
      alignSelf: 'stretch',
      margin: 10,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 3,
      backgroundColor: "$optionColor"
    },
    textBox: {
      padding: 5,
      paddingLeft: 8,
      alignSelf: 'stretch',
      backgroundColor: '$textBoxColor',
      borderBottomWidth: 1,
      borderBottomColor: '$defaultColor',
    },
    title: {
      fontWeight: '600',
    },
    text: {
      //marginLeft: 3,
    },
    button: {
      padding: 5,
      alignSelf: 'stretch',
    }
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  return {}
}, mapDispatchToProps)(ButtonContainer);