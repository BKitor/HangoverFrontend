import React from 'react';
import { View, Text, KeyboardAvoidingView, ImageBackground } from 'react-native';
import styles from '../styles/joingamescreenstyles';
import { TextInput } from 'react-native-gesture-handler';

interface Props{
    navigation: any
}

export default class JoinGameScreen extends React.Component<Props>{
    state={
        game:null
    }

    constructor(props){
        super(props);
        this.state.game=props;
    }

    submitName(text){

    }

    render(){
        return(
            <KeyboardAvoidingView>
                <ImageBackground source={require('../assets/repeated-background.png')} style={styles.background}>
                    <Text style={styles.gameTitleText}>{this.state.game.game_name}</Text>
                    <Text style={styles.playersHeaderText}>Players Joined</Text>
                    <View style={styles.playerTilesView}>
                        <Text style={styles.playerTileTextLeft}>Filler Text</Text>
                        <Text style={styles.playerTileTextRight}>Filler Text</Text>
                        <Text style={styles.playerTileTextLeft}>Filler Text</Text>
                        <Text style={styles.playerTileTextRight}>Filler Text</Text>
                    </View>
                    <TextInput
                        style={styles.playerNameFieldTextInput}
                        onSubmitEditing={({nativeEvent})=>this.submitName(nativeEvent.text)}
                    />
                    <Text style={styles.footerText}></Text>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}