import React from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { DEBUG } from '../config.json'
import styles from "../styles/splashscreenstyles"

interface Props {
    navigation: any
}

export default class SplashScreen extends React.Component<Props> {
    state = {
        animation: new Animated.Value(0),

    };

    startAnimation() {
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: (DEBUG ? 0 : 1000),
            delay: (DEBUG ? 0 : 1000)
        }).start(() => {
            Animated.timing(this.state.animation, {
                toValue: 0,
                duration: (DEBUG ? 0 : 1000),
                delay: (DEBUG ? 0 : 2000)
            }).start(() => { this.props.navigation.navigate("Warning") });
        });

    }

    componentWillMount() {
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