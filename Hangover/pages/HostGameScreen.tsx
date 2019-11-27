import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    AsyncStorage,
} from 'react-native';
import {ACCENT_GRAY, PRIMARY_DARK,  DEBUG, PRIMARY_LIGHT, SECONDARY, FONT, BASE, serverAddress} from '../styles/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp, heightPercentageToDP} from "react-native-responsive-screen";
import * as Font from 'expo-font'
import styles from "../styles/hostgamescreen.js";
import axios from 'axios';

interface Props {
    navigation: any
}

export default class HomeScreen extends React.Component<Props> {
    state = {
        game: null,
        quiz: null,
        loading: true,
    };

    componentWillMount(){
        AsyncStorage.getItem("game_name")
        .then((name) => axios.get(serverAddress + "/game/" + name))
        .then((res) => this.setState({game: res.data}))
        .then(() => axios.get(serverAddress + "/quizzes/" + this.state.game.quiz))
        .then((res) => this.setState({quiz: res.data, loading: false}))
        .then(() => axios.post(serverAddress + "/game/" + this.state.game.game_name,
        {user_id: this.state.game.host,
        player_name: "Host Name"}))
        .then(() => this.render());
    }

    update(){
        let that = this;
        setTimeout(function () {
            that.refreshGame();
          }, 5000);
    }

    async refreshGame(){
        axios.get(serverAddress + "/game/" + this.state.game.game_name)
        .then((res) => this.setState({game: res.data}));
    }

    renderPlayers(){
        let toRender = [];
        for(const element of this.state.game.players)
            toRender.push(<PlayerBubble uuid={element}></PlayerBubble>);
        return toRender;
    }

    render() {

        if(this.state.loading){
            return (
                <View style={styles.background}>
                    <View style={styles.loadingTitleContainer}>
                        <Text style={styles.titleText}>Loading....</Text>
                    </View>
                </View>
            );
        }

        this.update();

        return (
            
            <View style={styles.background}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{this.state.game.game_name}</Text>
                    <Text style={styles.headerText}>PLAYERS JOINED</Text>
                </View>
                <ScrollView style={styles.playerBubblesContainer}>
                    {this.renderPlayers()}
                </ScrollView>
                <TouchableOpacity style={styles.bigBtnContainer} onPress={() => {this.props.navigation.navigate("QuestionHost")}}>
                    <Text style={styles.bigBText}>PLAY</Text>
                </TouchableOpacity>
            </View>

        );

    }
}

class PlayerBubble extends React.Component{

    state={
        uuid: "",
        game_name: "",
    };

    constructor(props){
        super(props);
        this.setState({uuid: props.uuid});
        this.getPlayerName(props.uuid);
        
    }

    getPlayerName(uuid){
        axios.get(serverAddress + "/api/players/" + uuid)
        .then((res) => res.data)
        .then((player) => player.player_name)
        .then((name) => this.setState({game_name: name}))
        .then(() => this.render())
        .catch((err) => console.debug(err));
    }

    render(){
        return(
            <View style={styles.playerBubbleContainer}>
                <Image source={require("../assets/icon.png")} style={styles.playerIcon}></Image>
                <Text style={styles.playerBubbleName}>{this.state.game_name}</Text>
            </View>
        )
    }
}