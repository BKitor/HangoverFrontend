import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    FlatList,
    AsyncStorage,
} from 'react-native';
import {ACCENT_GRAY, PRIMARY_DARK,  DEBUG, PRIMARY_LIGHT, SECONDARY, FONT, BASE, serverAddress} from '../styles/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp, heightPercentageToDP} from "react-native-responsive-screen";
import * as Font from 'expo-font'
import styles from "../styles/savedquizzesscreen.js";
import axios from 'axios';

interface Props {
    navigation: any
}

export default class SavedQuizzes extends React.Component<Props> {
    state = {
        uuid: null,
        quizzes: [],
        opacities: [],
    };

    componentWillMount(){
        AsyncStorage.getItem("id")
        .then((value) => {
            if(value == null || value == "")
                console.debug("No user uuid found in storage");
            else
                this.setState({uuid: value});
        })
        .then(() => axios.get(serverAddress + '/users/' + this.state.uuid + '/quizzes/'))
        .then(res => {
            if(res.status != 200){
                console.debug("Bad request, response status: " + res.status);
                return;
            }
            this.setState({quizzes: this.fixData(res.data)});
        })
        .then(() => this.render());
    }

    fixData(data){
        let newData = [];
        for(let i=0; i<data.length; i++){
            newData.push({"key": data[i].uuid, "name": data[i].name});
        }

        return [
        {key:"blank1"},
        {key:"blank2"},
         ...newData,
         {key:"blank3"},
         {key:"blank4"}];
    }

    getOpacity(){
        return 1;
        if (this.state.opacities.length == 0)
            return 0.2;
        return this.state.opacities[this.state.opacities.length-1]+0.1
    }

    renderQuiz(quiz){
        if(quiz.name == null){
            return(
                <View style={styles.blankSpace}>
                </View>
            )
        } else {
            this.state.opacities.push(this.getOpacity());
            return(
                <View style={{opacity: this.state.opacities[this.state.opacities.length-1]}}>
                    <TouchableOpacity key={quiz.uuid} style={styles.quizContainer} onPress={(e) => this.quizSelected(e,quiz)}>
                        <Text style={styles.quizText}>{quiz.name}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    quizSelected(e, quiz){
        console.debug(quiz.name + " selected");
        this.createNewGame(quiz);
    }

    createNewGame(quiz){
        const formData = {
            "host_uuid": this.state.uuid,
            "quiz_uuid": quiz.key,
            "game_name": "Game Name"// how are game names being added? Pop up?
        }
        
        axios({
            method: 'post',
            url: serverAddress+'/api/games',
            data: formData,
        })
        .then(() => {
            AsyncStorage.setItem("game_name", "Game Name")
        })
        .then(() => {
            this.props.navigation.navigate("HostGame")
        });
    }

    handleScroll(){
        return;
        for(let quiz of this.state.opacities){
            //console.debug(quiz.props.style);
            //console.debug("****************************************************");
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.background} behavior={'padding'} enabled>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>SAVED QUIZZES</Text>
                </View>
                <SafeAreaView style={styles.listContainer}>
                    <FlatList
                        data={this.state.quizzes}
                        getItemLayout={(data, index) => (
                            {
                            length: styles.quizContainer.height,
                            offset: (styles.quizContainer.height+styles.quizContainer.marginBottom)*(index-2),
                            index
                        })}
                        showsVerticalScrollIndicator={false}
                        onScroll={(event) => this.handleScroll()}
                        renderItem={({ item }) => this.renderQuiz(item)}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}