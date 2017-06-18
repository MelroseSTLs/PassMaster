import React, { Component } from 'react';
import ReactNative from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { connect } from 'react-redux';
const {
  View,
  Text,
  TouchableHighlight,
  Button,
} = ReactNative;

class Schedule extends Component{
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.text}>It is a day: {this.props.day}</Text>
        </View>
        <View style={styles.schedule}>
          <View style={styles.block}>
            <Text>A</Text>
          </View>
          <View style={styles.block}>
            <Text>B</Text>
          </View>
          <View style={[styles.block, styles.blockActive]}>
            <Text>C</Text>
          </View>
          <View style={styles.block}>
            <Text>D</Text>
          </View>
          <View style={styles.block}>
            <Text>E</Text>
          </View>
          <View style={[styles.block, {borderRightWidth: 0}]}>
            <Text>F</Text>
          </View>
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
  schedule: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  textBox: {
    padding: 5,
    alignSelf: 'stretch',
    backgroundColor: '$textBoxColor',
    borderBottomWidth: 1,
    borderBottomColor: '$defaultColor',
  },
  text: {
    marginLeft: 3,
  },
  block: {
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$optionColor',
    flexGrow: 1,
    borderRightWidth: 1,
    borderRightColor: '$defaultColor',
  },
  blockActive: {
    backgroundColor: '$textBoxColor',
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  return {
    day: state.currentDay,
  }
}, mapDispatchToProps)(Schedule);