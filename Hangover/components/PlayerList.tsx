import React, { FunctionComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/FontAwesome';
import { FONT } from '../styles/common'


type PlayerListProps = {
  playerNameArr: Array<any>
}

export const PlayerList: FunctionComponent<PlayerListProps> = ({ playerNameArr }) => {
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

const styles = StyleSheet.create({
  playerList: {
    flex: 1,
    flexGrow: 0.6,
    top: hp(20),
    width: wp(70),
  },
  playerTagContainer: {
    marginTop: hp(1),
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  playerTagText: {
    fontFamily: FONT,
    fontSize: hp(3),
  },
})

/*

  Taken from original Host game screen,
  TODO: rewrite player list to be more similar to Cache's design 
  
*/



// class PlayerBubble extends React.Component {

//   state = {
//     uuid: "",
//     game_name: "",
//   };

//   constructor(props) {
//     super(props);
//     this.setState({ uuid: props.uuid });
//     this.getPlayerName(props.uuid);

//   }

//   getPlayerName(uuid) {
//     axios.get(serverAddress + "/api/players/" + uuid)
//       .then((res) => res.data)
//       .then((player) => player.player_name)
//       .then((name) => this.setState({ game_name: name }))
//       .then(() => this.render())
//       .catch((err) => console.debug(err));
//   }

//   render() {
//     return (
//       <View style={styles.playerBubbleContainer}>
//         <Image source={require("../assets/icon.png")} style={styles.playerIcon}></Image>
//         <Text style={styles.playerBubbleName}>{this.state.game_name}</Text>
//       </View>
//     )
//   }
// }

  // renderPlayers() {
  //   let toRender = [];
  //   for (const element of this.state.game.players)
  //     toRender.push(<PlayerBubble uuid={element}></PlayerBubble>);
  //   return toRender;
  // }

  // <TouchableOpacity style={styles.bigBtnContainer} onPress={() => { this.startGame() }}>
//   <Text style={styles.bigBText}>PLAY</Text>
// </TouchableOpacity>
// <ScrollView style={styles.playerBubblesContainer}>
//   {this.renderPlayers()}
// </ScrollView>