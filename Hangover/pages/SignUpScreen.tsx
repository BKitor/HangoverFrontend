import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import { PRIMARY_DARK } from '../styles/common';
import { serverAddress } from '../config.json'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import styles from "../styles/signupscreenstyles";


interface Props {
  navigation: any
}

/*
*
* UX is username / phone / password while backend is email / first / last / password / username
* */

export default class SignUpScreen extends React.Component<Props> {

  state = {
    username: '',
    phone: '',
    password: ''
  };


  createNewAccount() {
    const formData = {
      email: `TEST${Date.now()}@queensu.ca`,
      username: `${this.state.username}`,
      password: `${this.state.password}`,
      first_name: "TEST",
      last_name: "TEST",
      date_joined: "2019-10-20T00:00",
      last_joined: "2019-10-20T00:00",
    };


    axios.post(`${serverAddress}/users/create/`, formData)
      .then((res) => {
        AsyncStorage.setItem("id", res.data.id);
        console.log("Set async storage to the user ID: " + res.data.id);
        this.props.navigation.pop();
      }).catch((error) => {
        console.log("error creating user");
        console.log(error);
      });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.background} enabled>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>SIGN UP</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.fieldContainer}>
            <Icon name="user-circle" size={wp(13)} color={PRIMARY_DARK} />
            <TextInput style={styles.usernameInput} onChangeText={(text) => this.setState({ username: text })} placeholder="Username" />
          </View>
          <View style={styles.fieldContainer}>
            <Icon name="phone" size={wp(13)} color={PRIMARY_DARK} />
            <TextInput style={styles.usernameInput} onChangeText={(text) => this.setState({ phone: text })} placeholder="Phone Number" />
          </View>
          <View style={styles.fieldContainer}>
            <Icon name="lock" size={wp(16)} color={PRIMARY_DARK} />
            <TextInput style={styles.passwordInput} secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} placeholder="Password" />
          </View>
        </View>

        <TouchableOpacity style={styles.btnContainer} onPress={() => { this.createNewAccount() }}>
          <Text style={styles.btnText}>CONTINUE</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}