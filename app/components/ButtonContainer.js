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

class ButtonContainer extends Component{
  props: {
    title: string,
    text: string,
    buttonText: string,
    onPress: () => any,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  render(){
    const{
      title,
      text,
      buttonText,
      onPress,
    } = this.props;

    return(
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.button}>
          <Button title={buttonText} onPress={onPress}/>
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