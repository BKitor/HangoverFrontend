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
import { DEBUG, serverAddress } from '../config.json'
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
    // this.props.navigation.navigate("GameSummary", {
    //   game: {
    //     "uuid": "be5c42bf-df25-4146-8369-930f167daf66",
    //     "game_name": "G",
    //     "archived": false,
    //     "quiz": "45f62b2d-586d-4001-881e-67e5f13266dd",
    //     "host": "a7777139-4208-402f-8b33-c52bf73b8cdb",
    //     "current_question": null,
    //     "players": [
    //       "7a110ac5-db85-47c7-aae1-a3fa5c339f18",
    //       "9f158fd9-9e0c-49d2-87f3-ca156da52566"
    //     ],
    //     "unanswered_questions": [],
    //     "answered_questions": [
    //       "591bebe5-be3d-4af7-a140-ce5c36187b4b",
    //       "95077ed4-a6e4-4660-a233-e71a8e48e358"
    //     ]
    //   },
    //   host_ws: new WebSocket(`ws://${serverAddress.slice(7)}/ws/game/G/host`),
    //   isHost: true,
    // })
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
    axios.get(`${serverAddress}/game/${text}`).then((res) => {
      this.props.navigation.push("JoinGame", res.data);
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
