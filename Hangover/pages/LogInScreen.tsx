import React from 'react';
import { View, Text, TextInput, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { PRIMARY_DARK, } from '../styles/common';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import styles from "../styles/loginscreenstyles";
import { serverAddress } from '../config.json';
import { BottomBarButton } from '../components/BottomBarButton';

interface Props {
  navigation: any
}

export default class LogInScreen extends React.Component<Props> {
  passwordInputText = null;

  state = {
    username: '',
    password: '',
    uuid: '',
    isLoggedIn: false,
    usernameInput: styles.usernameInput,
    passwordInput: styles.passwordInput,
    badLogInAttempted: false
  };

  constructor(props) {
    super(props);
  }

  // Is run when the CONTINUE button is pressed
  checkLogin() {
    axios.get(`${serverAddress}/users/uname/${this.state.username}`)
      .then((res) => {
        if (res.data.password == this.state.password) {
          console.log("login sucsessflu")
          AsyncStorage.setItem("id", res.data.id)
          this.props.navigation.navigate("Profile", { 'user_uuid': res.data.id })
        }
      })
      .catch((err) => {
        if (err.response && err.response.status == 404) {  // the username doesn't exist
          // haldle unsucsessful login
          this._unsuccessfulLogin()
        }
      })
  }

  _unsuccessfulLogin = () => {
    console.log('login unsucsessful')
    this.setState({
      usernameInput: styles.bad_usernameInput,
      passwordInput: styles.bad_passwordInput,
      password: '',
      badLogInAttempted: true,
    })
  }

  // TODO: add keybaord avoiding view
  render() {
    return (
      <KeyboardAvoidingView style={styles.background} behavior={'height'} >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>LOG IN</Text>
          <Text style={styles.badLoginText}>{this.state.badLogInAttempted ? 'Log in failed, Check your username/password' : ' '}</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.fieldContainer}>
            <Icon name="user-circle" size={wp(13)} color={PRIMARY_DARK} />
            <TextInput
              style={this.state.usernameInput}
              placeholder="Username"
              onChangeText={text => this.setState({ username: text })}
              value={this.state.username}
              returnKeyType={'next'}
              onSubmitEditing={(nativeEvent) => { this.passwordInputText.focus(); }}
              blurOnSubmit={false} />
          </View>
          <View style={styles.fieldContainer}>
            <Icon name="lock" size={wp(16)} color={PRIMARY_DARK} />
            <TextInput
              style={this.state.passwordInput}
              ref={(input) => { this.passwordInputText = input }}
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
              onSubmitEditing={() => { this.checkLogin() }}
              placeholder="Password"
              value={this.state.password}
            />
          </View>
        </View>

        <BottomBarButton onPress={() => this.checkLogin()} buttonText={"LOG IN"} />
      </KeyboardAvoidingView>
    )
  }
}