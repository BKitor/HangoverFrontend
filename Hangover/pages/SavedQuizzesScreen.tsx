import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import { serverAddress } from '../config.json';
import styles from "../styles/savedquizzesscreen.js";
import axios from 'axios';

interface Props {
  navigation: any
}

export default class SavedQuizzes extends React.Component<Props> {
  state = {
    quizzes: [],
    opacities: [],
    user_uuid: null
  };

  constructor(props) {
    super(props);
    this.state.user_uuid = this.props.navigation.getParam('user_uuid', null);
  }

  componentWillMount() {
    axios.get(serverAddress + '/users/' + this.state.user_uuid + '/quizzes/')
      .then(res => {
        this.setState({ quizzes: this.fixData(res.data) });
      })
      .catch((err) => {
        console.debug("error getting quizzes")
        console.debug(err)
      })
  }

  fixData(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      newData.push({ "key": data[i].uuid, "name": data[i].name });
    }

    return [
      { key: "blank1" },
      { key: "blank2" },
      ...newData,
      { key: "blank3" },
      { key: "blank4" }];
  }

  getOpacity() {
    return 1;
    if (this.state.opacities.length == 0)
      return 0.2;
    return this.state.opacities[this.state.opacities.length - 1] + 0.1
  }

  renderQuiz(quiz) {
    if (quiz.name == null) {
      return (
        <View style={styles.blankSpace}>
        </View>
      )
    } else {
      this.state.opacities.push(this.getOpacity());
      return (
        <View style={{ opacity: this.state.opacities[this.state.opacities.length - 1] }}>
          <TouchableOpacity key={quiz.uuid} style={styles.quizContainer} onPress={(e) => this.quizSelected(e, quiz)}>
            <Text style={styles.quizText}>{quiz.name}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  quizSelected(e, quiz) {
    console.debug(quiz.name + " selected");
    this.createNewGame(quiz);
  }

  createNewGame(quiz) {
    this.props.navigation.navigate("HostGame", {
      "host_uuid": this.state.user_uuid,
      "quiz_uuid": quiz.key,
      "game_name": null// how are game names being added? Pop up?
    })
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
                offset: (styles.quizContainer.height + styles.quizContainer.marginBottom) * (index - 2),
                index
              })}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => this.renderQuiz(item)}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    )
  }
}