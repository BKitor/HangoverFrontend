import React from 'react';
import {View, Text, StyleSheet, Image, Animated, TouchableOpacity, TextInput} from 'react-native';
import {ACCENT_GRAY, PRIMARY_DARK,  DEBUG, PRIMARY_LIGHT, SECONDARY, FONT} from '../styles/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import * as Font from 'expo-font'

interface Props {
    navigation: any
}

export default class SignUpScreen extends React.Component<Props> {
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: ACCENT_GRAY,
        alignItems: 'center'
    },
});