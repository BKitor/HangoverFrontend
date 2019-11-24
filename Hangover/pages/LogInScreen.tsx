import React from 'react';
import {View, Text, StyleSheet, Image, Animated, TouchableOpacity, TextInput, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import {ACCENT_GRAY, PRIMARY_DARK,  DEBUG, PRIMARY_LIGHT, SECONDARY, FONT, serverAddress} from '../styles/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import styles from "../styles/loginscreenstyles";

interface Props {
    navigation: any
}

export default class LogInScreen extends React.Component<Props> {
    state = {
        username: '',
        password: '',
        uuid: '',
        isLoggedIn: false
    };

    constructor(props){
        super(props);
        this.attemptLogin = this.attemptLogin.bind(this);
    }

    componentDidMount(){
        AsyncStorage.getItem("id").then((value) => {
            if (value){
                this.props.navigation.navigate("Profile");     
            }
        }).catch((error)=>{return});
    }

    // Is run in the constructor to attempt to auto-login the user if they are currently logged in
    attemptLogin(){
        console.debug("Attempting to retrieve user information for: " + this.state.uuid);
        axios.get(serverAddress + '/users/' + this.state.uuid)
            .then(res => {
            //once it works.
            //once it works.
            console.debug("Trying to set internal userUUID value to: " + this.state.uuid);
            AsyncStorage.setItem("id", res.data.uuid).then(() => {
                console.debug("Set internal userUUID value to " + this.state.uuid);
                this.checkLogin.bind(this);
            });
        });
    }

    // Is run when the CONTINUE button is pressed
    checkLogin(){
        console.log("Checking to see if there is already a value for userUUID");
        //this.debugAsyncStorage();
        AsyncStorage.getItem("id").then((value) => {
            if(value == null || value == "") { // The user is not currently logged in (or has never been)
                console.debug("There is no value at userUUID");
                if(this.state.username == null || this.state.username == ""){
                    console.debug("Username must not be empty");
                    return;
                }
                axios.get(serverAddress + '/users/' + this.state.username)
                .then(res => {
                    if(res.status != 200){
                        console.debug("Bad request");
                        return;
                    }
                    if(res.data['password'] == this.state.password){
                        AsyncStorage.setItem("id", res.data['id']).then(value =>
                        this.setState({uuid: value, isLoggedIn: true}),
                        this.props.navigation.navigate("Profile"))
                    } else {
                        console.log("Incorrect password");
                    }
                })
                .catch((error)=>{
                    console.debug(error);
                    console.debug("User not found");
                });
            } else {
                console.debug("There is a value at userUUID, redirecting to player");
            }
        });
    }

    // Prints out all contents of the user's local storage
    debugAsyncStorage(){
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (error, stores) => {
                stores.map((result, i, store) => {
                    console.debug({ [store[i][0]]: store[i][1] });
                    return true;
                });
            });
        });
    }


    render() {
        return (
            <View style={styles.background}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>LOG IN</Text>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.fieldContainer}>
                        <Icon name="user-circle" size={wp(13)} color={PRIMARY_DARK}/>
                        <TextInput style={styles.usernameInput} placeholder="Username" onChangeText={text => this.setState({username: text})}/>
                    </View>
                    <View style={styles.fieldContainer}>
                        <Icon name="lock" size={wp(16)} color={PRIMARY_DARK}/>
                        <TextInput style={styles.passwordInput} secureTextEntry={true} onChangeText={text => this.setState({password: text})} placeholder="Password" />
                    </View>
                </View>

                <TouchableOpacity style={styles.btnContainer} onPress={this.checkLogin.bind(this)}>
                    <Text style={styles.btnText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        )
    }
}