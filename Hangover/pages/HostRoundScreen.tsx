// "HostRound" route
import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { BASE } from '../styles/common';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from "../styles/hostroundscreen.js";
import axios from 'axios';
import { serverAddress } from '../config.json';
// import { AnswerList } from '../components/AnswerList';

interface Answer {
  AnswerText: string,
  player_uuid: string,
  selectedW: boolean,
  selectedL: boolean,
}

interface Props {
  navigation: any
}

export default class HostRoundScreen extends React.Component<Props> {
  state = {
    host_ws: null,
    game: null,
    question: null,
    loading: true,
    questionsLocked: false,
    answers: [], //{answertext:str, playe_uuid:uuid}
    pickWLState: null,
  };

  constructor(props) {
    super(props);
    this.state.game = this.props.navigation.getParam("game", null);
    this.state.host_ws = this.props.navigation.getParam("host_ws", null);
    this.state.host_ws.onmessage = this._handleHostWS;
  }

  componentWillMount() {
    this.getQFromServer(this.state.game.current_question)
  }

  getQFromServer = (qUUID) => {
    axios.get(`${serverAddress}/questions/${qUUID}`)
      .then((res) => this.setState({ question: res.data, loading: false }))
      .catch((err) => console.debug(err));
  }

  _handleHostWS = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case 'game.submit_answer':
        this._updateAnswers(data.payload)
        break;
      case 'game.question_changed':
        this._refreshOnQChange(data.payload)
        break;
      case 'game.question_locked':
        break;
      case 'error':
        console.debug('error type message from server')
        console.debug(data.payload)
        break;
      case 'success': break;
      default:
        console.debug('bad ws message');
        console.debug(data)
    }
  }

  _refreshOnQChange = (websocketPayload) => {
    console.log(websocketPayload.question_uuid)
    if (websocketPayload.question_uuid) {
      this.state.answers = [];
      this.state.questionsLocked = false;
      this.getQFromServer(websocketPayload.question_uuid);
    }else{
      // this.props.navigation.navigate() go to end screen
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
      newAnswer.selectedW = false;
      newAnswer.selectedL = false;
      this.state.answers.push(newAnswer);
    }
    this.setState({});
  }

  lockAnswers() {
    if (!this.state.questionsLocked) { //lock the question
      this.setState({ questionsLocked: true, pickWLState: "W" });
      this.state.host_ws.send(JSON.stringify({
        'type': 'game.lock_question'
      }))
    }
    else {
      this.setState({ questionsLocked: false, pickWLState: null });
      this.state.host_ws.send(JSON.stringify({
        'type': 'game.unlock_question'
      }))
    }
  }

  _nextOnPress = () => {
    // The model update is handled by the websocket, no need to involve axios

    const wIdx = this.state.answers.findIndex(ans => ans.selectedW)
    const lIdx = this.state.answers.findIndex(ans => ans.selectedL)

    const winner_uuid = (wIdx >= 0) ? this.state.answers[wIdx].player_uuid : null;
    const loser_uuid = (lIdx >= 0) ? this.state.answers[lIdx].player_uuid : null;

    this.state.host_ws.send(JSON.stringify({
      "type": "game.pick_winner_loser",
      "payload": {
        "winner_uuid": winner_uuid,
        "loser_uuid": loser_uuid
      }
    }))
    Alert.alert("Start Next Question",
      "Start the next question when you're ready",
      [{ text: 'Next', onPress: this._transitionToNextQuestion }],
      { 'cancelable': false }
    )
  }

  _transitionToNextQuestion = () => {
    this.state.host_ws.send(JSON.stringify({
      "type": "game.change_question",
      "payload": {}
    }))
  }

  _toggleWL = () => {
    // toggles betweeen W or L for current picking state,
    if (this.state.pickWLState == null) {
      console.error("pickWLState is null, how did you get here?")
    }

    const newState = (this.state.pickWLState == "W") ? "L" : "W";

    this.setState({ pickWLState: newState })
  }

  lockedBar() {
    if (this.state.questionsLocked) {
      return (<React.Fragment>
        <TouchableOpacity style={styles.nextButton} onPress={() => this._nextOnPress()}>
          <Text style={styles.nextButtonText}>NEXT QUESTION</Text>
        </TouchableOpacity>
        <TouchableOpacity style={(this.state.pickWLState == 'W') ? styles.WBtn : styles.LBtn} onPress={() => this._toggleWL()}>
          <Text style={styles.pickWLBtnText}>{this.state.pickWLState}</Text>
        </TouchableOpacity>
      </React.Fragment>
      )
    }
    return (<React.Fragment></React.Fragment>);
  }

  // callback method for answer flat list
  _setWorL = (selectedAnswer) => {
    const i = this.state.answers.findIndex((ans) => ans.player_uuid == selectedAnswer.player_uuid)

    if (this.state.pickWLState == 'W') {
      const cw = this.state.answers.findIndex((ans) => ans.selectedW)
      if (cw >= 0) {
        this.state.answers[cw].selectedW = false;
      }

      selectedAnswer.selectedL = false;
      selectedAnswer.selectedW = true;

      this.state.answers[i] = selectedAnswer;
      this.setState({ answers: this.state.answers })
    }
    else if (this.state.pickWLState == 'L') {
      const cl = this.state.answers.findIndex((ans) => ans.selectedL)
      if (cl >= 0) {
        this.state.answers[cl].selectedL = false;
      }


      selectedAnswer.selectedW = false;
      selectedAnswer.selectedL = true;

      this.state.answers[i] = selectedAnswer;
      this.setState({ answers: this.state.answers })
    }
  }

  render() {
    return (
      <ImageBackground source={require('../assets/repeated-background.png')} style={styles.background}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>FILL IN THE BLANK</Text>
        </View>
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>{this.state.question ? this.state.question.prompt : " "}</Text>
        </View>

        <View style={styles.answerDisplayContainer}>
          <FlatList
            style={styles.answerList}
            data={this.state.answers}
            keyExtractor={(item: Answer, index) => item.player_uuid}
            renderItem={({ item, index }) => <this.AnswerListTile
              answer={item}
              index={index}
            />}
            extraData={this.state}
          />
        </View>

        <View style={styles.lockQuestionBar}>
          {this.lockedBar()}
        </View>

        <TouchableOpacity style={styles.bigBtnContainer} onPress={() => { this.lockAnswers() }}>
          <Icon name={this.state.questionsLocked ? "lock" : "unlock"} size={wp(13)} color={BASE} />
          <Text style={styles.bigBText}>{this.state.questionsLocked ? "LOCKED" : "LOCK THE ANSWERS"}</Text>
        </TouchableOpacity>
      </ImageBackground>

    );

  }

  AnswerListTile = ({ answer, index }) => {
    const chosenLable = (<Text style={styles.answerText}>
      {(answer.selectedW) ? "W" :
        (answer.selectedL) ? "L" : " "}
    </Text>);

    return (
      <TouchableOpacity style={styles.answerContainer}
        onPress={() => this._setWorL(answer)}>
        <Text style={styles.answerText}>{answer.answer_text}</Text>
        {chosenLable}
      </TouchableOpacity>
    )
  }


}
