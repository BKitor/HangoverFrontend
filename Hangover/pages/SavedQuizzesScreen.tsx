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
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.background} behavior={'padding'} enabled>
            </KeyboardAvoidingView>
        )
    }
}
