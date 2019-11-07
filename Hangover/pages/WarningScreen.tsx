import React from 'react';
import {View, Text, StyleSheet, Image, Animated, TouchableOpacity} from 'react-native';
import {ACCENT_GRAY, PRIMARY_DARK,  DEBUG, PRIMARY_LIGHT, FONT} from '../styles/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import * as Font from 'expo-font'

interface Props {
    navigation: any
}

export default class WarningScreen extends React.Component<Props> {
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
        if(DEBUG)
            this.props.navigation.navigate("Home");
    }

    render() {
        return (
            <View style={styles.background}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>WARNING</Text>
                </View>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>
                        We at Hangover encourage good times and
                        responsible drinking. Please ensure you
                        are not drinking and driving while using
                        this app
                    </Text>
                </View>

                <TouchableOpacity style={styles.btnContainer} onPress={() => {this.props.navigation.navigate("Home")}}>
                    <Text style={styles.btnText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: PRIMARY_LIGHT,
    },
    titleContainer:{
        alignItems: 'center',
        marginTop: hp(20),
    },
    title: {
        fontFamily: FONT,
        fontSize: wp(15),
        color: ACCENT_GRAY
    },
    subtitleContainer: {
        alignItems: 'center',
        marginTop: hp(5)
    },
    btnContainer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(10),
        backgroundColor: PRIMARY_DARK,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontFamily: FONT,
        fontSize: wp(7),
        color: ACCENT_GRAY,
    },
    subtitle: {
        fontFamily: FONT,
        fontSize: wp(7),
        color: ACCENT_GRAY,
        textAlign: 'center',
        width: wp(75)
    }
});