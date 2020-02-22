// Both hosts and players come to this screen at game end
import React from 'react';
import { BackHandler, View, ImageBackground, Text } from 'react-native';
import styles from '../styles/gamesummaryscreenstyles';
import { BottomBarButton } from '../components/BottomBarButton';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { serverAddress } from '../config.json';


interface GameSummaryProps {
  navigation: any,

}

export default class GameSummaryScreen extends React.Component<GameSummaryProps>{
  backHandler = null;

  state = {
    playerScores: [],
    game: null,
    host_ws: null,
    isHost: false,
    highestScore: null,
    lowestScore: null,
  }
  constructor(props) {
    super(props);
    this.state.game = this.props.navigation.getParam("game", null);
    this.state.host_ws = this.props.navigation.getParam("host_ws", null);
    this.state.isHost = this.props.navigation.getParam("isHost", false);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this._endGameOnPress();
    })
    axios.get(`${serverAddress}/game/${this.state.game.game_name}/players_detail`)
      .then(res => {
        res.data.sort((p1, p2) => {
          return p2.score - p1.score;
        })
        this.setState({
          playerScores: res.data,
          highestScore: res.data[0].score,
          lowestScore: res.data[res.data.length - 1].score,
        });
      })
      .catch(err => {
        console.error(err)
      })
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  _endGameOnPress = () => {
    if (this.state.isHost) {
      this.state.host_ws.send(JSON.stringify({
        'type': 'game.end_game',
        'payload': {}
      }))
      this.state.host_ws.close()
    }
    this.props.navigation.navigate("Home")
  }

  render() {
    return (
      <ImageBackground source={require('../assets/repeated-background.png')} style={styles.background}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{this.state.game.game_name}</Text>
        </View>

        <View style={styles.playerScoreContainer}>
          <FlatList
            style={styles.playerScoreList}
            data={this.state.playerScores}
            renderItem={({ item, index }) => <this.PlayerScoreTile player={item} idx={index} />}
            keyExtractor={(item, index) => item.uuid}
          />
        </View>
        <BottomBarButton
          onPress={this._endGameOnPress}
          buttonText={(this.state.isHost) ? "End Game" : "Back to Home"}
          locked={false}>
        </BottomBarButton>
      </ImageBackground>
    )
  }
  PlayerScoreTile = ({ player, idx }) => {
    const tileStyle = (player.score == this.state.highestScore) ? styles.winnerTileStyle :
      (player.score == this.state.lowestScore) ? styles.loserTileStyle : styles.playerScoreTile;
    return (
      <View style={tileStyle}>
        <Text style={styles.playerScoreText}>{player.score}</Text>
        <Text style={styles.playerNameText}>{player.player_name}</Text>
      </View>
    )
  }
}