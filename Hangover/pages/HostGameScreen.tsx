// "HostGame" route
import React from 'react';
import uuid from 'uuid';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { serverAddress } from '../config.json';
import { styles, possibleFontAwesomeIcons } from "../styles/hostgamescreen.js";
import axios from 'axios';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import { BottomBarButton } from '../components/BottomBarButton';
import { PlayerList } from '../components/PlayerList';

interface Props {
  navigation: any
}

export default class HomeScreen extends React.Component<Props> {
  state = {
    warning_message: "The game needs a name",
    game: null,
    quiz: null,
    game_name: null,
    quiz_uuid: null,
    host_uuid: null,
    host_ws: null,
    players: [] //{player_name: , key:uuid, icon:}
  };

  constructor(props) {
    super(props);
    this.state.host_uuid = this.props.navigation.getParam("host_uuid", null);
    this.state.quiz_uuid = this.props.navigation.getParam("quiz_uuid", null);
    this.state.game_name = this.props.navigation.getParam("game_name", null);
  }

  componentWillMount() {
    axios.get(`${serverAddress}/quizzes/${this.state.quiz_uuid}`)
      .then((res) => this.setState({ quiz: res.data, loading: false }))
      .catch((err) => {
        console.debug('error fetching quiz');
        console.debug(err);
      });
  }

  _initGame = (gameInputText) => {
    axios.post(`${serverAddress}/api/games`, {
      game_name: gameInputText,
      quiz_uuid: this.state.quiz_uuid,
      host_uuid: this.state.host_uuid,
    })
      .then(res => {
        const newWS = new WebSocket(`ws://${serverAddress.slice(7)}/ws/game/${gameInputText}/host`);
        newWS.onmessage = this._handleHostWS
        this.setState({
          game_name: gameInputText,
          game: res.data,
          host_ws: newWS,
          warning_message: '',
        })
      })
      .catch(err => {
        console.debug('error creating game');
        console.debug(err);
        console.debug(err.response.data);
        if (err.response.data === "Name is taken, choose a new name") {
          this.setState({
            warning_message: err.response.data
          })
        }
      })
    // post to create the game
    // set up host websocket
  }

  _startGame = () => {
    //TODO: this next_quesiton navigation should be moved server side, simplify it to just the ws message
    axios.put(`${serverAddress}/game/${this.state.game_name}/next_question`, {
      user_id: this.state.host_uuid
    }).then(res => {
      this.setState({
        game: res.data
      })
      this.state.host_ws.send(JSON.stringify({
        type: 'game.start_game'
      }))
    })
      .catch(err => {
        console.debug('error changing question')
        console.debug(err.message)
      })
  }

  _handleHostWS = (event) => {
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
      case 'game.player_leaving':
        this.state.players.forEach((element, index) => {
          if (element.player_name === data.payload.player_name) {
            this.state.players.splice(index, 1);
          }
          this.setState({});
        })
        break;

      case 'game.start_game':
        this.props.navigation.navigate("HostRound", {
          host_ws: this.state.host_ws,
          game: this.state.game
        });
        break;

      default:
        console.debug('bad ws message')
        console.debug(data)
    }
  }

  componentWillUnmount() {
    if (this.state.host_ws) {
      this.state.host_ws.close();
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <ImageBackground source={require('../assets/repeated-background.png')} style={styles.backgroundView}>
          <View style={styles.titleContainer}>
            <TextInput style={styles.titleText}
              autoFocus={!this.state.game_name ? true : false}
              placeholder={"GAMENAME"}
              onSubmitEditing={({ nativeEvent }) => this._initGame(nativeEvent.text)} />
            <Text style={{ color: 'red' }}>{this.state.warning_message}</Text>
            <Text style={styles.playersJoinedText}>Players Joined</Text>
          </View>

          <View style={styles.playerListContainer}>
            <PlayerList playerNameArr={this.state.players} />
          </View>

          <BottomBarButton onPress={this._startGame} buttonText={"Start Game"} locked={!this.state.game_name} />
        </ImageBackground>
      </KeyboardAvoidingView>
    );

  }
}

