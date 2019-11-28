import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  AsyncStorage,
  Alert,
} from 'react-native';
import { ACCENT_GRAY, PRIMARY_DARK, DEBUG, PRIMARY_LIGHT, SECONDARY, FONT, BASE, serverAddress } from '../styles/common';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, heightPercentageToDP } from "react-native-responsive-screen";
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
    game: null,
    question: null,
    loading: true,
    questionsLocked: false,
  };

  constructor(props) {
    super(props);
    this.state.game = this.props.navigation.getParam("game", null);
    console.debug(this.state.game);
  }

  componentWillMount() {
    let that = this;

    axios.get(serverAddress + "/questions/" + that.state.game.current_question)
      .then((res) => that.setState({ question: res.data, loading: false }))
      .catch((err) => console.debug(err));
  }

  lockAnswers() {
    this.setState({ questionsLocked: !this.state.questionsLocked });
  }

  changeQuestion() {
    axios.put(`${serverAddress}/game/${this.state.game.game_name}/next_question`, {
      user_id: this.state.game.host
    }).then((res) => {
      this.setState({ game: res.data })
    })
      .then(() => {
        axios.get(`${serverAddress}/questions/${this.state.game.current_question}`)
          .then((res) => this.setState({ question: res.data }))
          .catch((err) => {
            Alert.alert(
              'Game Finished',
              '',
              [{
                text: "Go Back",
                onPress: () => { this.props.navigation.goBack() }
              }]
            )
          });
      })
      .catch((err) => {
        if (err.response.data == "No more questions") {
          axios.delete(`${serverAddress}/game/${this.state.game.game_name}/end_game`)
            .then(() => {
              this.props.navigation.goBack();
            })
        }
      })
    this.setState({ questionsLocked: false })
  }


  NextButton() {
    console.debug(this.state);
    if (this.state.questionsLocked) {
      return (
        <TouchableOpacity style={styles.nextButton} onPress={() => { this.changeQuestion() }}>
          <Text style={styles.nextButtonText}>
            NEXT QUESTION
                    </Text>
        </TouchableOpacity>
      )
    }
    return (<React.Fragment></React.Fragment>);
  }

  render() {

    if (this.state.loading) {
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

        {this.NextButton()}

        <TouchableOpacity style={styles.bigBtnContainer} onPress={() => { this.lockAnswers() }}>
          <Icon name={this.state.questionsLocked ? "lock" : "unlock"} size={wp(13)} color={BASE} />
          <Text style={styles.bigBText}>{this.state.questionsLocked ? "LOCKED" : "LOCK THE ANSWERS"}</Text>
        </TouchableOpacity>
      </View>

    );

  }
}

