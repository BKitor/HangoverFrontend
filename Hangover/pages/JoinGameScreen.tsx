import React from 'react';
import { View, Text, KeyboardAvoidingView, ImageBackground, StyleSheet, Alert } from 'react-native';
import styles from '../styles/joingamescreenstyles';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReactPolling from 'react-polling'
import { NavigationEvents } from 'react-navigation';
import {serverAddress} from '../styles/common';



interface Props {
  navigation: any
}

export default class JoinGameScreen extends React.Component<Props>{
  state = {
    game: null,
    players: [],
    playerNameInput: styles.playerNameInput,
    player_uuid: null,
    readyToPlay:false,
  }

  constructor(props) {
    super(props);
    this.state.game = this.props.navigation.state.params;
  }

  componentWillUnmount() {
    if (this.state.player_uuid) {
      axios.delete(`${serverAddress}/game/${this.state.game.game_name}`, { data: { player_id: this.state.player_uuid } })
        .then(() => { })
        .catch((err) => console.log(err))
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
      })
  }

  submitName(text) {
    // if the player alredy exist, send a put to change name
    if (this.state.player_uuid) {
      axios.put(`${serverAddress}/api/players/${this.state.player_uuid}/update`, { player_name: text })
        .then((res) => {
          this.state.players[3] = text;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {//create the new player
      axios.post(`${serverAddress}/game/${this.state.game.game_name}`, {
        player_name: text,
        user_id: 'anon' // TODO: add support for signed in players to join gmaes
      })
        .then((res) => {
          this.state.players[3] = text;
          this.setState({
            playerNameInput: styles.playerNameInput,
            player_uuid: res.data.uuid
          });
        })
        .catch((err) => {
          console.log(err);
          Alert.alert("Name is taken", "try a different name", [{ text: 'ok', onPress: () => { } }])
          this.setState({ playerNameInput: styles.playerNameBadInput });
        });
    }
  }

  pollingUpdate = (res) => {
    if (res.current_question && this.state.player_uuid) {
      console.log(res.current_question)
      console.log(this.state.readyToPlay)

      if (this.state.readyToPlay) {
        this.props.navigation.navigate("PlayRound", { game: res })
      }
    }
    return true
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={'position'}>
        <ImageBackground source={require('../assets/repeated-background.png')} style={styles.backgroundView}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{this.state.game.game_name}</Text>
          </View>

          <View style={styles.playerJoinedContainer}>
            <Text style={styles.playersJoinedText}>Players Joined</Text>
            <PlayerList playerNameArr={this.state.players} />
          </View>

          <View style={styles.userInputContainer}>
            <Text style={styles.nicknameText}>Your NickName</Text>
            <TextInput style={this.state.playerNameInput}
              maxLength={20}
              placeholder={"NickName"}
              onSubmitEditing={({ nativeEvent }) => {this.submitName(nativeEvent.text); this.setState({readyToPlay:true})}} />
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Waiting for players to join</Text>
          </View>

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
          <NavigationEvents onWillFocus={payload => this.setState({readyToPlay:false})} />
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}


function PlayerTag({ playerName }) {

  return (
    <View style={styles.playerTagContainer}>
      <Icon name={'thumbs-up'}></Icon>
      <Text style={styles.playerTagText}>{playerName}</Text>
    </View>
  );

}

function PlayerList({ playerNameArr }) {
  const items = playerNameArr.map((name) => {
    return <PlayerTag key={name} playerName={name} />
  })
  return (
    <React.Fragment>
      {items}
    </React.Fragment>
  )
}