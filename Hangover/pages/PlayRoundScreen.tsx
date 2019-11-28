import React from 'react';
import { View, Text, KeyboardAvoidingView, ImageBackground, StyleSheet, Alert } from 'react-native';
import styles from '../styles/playroundscreenstyles';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReactPolling from 'react-polling';
import {serverAddress} from '../styles/common';



interface Props {
  navigation: any
}

export default class PlayRoundScreen extends React.Component<Props>{
  state = {
    game: null,
    answers: ["answer 1", "smlansr", "answer 4", "A literal wall of text because we should test for it"],
    responseText: null,
    player_uuid: null,
    question: { prompt: "", uuid: "" },
  }

  constructor(props) {
    super(props);
    this.state.game = this.props.navigation.getParam('game', null);
  }

  componentWillUnmount() {
    if (this.state.player_uuid) {
      axios.delete(`${serverAddress}/game/${this.state.game.game_name}`, { data: { player_id: this.state.player_uuid } })
        .then(() => { })
        .catch((err) => {
          console.log(err);
          console.log(err.request)
        });
    }
  }

  componentDidMount() {
    axios.get(`${serverAddress}/game/${this.state.game.game_name}/players`)
      .then((res) => {
        this.setState({
          players: res.data.slice(0, 4)
        })
      })
      .catch((res) => {
        console.log("Couldnt reach /game/<>/players")
        console.log(res.message)
        this.props.navigation.goBack()
      });
    this.updateQuestion(this.state.game.current_question);
  }

  submitAnswer() {
    console.log(this.state.responseText);
    // TODO: Build out the answer functionality
  }

  updateQuestion(questionUUID) {
    axios.get(`${serverAddress}/questions/${questionUUID}`)
      .then((res) => {
        this.setState({ question: res.data })
      })
      .catch((err) => {
        console.log(err);
        console.log(err.request);
      });
  }


  pollingUpdate = (res) => {
    if (res.current_question == null) {
      Alert.alert("Game is over", "", [{
        text: "Exit",
        onPress: () => this.props.navigation.goBack()
      }], { cancelable: false })
      return false;
    }
    if (res.current_question != this.state.question.uuid) {
      this.updateQuestion(res.current_question);
    }

    return true
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={'position'}>
        <ImageBackground source={require('../assets/repeated-background.png')} style={styles.backgroundView}>
          <View style={styles.questionTypeContainer}>
            <Text style={styles.questionTypeText}>Free Response</Text>
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{this.state.question.prompt}</Text>
            </View>
          </View>


          <View style={styles.answerDisplayContainer}>
            <_answerDisplay answers={this.state.answers} />
          </View>

          <View style={styles.playerResponseContainer}>
            <TextInput style={styles.submitResponseTextInput}
              maxLength={20}
              placeholder={"Answer..."}
              onChangeText={(text) => this.setState({ responseText: text })}
              onSubmitEditing={() => this.submitAnswer()} />
            <TouchableOpacity style={styles.submitResponseButton} onPress={() => this.submitAnswer()}>
              <Text style={styles.submitResponseButtonText}>SUMBIT</Text>
            </TouchableOpacity>
          </View>

          {/* TODO: Replace with websocket */}
          <ReactPolling
            url={`${serverAddress}/game/${this.state.game.game_name}`}
            interval={3000}
            method={"GET"}
            onSuccess={(res) => this.pollingUpdate(res)}
            onFailure={(res) => console.log(res)}
            render={() => {
              return null
            }}
          />

        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const _answerDisplay = ({ answers }) => {
  return (
    <React.Fragment>
      <View style={styles.answerRow}>
        <_answerContainer text={answers[0]}></_answerContainer>
        <_answerContainer text={answers[1]}></_answerContainer>
      </View>
      <View style={styles.answerRow}>
        <_answerContainer text={answers[2]}></_answerContainer>
        <_answerContainer text={answers[3]}></_answerContainer>
      </View>
    </React.Fragment>
  )
}

const _answerContainer = ({ text }) => {
  return (
    <View style={styles.answerContainer}>
      <Text style={styles.answerText}>{text}</Text>
    </View>
  )
}
