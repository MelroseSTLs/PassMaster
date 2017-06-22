import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';

import { ActionCreators } from '../actions';
import { handleLogIn } from '../lib/database';

class Login extends Component {
  state = {topText: "Welcome Stranger!", bottomText: "Please log in to continue", shouldDisplay: false};

  componentWillMount() {
    console.log("Mounting Login, Initial State: "+this.props.initial);
    if(this.props.initial != false){
      console.log("Initial State isnt false");
      const wait = () => {
        console.log("Checking Log State: "+this.props.logState);
        if(this.props.stateLoading){
          setTimeout(wait, 100);
        }else{
          if(this.props.logState){
            Actions.App();
          }else{
            this.setState({shouldDisplay: true});
          }
        }
      };
      wait();
    }else{
      this.setState({shouldDisplay: true});
    }
  };

  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    console.log("User: ",JSON.parse(decodeURI(user_string)));
    console.log(this);
    const user = JSON.parse(decodeURI(user_string));
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
    if(user.valid) {
      this.props.setUser(user.name, user.id, user.avatar, user.email);
      Actions.App();
      handleLogIn(user.id, user.name)
        .then((result) => {
          console.log("Log In Result: ",result);
        })
        .catch((err) => {
          console.log("Log In Error: ",err);
        })
    }else{
      this.props.resetUser();
      this.setState({topText: "Invalid Email",bottomText: "Please use a Melrose Public Schools email"})
    }
  };

  // Handle Login with Google button tap
  loginWithGoogle = () => this.openURL('http://localhost:3000/auth/google');

  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

  render() {

    if(this.state.shouldDisplay) {
      return (
          <View style={styles.container}>
            { this.props.logState
              ? // Show user info if already logged in
                <View style={styles.content}>
                    <Text style={styles.header}>
                        Welcome {this.props.userName}!
                    </Text>
                    <View style={styles.avatar}>
                        <Image source={{ uri: this.props.avatar }} style={styles.avatarImage}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => Actions.App()}
                            title="Continue"
                            color="#3b5998"
                            accessibilityLabel="Continue to main content"
                        />
                    </View>
                </View>
              : // Show Please log in message if not
                <View style={styles.content}>
                    <Text style={styles.header}>
                      {this.state.topText}
                    </Text>
                    <View style={styles.avatar}>
                        <Icon name="user-circle" size={100} color="rgba(0,0,0,.09)"/>
                    </View>
                    <Text style={styles.text}>
                      {this.state.bottomText}
                    </Text>
                </View>
            }
            {/* Login buttons */}
              <View style={styles.buttons}>
                  <Icon.Button
                      name="google"
                      backgroundColor="#DD4B39"
                      onPress={this.loginWithGoogle}
                    {...iconStyles}
                  >
                      Log In With Google
                  </Icon.Button>
              </View>
          </View>
      );
    }else{
      return(
          <View style={styles.loading}>
              <Text style={{alignSelf: "center"}}>Loading</Text>
          </View>
      )
    }
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = EStyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
  $size: 50,
  buttonContainer: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    padding: 5,
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  return {
    logState: state.logState,
    userName: state.userName,
    avatar: state.userAvatar,
    stateLoading: state.asyncInitialState.loading,
  }
}, mapDispatchToProps)(Login);