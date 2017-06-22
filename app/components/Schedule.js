import React, { Component } from 'react';
import ReactNative from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { connect } from 'react-redux';
const {
  View,
  Text,
} = ReactNative;

class Schedule extends Component{
  createBlockArray = (blockArray) => {
    let counter = 0;
    let blocks = [];
    blockArray.forEach((item) => {
      let styling = [styles.block];
      if(item === this.props.block){
        styling.push({backgroundColor: '#F6F7F8'});
      }
      if(counter == 5){
        styling.push({borderRightWidth: 0});
      }
      blocks[counter] = <View key={counter} style={styling}><Text>{item}</Text></View>;
      counter++;
    });
    console.log("Block Array: ",blocks);
    return blocks;
  };

  render(){
    const blocks = this.createBlockArray(this.props.schedule);
    return(
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.title}>Schedule</Text>
          <Text style={styles.text}>It is a day: {this.props.day}</Text>
        </View>
        <View style={styles.schedule}>
          {blocks}
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
    padding: 7,
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
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  return {
    day: state.currentDay,
    schedule: state.blockSchedule,
    block: state.currentBlock,
  }
}, mapDispatchToProps)(Schedule);