import React, { Component } from 'react';
import ReactNative from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
const {
  View,
  Text,
  Button,
} = ReactNative;

class Timer extends Component{
  props: {
    countUp: boolean,
    startTime: number,
    text: string,
    //onPress: () => any,
  };

  static propTypes = {
    countUp: PropTypes.bool.isRequired,
    startTime: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    //onPress: PropTypes.func,
  };

  state = {time: 0, start: 0};

  componentDidMount(){
    const today = new Date();
    const startTime = today.getTime();
    this.setState({time: this.timeToString(this.props.startTime), start: startTime});
    if(this.props.active != false) {
      setInterval(this.countUp, 1000);
    }
  };

  countDown = (today) => {
    const now = new Date();
    const nowTime = now.getTime();
    const timeDiff = 9;
    this.setState({})
  };

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

  countUp = () => {
    const today = this.state.start;
    const now = new Date();
    const nowTime = now.getTime();
    const timeDiff = Math.floor((nowTime - today)/1000);
    console.log("Now: ",nowTime+", today: ",today+", Diff: ", timeDiff);
    this.setState({time: this.timeToString(timeDiff)});
  };

  render(){
    let{
      countUp,
      startTime,
      text,
      onPress,
    } = this.props;

    return(
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.title}>Timer</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.timer}>
          <Text>{this.state.time}</Text>
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
  timer: {
    padding: 5,
    alignSelf: 'stretch',
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  return {}
}, mapDispatchToProps)(Timer);