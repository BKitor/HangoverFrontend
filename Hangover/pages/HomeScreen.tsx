import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Animated,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';
import {ACCENT_GRAY, PRIMARY_DARK,  DEBUG, PRIMARY_LIGHT, SECONDARY, FONT} from '../styles/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import * as Font from 'expo-font'
import styles from "../styles/homescreenstyles.js";

interface Props {
    navigation: any
}

export default class HomeScreen extends React.Component<Props> {
    state = {
        animation : new Animated.Value(0),
        loginButtonText: null,
        loginButtonNavigate: null,
    };

    startAnimation(){
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: (DEBUG ? 0 : 1500)
        }).start();
    }

    componentWillMount(){
        this.startAnimation();
        this.checkLoggedIn();
    }

    componentDidUpdate(){
        console.debug("componentDidUpdate()");
        //this.checkLoggedIn(); 
    }

    // Calls componentDidUpdate() which results in an infinite loop
    checkLoggedIn(){
        AsyncStorage.getItem("userUUID").then((value) => {
            if(value == null) {
                console.debug("There is no value at userUUID, this is a new player");
                this.setState({loginButtonText: "LOG IN", loginButtonNavigate: "LogIn"});
                return;
            }
            console.debug("There is a value at userUUID, redirecting to player");
            this.setState({loginButtonText: "ACCOUNT", loginButtonNavigate: "Profile"})
        });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.background} behavior={'padding'} enabled>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/hangover.png')} />
                </View>
                    <View style={styles.codeContainer}>
                        <TextInput
                            style={styles.codeInput}
                            placeholder="ROOM CODE"
                            autoCapitalize="none"
                            onChangeText={(text) => this.checkRoomCode(text)}
                            placeholderTextColor = {ACCENT_GRAY}/>
                    </View>

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.loginContainer} onPress={() => {this.props.navigation.navigate(this.state.loginButtonNavigate)}}>
                        <Text style={styles.loginText}>{this.state.loginButtonText}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signUpContainer} onPress={() => {this.props.navigation.navigate("SignUp")}}>
                        <Text style={styles.signUpText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }

    checkRoomCode(text){//check to see if the room code is valid and auto join

    }
}
