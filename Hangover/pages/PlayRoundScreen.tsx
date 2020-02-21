import React from 'react';
import { View, Text, KeyboardAvoidingView, ImageBackground, Keyboard } from 'react-native';
import styles from '../styles/playroundscreenstyles';
import { TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import { serverAddress } from '../config.json';
// import { AnswerList } from '../components/AnswerList';


interface Props {
  navigation: any
}



export default class PlayRoundScreen extends React.Component<Props>{
  state = {
    game: null,
    answers: [], //{answertext:str, playe_uuid:uuid}
    answerText: null,
    player_uuid: null,
    question: { 'propmpt': '' }, // {uuid:'', prompt:''}
    playerws: null,
    questionUnlocked: true,
  }

  constructor(props) {
    super(props);
    this.state.game = this.props.navigation.getParam('game', null);
    this.state.playerws = this.props.navigation.getParam('playerws', null);
    this.state.playerws.onmessage = this._handleWSMessage;
    this.state.player_uuid = this.props.navigation.getParam('player_uuid', null);
  }

  _handleWSMessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case 'game.submit_answer':
        this._updateAnswers(data.payload);
        break;

      case 'game.lock_question':
        this.setState({
          questionUnlocked: !this.state.questionUnlocked
        })
        break;

      case 'game.question_changed':
        if (!this.state.questionUnlocked) {
          this._changeQuestion(data.payload)
        }
        break;
      default:
      // console.error(`bad WS message`);
      // console.error(event)
    }
  }

  _changeQuestion = (question) => {
    this.state.answers = [];
    this.state.questionUnlocked = !this.state.questionUnlocked
    if (question.question_uuid) { // if a next_quesiton exists
      axios.get(`${serverAddress}/questions/${question.question_uuid}`)
        .then((res) => {
          this.setState({
            question: res.data
          })
        })
        .catch((err) => {
          console.error("error updating question")
          console.error(err)
        })
    }
    else {
      // TODO:navigate to end page
      this.setState({
        question: { 'prompt': 'game_over' },
        questionUnlocked: false
      })
    }
  }

  _updateAnswers = (newAnswer) => {
    var notFound = true;
    this.state.answers.forEach((answerObj, index) => {
      //if the player has already submited an answer
      if (answerObj.player_uuid === newAnswer.player_uuid) {
        notFound = !notFound;
        this.state.answers[index] = newAnswer;
      }
    });
    if (notFound) {
      this.state.answers.push(newAnswer);
    }
    this.setState({});
  }

  componentWillUnmount() {
    // if (this.state.player_uuid) {
    //   axios.delete(`${serverAddress}/game/${this.state.game.game_name}`, { data: { player_id: this.state.player_uuid } })
    //     .then(() => { })
    //     .catch((err) => {
    //       console.error(err);
    //       console.error(err.request)
    //     });
    // }
  }

  componentDidMount() {
    //TODO: have the game model hold a list of answers make, a request to the 
    // make an answer model, that can be quickly created/deleted
    // having the uuid present is important
    this._setQuestion()
  }

  _setQuestion = () => {
    this._updateGameState()
    axios.get(`${serverAddress}/questions/${this.state.game.current_question}`)
      .then((res) => {
        this.setState({
          question: res.data
        })
      })
      .catch((err) => {
        console.error('error fetching question')
        console.error(err)
      })
  }

  // get the latest 'state' of the game form the server
  _updateGameState = () => {
    axios.get(`${serverAddress}/game/${this.state.game.game_name}`)
      .then((res) => {
        this.state.game = res.data
        this.setState({})
      })
      .catch((err) => {
        console.error('error fetching game data')
        console.error(err)
      })

  }

  submitAnswer() {
    Keyboard.dismiss()
    this.state.playerws.send(JSON.stringify({
      "type": "game.submit_answer",
      "payload": {
        "answer_text": this.state.answerText,
        "player_uuid": this.state.player_uuid
      }
    }))
  }

  _getQuestionPrompt(questionUUID) {
    axios.get(`${serverAddress}/questions/${questionUUID}`)
      .then((res) => {
        this.setState({ question: res.data })
      })
      .catch((err) => {
        console.error(err);
        console.error(err.request);
      });
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
            <AnswerList answers={this.state.answers} />
          </View>

          <View style={styles.playerResponseContainer}>
            <TextInput style={styles.submitResponseTextInput}
              maxLength={20}
              placeholder={"Answer..."}
              onChangeText={(text) => this.setState({ answerText: text })}
              onSubmitEditing={this.state.questionUnlocked ? () => this.submitAnswer() : () => { }} />
            <TouchableOpacity
              style={this.state.questionUnlocked ? styles.submitResponseButton_unlocked : styles.submitResponseButton_locked}
              onPress={this.state.questionUnlocked ? () => this.submitAnswer() : () => { }}>
              <Text style={styles.submitResponseButtonText}>SUMBIT</Text>
            </TouchableOpacity>
          </View>

        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

function AnswerList({ answers }) {
  function AnswerListTile({ answer, index }) {
    return (
      <View style={styles.answerContainer}>
        <Text style={styles.answerText}>{answer.answer_text}</Text>
      </View>
    )
  }

  return (
    <FlatList
      style={styles.answerList}
      data={answers}
      keyExtractor={(item: Answer, index) => item.player_uuid}
      renderItem={({ item, index }) => <AnswerListTile answer={item} index={index} />}
    />
  )
}