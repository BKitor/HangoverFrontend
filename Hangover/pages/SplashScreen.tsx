import React from 'react';
import { View, Text,  StyleSheet, Image, Animated} from 'react-native';
import {ACCENT_GRAY, DEBUG, PRIMARY_LIGHT, FONT} from '../styles/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

interface Props {
    navigation: any
}

export default class SplashScreen extends React.Component<Props> {
    state = {
        animation : new Animated.Value(0),

    };

    startAnimation(){
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: (DEBUG ? 0 : 1000),
            delay: (DEBUG ? 0 : 1000)
        }).start(() => {
            Animated.timing(this.state.animation, {
                toValue: 0,
                duration: (DEBUG ? 0 : 1000),
                delay: (DEBUG ? 0 : 2000)
            }).start(() => {this.props.navigation.navigate("Warning")});
        });

    }

    componentWillMount(){
        this.startAnimation();
    }

    render() {
        const animatedStyle = {
            opacity: this.state.animation
        };

        return (
            <View style={styles.background}>
                <Animated.View style={[styles.titleContainer, animatedStyle]}>
                    <Image source={require('../assets/hangover.png')} />
                    <Text style={styles.title}>HANGOVER</Text>
                </Animated.View>
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
    }
});