import { Text, TouchableOpacity, View, AsyncStorage, BackHandler } from "react-native";
import React from "react";
import { serverAddress } from '../config.json';
import axios from "axios";
import styles from "../styles/profilescreenstyles";
import { BottomBarButton } from '../components/BottomBarButton'

interface Props {
  navigation: any
}


export default class ProfileScreen extends React.Component<Props>{
  state = {
    username: "",
    user_uuid: null
  }

  componentDidMount() {
    axios.get(`${serverAddress}/users/${this.state.user_uuid}`)
      .then((res) => {
        this.setState({ username: res.data.username })
      })
      .catch((err) => {
        console.debug("error getting user info")
        console.debug(err)
      })

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPressAndroid);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonPressAndroid)
  }

  handleBackButtonPressAndroid = () => {
    if (!this.props.navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    }
    this.props.navigation.navigate('Home')
    return true;
  }

  constructor(props) {
    super(props);
    this.state.user_uuid = this.props.navigation.getParam('user_uuid', null);
  }

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.infoContainer}>
          <Text style={styles.usernameText}>{this.state.username}</Text>
          {/* <Text style={styles.phoneText}>(444) - 444 - 4444</Text> */}
        </View>


        <View style={styles.btnContainer}>
          <Text style={styles.btnText}>View Stats</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.signUpContainer} onPress={() => { this.props.navigation.navigate("CreateQuiz", { "user_uuid": this.state.user_uuid }) }}>
            <Text style={styles.btnText}>Create New Game</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <Text style={styles.btnText}>Quizzes</Text>
        </View>
        <BottomBarButton buttonText={"LOG OUT"} onPress={() => {
          AsyncStorage.setItem("id", "").then(
            this.props.navigation.navigate("Home"));
        }} />

      </View>
    );
  }
}
