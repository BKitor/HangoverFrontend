// "HostRound" route
import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { BASE } from '../styles/common';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, heightPercentageToDP } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from "../styles/hostroundscreen.js";
import axios from 'axios';
import { serverAddress } from '../config.json';

interface Props {
  navigation: any
}

export default class HostRoundScreen extends React.Component<Props> {
  state = {
    host_ws: null,
    question_id: null,
    game: null,
    question: null,
    loading: true,
    questionsLocked: false,
  };

  constructor(props) {
    super(props);
    this.state.game = this.props.navigation.getParam("game", null);
    this.state.host_ws = this.props.navigation.getParam("host_ws", null);
    this.state.host_ws.onmessage = this._handleHostWS;
  }

  componentWillMount() {
    axios.get(`${serverAddress}/questions/${this.state.game.current_question}`)
      .then((res) => this.setState({ question: res.data, loading: false }))
      .catch((err) => console.debug(err));
  }

  _handleHostWS = (event) => {
    const data = JSON.parse(event.data);
    console.log(data.type)
    switch (data.type) {
      case 'game.question_changed':
        console.log(data.payload)
        this._changeQuestion(data.payload)
        break;
      case 'error':
        console.debug('error type message from server')
        console.debug(data.payload)
        break;
      default:
        console.debug('bad ws message');
        console.debug(data)
    }
  }

  lockAnswers() {
    this.setState({ questionsLocked: !this.state.questionsLocked });
    this.state.host_ws.send(JSON.stringify({
      'type':'game.lock_question'
    }))
  }

  _changeQuestion(stuff) {
    // axios.put(`${serverAddress}/game/${this.state.game.game_name}/next_question`, {
    //   user_id: this.state.game.host
    // }).then((res) => {
    //   this.setState({ game: res.data })
    // })
    //   .then(() => {
    //     axios.get(`${serverAddress}/questions/${this.state.game.current_question}`)
    //       .then((res) => this.setState({ question: res.data }))
    //       .catch((err) => {
    //         Alert.alert(
    //           'Game Finished',
    //           '',
    //           [{
    //             text: "Go Back",
    //             onPress: () => { this.props.navigation.goBack() }
    //           }]
    //         )
    //       });
    //   })
    //   .catch((err) => {
    //     if (err.response.data == "No more questions") {
    //       axios.delete(`${serverAddress}/game/${this.state.game.game_name}/end_game`)
    //         .then(() => {
    //           this.props.navigation.goBack();
    //         })
    //     }
    //   })
    // this.setState({ questionsLocked: false })
  }


  NextButton() {
    if (this.state.questionsLocked) {
      return (
        <TouchableOpacity style={styles.nextButton} onPress={() => {
          this.state.host_ws.send(JSON.stringify({
            "type": "game.change_question",
            "payload": {}
          }))
        }}>
          <Text style={styles.nextButtonText}>
            NEXT QUESTION
                    </Text>
        </TouchableOpacity>
      )
    }
    return (<React.Fragment></React.Fragment>);
  }

  render() {

    // if (this.state.loading) {
    //   return (
    //     <View style={styles.background}>
    //       <View style={styles.loadingTitleContainer}>
    //         <Text style={styles.titleText}>Loading Question....</Text>
    //       </View>
    //     </View>
    //   );
    // }

    return (
      <ImageBackground source={require('../assets/repeated-background.png')} style={styles.background}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>FILL IN THE BLANK</Text>
        </View>
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>{this.state.question ? this.state.question.prompt : " "}</Text>
        </View>

        {this.NextButton()}

        <TouchableOpacity style={styles.bigBtnContainer} onPress={() => { this.lockAnswers() }}>
          <Icon name={this.state.questionsLocked ? "lock" : "unlock"} size={wp(13)} color={BASE} />
          <Text style={styles.bigBText}>{this.state.questionsLocked ? "LOCKED" : "LOCK THE ANSWERS"}</Text>
        </TouchableOpacity>
      </ImageBackground>

    );

  }
}

