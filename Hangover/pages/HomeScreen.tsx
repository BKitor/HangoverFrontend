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
        this.checkLoggedIn();
    }

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

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: PRIMARY_LIGHT,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: hp(15)
    },
    codeContainer: {
        marginTop: hp(5),
        width: wp(80),
        height: hp(12),
        borderRadius: hp(2.1),
        backgroundColor: SECONDARY,
        alignItems: 'center',
        justifyContent: 'center',
    },
    codeInput: {
        fontFamily: FONT,
        color: ACCENT_GRAY,
        fontSize: hp(7.2),
        textAlign: 'center'
    },
    loginContainer: {
        width: wp(40),
        height: hp(7),
        backgroundColor: PRIMARY_DARK,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp(2),
        marginLeft: hp(1),
        marginRight: wp(5)
    },
    signUpContainer: {
        width: wp(40),
        height: hp(7),
        backgroundColor: ACCENT_GRAY,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp(2),
    },
    btnContainer: {
        flexDirection: 'row',
        width: wp(90),
        alignItems: 'center',
        marginTop: hp(10)
    },
    loginText: {
        fontFamily: FONT,
        fontSize: wp(7),
        color: ACCENT_GRAY,
        textAlign: 'center'
    },
    signUpText: {
        fontFamily: FONT,
        fontSize: wp(7),
        color: PRIMARY_DARK,
        textAlign: 'center'
    },
});