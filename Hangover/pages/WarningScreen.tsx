import React from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { DEBUG } from '../config.json'
import styles from '../styles/warningscreenstyles.js';

interface Props {
    navigation: any
}

export default class WarningScreen extends React.Component<Props> {
    state = {
        animation: new Animated.Value(0)
    };

    startAnimation() {
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: (DEBUG ? 0 : 1500)
        }).start();
    }

    componentWillMount() {
        this.startAnimation();
        if (DEBUG)
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

                <TouchableOpacity style={styles.btnContainer} onPress={() => { this.props.navigation.navigate("Home") }}>
                    <Text style={styles.btnText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        )
    }
}