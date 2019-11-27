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
import Icon from 'react-native-vector-icons/FontAwesome'
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
        let that = this;
        AsyncStorage.getItem("game_name")
        .then((name) => that.setState({game_name: name}));
        AsyncStorage.getItem("question_id")
        .then((id) => that.setQuestionID(id))
        .then(() => axios.get(serverAddress + "/questions/" + that.state.question_id))
        .then((res) => that.setState({question: res.data, loading: false}))
        .catch((err) => console.debug(err))
        .then(() => that.render());
    }

    setQuestionID(id){
        if(id == null){ // this is the first question
            AsyncStorage.getItem("id")
            .then((id) => axios.put(serverAddress + "/game/" + this.state.game_name + "/next_question", {user_id: id}))
            .then((res) => {
                console.debug(res.data);
                this.setState({question_id: res.data.current_question})
                AsyncStorage.setItem("question_id", res.data.current_question)
            })
            .catch((err) => console.debug(err))
        } else{
            this.setState({question_id: id});
        }
    }

    lockAnswers(){
        this.setState({questionsLocked: !this.state.questionsLocked});
    }

    render() {

        if(this.state.loading){
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
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>FILL IN THE BLANK</Text>
                </View>
                <View style={styles.promptContainer}>
                    <Text style={styles.promptText}>{this.state.question.prompt}</Text>
                </View>
                <TouchableOpacity style={styles.bigBtnContainer} onPress={() => {this.lockAnswers()}}>
                    <Icon name={this.state.questionsLocked ? "lock" : "unlock"} size={wp(13)} color={BASE}/>
                    <Text style={styles.bigBText}>{this.state.questionsLocked ? "LOCKED" : "LOCK THE ANSWERS"}</Text>
                </TouchableOpacity>
            </View>

        );

    }
}