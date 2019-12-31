import React from 'react';
import {
    KeyboardAvoidingView,
} from 'react-native';
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
