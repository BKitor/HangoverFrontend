import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    FlatList,
    AsyncStorage,
} from 'react-native';
import {ACCENT_GRAY, PRIMARY_DARK,  DEBUG, PRIMARY_LIGHT, SECONDARY, FONT, BASE, serverAddress} from '../styles/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp, heightPercentageToDP} from "react-native-responsive-screen";
import * as Font from 'expo-font'
import styles from "../styles/questionhostscreen.js";
import axios from 'axios';

interface Props {
    navigation: any
}

export default class QuestionHostScreen extends React.Component<Props> {
    state = {
        question_id: null,
        game_name: null,
        question: null,
        loading: true,
        questionsLocked: false,
    };

    componentWillMount(){
        AsyncStorage.getItem("game_name")
        .then((name) => this.setState({game_name: name}));
        AsyncStorage.getItem("question_id")
        .then((id) => this.getQuestionID(id))
        .then(() => axios.get(serverAddress + "/questions/" + this.state.question_id))
        .then((res) => this.setState({question: res.data, loading: false}))
        .catch((err) => console.debug(err))
        .then(() => this.render());

    }

    getQuestionID(id){
        if(id == null){
            AsyncStorage.getItem("id")
            .then((id) => axios.put(serverAddress + "/game/" + this.state.game_name + "/next_question", {user_id: id}))
            .then((res) => {
                this.setState({question_id: res.data.current_question})
                AsyncStorage.setItem("question_id", res.data.current_question)
            })
            .catch((err) => console.debug(err))
            .then(() => {return})
        } else{
            axios.get(serverAddress + "/game/" + this.state.game_name)
            .then((res) => this.setState({question_id: res.data.current_question}))
            .catch((err) => console.debug(err))
            .then(() => {return})
        }
    }

    render() {

        if(this.state.loading){
            console.debug(this.state);
            return (
                <View style={styles.background}>
                    <View style={styles.loadingTitleContainer}>
                        <Text style={styles.titleText}>Loading Question....</Text>
                    </View>
                </View>
            );
        }
        
        return (
            
            <View style={styles.background}>
                <View style={styles.promptContainer}>
                    <Text style={styles.titleText}>{this.state.question.prompt}</Text>
                </View>
                <TouchableOpacity style={styles.bigBtnContainer} onPress={() => {this.props.navigation.navigate("")}}>
                    <Text style={styles.bigBText}>{this.state.questionsLocked ? "LOCKED" : "LOCK THE ANSWERS"}</Text>
                </TouchableOpacity>
            </View>

        );

    }
}