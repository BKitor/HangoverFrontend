import React from 'react';
import { View, Text, KeyboardAvoidingView, ImageBackground, StyleSheet } from 'react-native';
import styles from '../styles/joingamescreenstyles';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP } from 'react-native-responsive-screen';

interface Props {
    navigation: any
}

export default class JoinGameScreen extends React.Component<Props>{
    state = {
        game: null,
        players: []
    }

    constructor(props){
        super(props);
        this.state.game = this.props.navigation.state.params;
    }

    componentDidMount(){
        axios.get(`http://tixo.ca:7537/game/${this.state.game.game_name}/players`)
        .then((res)=>{
            this.setState({
                players:res.data.slice(0,4)
            })
        })
        .catch((res)=>{
            console.log("Couldnt reach /game/<>/players")
            console.log(res.message)
            this.props.navigation.goBack()
        })
    }

    submitName(text) {

    }

    render() {
        return (
            <ImageBackground source={require('../assets/repeated-background.png')} style={styles.backgroundView}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{this.state.game.game_name}</Text>
                </View>

                <View style={styles.playerJoinedContainer}>
                    <Text style={styles.playersJoinedText}>Players Joined</Text>
                    <FlatList 
                        data={this.state.players}
                        renderItem={({ item, index }) =>  <PlayerTag playerName={item} index={index}/>} 
                        style={styles.playerTagList}
                        keyExtractor={(item, index) => index.toString()} //warning suppression
                    />

                </View>

                <View style={styles.userInputContainer}>
                    <TextInput style={styles.playerNameInput} defaultValue={"Enter Player name"}/>
                </View>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Waiting for players to join</Text>
                </View>
            </ImageBackground>
        );
    }
}

function PlayerTag({playerName, index}) {
    // if(index%2){
    //     return(
    //         <View style={{ flexDirection:'row', }}>
    //             <View style={styles.playerTagContainer}>
    //                 <Icon name={'thumbs-up'}></Icon>
    //                 <Text style={styles.playerTagText}>{item}</Text>
    //             </View>
    //             <View style={{width:widthPercentageToDP(70)}}>

    //             </View>
    //         </View>
    //     );
    // }
    return(
        <View style={styles.playerTagContainer}>
            <Icon name={'thumbs-up'}></Icon>
            <Text style={styles.playerTagText}>{playerName}</Text>
        </View>        
    );

}
