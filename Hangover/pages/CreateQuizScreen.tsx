// "CreateQuiz" route
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from "../styles/createquizscreenstyles.js";

interface Props {
  navigation: any
}

export default class CreateQuizScreen extends React.Component<Props> {
  state = {
    user_uuid: null,
  };

  constructor(props) {
    super(props);
    this.state.user_uuid = this.props.navigation.getParam('user_uuid', null);
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.background} behavior={'padding'} enabled>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>CREATE NEW QUIZ</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/hangover.png')} />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.makeOwnContainer} onPress={() => { this.props.navigation.navigate("MakeNewQuiz") }}>
            <Text style={styles.makeOwnText}>Make Your Own</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.useSavedContainer} onPress={() => { this.props.navigation.navigate("SavedQuizzes", { "user_uuid": this.state.user_uuid }) }}>
            <Text style={styles.useSavedText}>Use a Saved Quiz</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
