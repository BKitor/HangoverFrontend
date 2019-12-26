import uuid from 'uuid'
import React from 'react';
import { View, Text, KeyboardAvoidingView, ImageBackground, StyleSheet, Alert } from 'react-native';
import { styles, possibleFontAwesomeIcons } from '../styles/joingamescreenstyles';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationEvents, FlatList } from 'react-navigation';
import { serverAddress } from '../config.json';


interface Props {
  navigation: any
}

export default class JoinGameScreen extends React.Component<Props>{
  state = {
    game: null,
    players: [],
    playerNameInput: styles.playerNameInput,
    player_uuid: null,
    player_name: null,
    readyToPlay: false,
    playerws: null, // 
  }


  constructor(props: Props) {
    super(props);
    this.state.game = this.props.navigation.state.params;
    this.state.playerws = new WebSocket(`ws://${serverAddress.slice(7)}/ws/game/${this.state.game.game_name}/player`);
    this.state.playerws.onmessage = this._handleWSMessage
  }
  componentWillUnmount() {
    if (this.state.player_uuid) {
      // remove the player from the game
      axios.delete(`${serverAddress}/game/${this.state.game.game_name}`, { data: { player_id: this.state.player_uuid } })
        .then((res) => { })
        .catch((err) => {
          console.error(`Error leaving game\n${err}`);
        })
    }
    this.state.playerws.send(JSON.stringify({ "type": 'game.player_leaving', 'payload': { 'player_name': this.state.player_name } }))
    this.state.playerws.close()
  }

  componentDidMount() {
    // gets list of players
    axios.get(`${serverAddress}/game/${this.state.game.game_name}/players`)
      .then((res) => {
        res.data.forEach(element => {
          // need object with key for flatlist
          this.state.players.push({
            'key': uuid.v4(),
            'player_name': element,
            'icon': possibleFontAwesomeIcons[Math.floor(Math.random() * possibleFontAwesomeIcons.length)]
          })
        });
      })
      .then(() => this.setState({}))
      .catch((res) => {
        console.error("Couldnt reach /game/<>/players")
        console.error(res.message)
        this.props.navigation.goBack()
      })
    // DELETEME
    this.submitName(`${Math.random()}`)
    // DELETEME
  }

  _handleWSMessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case 'game.player_joined':
        this.state.players.push({
          'key': uuid.v4(),
          'player_name': data.payload.player_name,
          'icon': possibleFontAwesomeIcons[Math.floor(Math.random() * possibleFontAwesomeIcons.length)]
        })
        this.setState({})
        break;

      case 'game.start_game':
        console.log(data.type)
        this._navigateToGame();
        break;

      case 'game.player_leaving':
        this.state.players.forEach((element, index) => {
          if (element.player_name === data.payload.player_name) {
            this.state.players.splice(index, 1)
          }
          this.setState({});
        });
        break;

      default:
        console.error(`bad WS message`);
        console.error(event)
    }
  }

  submitName(text) {
    // if the player alredy exist, send a put to change name
    if (this.state.player_uuid) {
      axios.put(`${serverAddress}/api/players/${this.state.player_uuid}/update`, { player_name: text })
        .then((res) => {
          this.state.playerws.send(JSON.stringify({ "type": 'game.player_leaving', 'payload': { 'player_name': this.state.player_name } }))
          this.state.playerws.send(JSON.stringify({ "type": 'game.player_joined', 'payload': { 'player_name': text } }))
          this.setState({ player_name: text })
        })
        .catch((err) => {
          Alert.alert("Name is taken", "try a different name", [{ text: 'ok', onPress: () => { } }])
          console.error(err);
        });
    }
    else {//create the new player
      axios.post(`${serverAddress}/game/${this.state.game.game_name}`, {
        player_name: text,
        user_id: 'anon' // TODO: add support for signed in players to join gmaes
      })
        .then((res) => {
          this.state.playerws.send(JSON.stringify({ "type": 'game.player_joined', 'payload': { 'player_name': text } }))
          this.setState({
            playerNameInput: styles.playerNameInput,
            player_uuid: res.data.uuid,
            player_name: text,
          });
          if (this.state.game.current_question) {
            this._navigateToGame();
          }
        })
        .catch((err) => {
          console.error(`error joining game\n${err}`);
          Alert.alert("Name is taken", "try a different name", [{ text: 'ok', onPress: () => { } }])
          this.setState({ playerNameInput: styles.playerNameBadInput });
        });
    }
  }

  _navigateToGame = () => {

  }


  render() {
    return (
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={'position'}>
        <ImageBackground source={require('../assets/repeated-background.png')} style={styles.backgroundView}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{this.state.game.game_name}</Text>
            <Text style={styles.playersJoinedText}>Players Joined</Text>
          </View>

          <View style={styles.playerJoinedContainer}>
            <View style={{ backgroundColor: 'green' }}></View>
            <PlayerList playerNameArr={this.state.players} />
          </View>

          <View style={styles.userInputContainer}>
            <Text style={styles.nicknameText}>Your NickName</Text>
            <TextInput style={this.state.playerNameInput}
              maxLength={20}
              placeholder={"NickName"}
              onSubmitEditing={({ nativeEvent }) => { this.submitName(nativeEvent.text); this.setState({ readyToPlay: true }) }} />
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Waiting for players to join</Text>
          </View>

          <NavigationEvents onWillFocus={payload => this.setState({ readyToPlay: false })} />
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

function PlayerList({ playerNameArr }) {
  function PlayerListTile({ player, index }) {
    return (
      <View style={styles.playerTagContainer}>

        <Icon name={player.icon}></Icon>
        <Text style={styles.playerTagText}>{player.player_name}</Text>
      </View>
    )
  }

  return (
    <FlatList
      style={styles.playerList}
      data={playerNameArr}
      renderItem={({ item, index }) => <PlayerListTile player={item} index={index} />}
    />
  )
}
