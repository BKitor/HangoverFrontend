import React from 'react';
import { View } from 'react-native';

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

    render(){
        return(
            <View>

            </View>
        );
    }
}