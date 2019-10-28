import React from 'react';
import {View, Text, StyleSheet, Image, Animated, TouchableOpacity, TextInput} from 'react-native';
import {ACCENT_GRAY, PRIMARY_DARK,  DEBUG, PRIMARY_LIGHT, SECONDARY, FONT} from '../styles/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import * as Font from 'expo-font'

interface Props {
    navigation: any
}

export default class HomeScreen extends React.Component<Props> {
    state = {
        animation : new Animated.Value(0)
    };

    startAnimation(){
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: (DEBUG ? 0 : 1500)
        }).start();
    }

    componentWillMount(){
        this.startAnimation();
    }

    render() {
        return (
            <View style={styles.background}>
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
                    <TouchableOpacity style={styles.loginContainer} onPress={() => {this.props.navigation.navigate("Login")}}>
                        <Text style={styles.loginText}>LOG IN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signUpContainer} onPress={() => {this.props.navigation.navigate("SignUp")}}>
                        <Text style={styles.signUpText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    checkRoomCode(text){//check to see if the room code is valid and auto join

    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: PRIMARY_LIGHT,
        alignItems: 'center'
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: hp(15)
    },
    codeContainer: {
        alignItems: 'center',
        marginTop: hp(5)
    },
    codeInput: {
        fontFamily: FONT,
        backgroundColor: SECONDARY,
        color: ACCENT_GRAY,
        width: wp(80),
        height: hp(12),
        borderRadius: hp(2),
        fontSize: hp(7.2),
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    signUpText: {
        fontFamily: FONT,
        fontSize: wp(7),
        color: PRIMARY_DARK,
    },
});