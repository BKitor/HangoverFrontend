// import axiosCfg from "../config"
import axios from 'axios';
import React from 'react';
import {
  Alert,
  Animated,
  AsyncStorage,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from "../styles/homescreenstyles.js";
import { NavigationEvents } from 'react-navigation';
import { DEBUG } from '../config.json'
import { ACCENT_GRAY } from '../styles/common'

interface Props {
  navigation: any
}

export default class HomeScreen extends React.Component<Props> {
  state = {
    animation: new Animated.Value(0),
    loginButtonText: null,
    loginButtonNavigate: null,
    user_uuid: null,
  };

  startAnimation() {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: (DEBUG ? 0 : 1500)
    }).start();
  }

  _handleBackButtonPressAndroid = () => {
    if (!this.props.navigation.isFocused()) {
      return false;
    }
    Alert.alert(
      "Exit App?",
      "Are you sure you want to exit the app?",
      [
        { text: 'Exit', onPress: BackHandler.exitApp },
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
      ]
    )
    return true;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackButtonPressAndroid)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackButtonPressAndroid)

    //DELETEME
    this.props.navigation.navigate("HostGame", {
      host_uuid: "ab1ff2ed-1c46-4b1a-b4a8-f46bc60cadb5",
      quiz_uuid: "37b527e0-37b4-4aa6-ac1d-cde49953880b",
      game_name: null
    })
    //DELETEME
  }

  componentWillMount() {
    this.startAnimation();
    this.checkLoggedIn();
  }

  componentDidUpdate() {
    this.checkLoggedIn();
  }

  // Calls componentDidUpdate() which results in an infinite loop
  checkLoggedIn() {
    AsyncStorage.getItem("id").then((value) => {
      if (value == null || value == "") {
        // console.debug("There is no value at userUUID, this is a new player");
        this.setState({ loginButtonText: "LOG IN", loginButtonNavigate: "LogIn" });
        return;
      }
      else {
        // console.debug("There is a value at userUUID, redirecting to player");
        this.setState({
          loginButtonText: "ACCOUNT",
          loginButtonNavigate: "Profile",
          user_uuid: value
        })
      }
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.background} behavior={'padding'} enabled>
        <NavigationEvents
          onWillFocus={payload => this.checkLoggedIn()}
        />
        <View style={styles.imageContainer}>
          <Image source={require('../assets/hangover.png')} />
        </View>
        <View style={styles.codeContainer}>
          <TextInput
            style={styles.codeInput}
            placeholder="ROOM CODE"
            autoCapitalize="none"
            onSubmitEditing={({ nativeEvent }) => this.checkRoomCode(nativeEvent.text)}
            placeholderTextColor={ACCENT_GRAY} />
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.loginContainer} onPress={() => { this.props.navigation.navigate(this.state.loginButtonNavigate, { 'user_uuid': this.state.user_uuid }) }}>
            <Text style={styles.loginText}>{this.state.loginButtonText}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpContainer} onPress={() => { this.props.navigation.navigate("SignUp") }}>
            <Text style={styles.signUpText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }

  checkRoomCode(text) {//check to see if the room code is valid and auto join
    axios.get(`http:tixo.ca:7537/game/${text}`).then((res) => {
      // console.log(res.data)
      this.props.navigation.push("JoinGame", res.data);//TODO:: impliment navigaiton
    }).catch((res) => {
      Alert.alert(
        "Bad room name",
        `${text} doesn't exist`,
        [
          {
            text: "close",
            onPress: () => { }
          }
        ],
        { cancelable: false }
      )
    })
  }
}
