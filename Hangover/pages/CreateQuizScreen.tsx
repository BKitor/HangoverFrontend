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
import styles from "../styles/createquizscreenstyles.js";

interface Props {
    navigation: any
}

export default class CreateQuizScreen extends React.Component<Props> {
    state = {};

    render() {
        return (
            <KeyboardAvoidingView style={styles.background} behavior={'padding'} enabled>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>CREATE NEW QUIZ</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/hangover.png')} />
                </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.makeOwnContainer} onPress={() => {this.props.navigation.navigate("MakeNewQuiz")}}>
                            <Text style={styles.makeOwnText}>Make Your Own</Text>
                        </TouchableOpacity>
                    </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.useSavedContainer} onPress={() => {this.props.navigation.navigate("SavedQuizzes")}}>
                        <Text style={styles.useSavedText}>Use a Saved Quiz</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
