// import axiosCfg from "../config"
import axios from 'axios';
import React from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    AsyncStorage,
    Alert,
    Button
} from 'react-native';
import {ACCENT_GRAY, PRIMARY_DARK,  DEBUG, PRIMARY_LIGHT, SECONDARY, FONT} from '../styles/common';
import styles from "../styles/homescreenstyles.js";
import {NavigationEvents} from 'react-navigation';
import serverAddress from '../styles/common';

interface Props {
    navigation: any
}

export default class HomeScreen extends React.Component<Props> {
    state = {
        animation : new Animated.Value(0),
        loginButtonText: null,
        loginButtonNavigate: null,
    };

    startAnimation(){
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: (DEBUG ? 0 : 1500)
        }).start();
    }

    componentWillMount(){
        this.startAnimation();
        this.checkLoggedIn();
    }

    // //deleted this!!!
    // componentDidMount(){
    //     axios.get(`${serverAddress}/game/t`).then((res)=>{
    //         // console.log(res.data)
    //         this.props.navigation.navigate("PlayRound", {game:res.data});//TODO:: impliment navigaiton
    //     });
    // }    //deleted this!!!

    componentDidUpdate(){
        // this.checkLoggedIn();
    }

    // Calls componentDidUpdate() which results in an infinite loop
    checkLoggedIn(){
        AsyncStorage.getItem("id").then((value) => {
            if(value == null || value == "") {
                console.debug("There is no value at userUUID, this is a new player");
                this.setState({loginButtonText: "LOG IN", loginButtonNavigate: "LogIn"});
                return;
            }
            console.debug("There is a value at userUUID, redirecting to player");
            this.setState({loginButtonText: "ACCOUNT", loginButtonNavigate: "Profile"})
        });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.background} behavior={'padding'} enabled>
                <NavigationEvents
                    onWillFocus={payload=>this.checkLoggedIn()}
                />
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/hangover.png')} />
                </View>
                    <View style={styles.codeContainer}>
                        <TextInput
                            style={styles.codeInput}
                            placeholder="ROOM CODE"
                            autoCapitalize="none"
                            onSubmitEditing={({nativeEvent}) => this.checkRoomCode(nativeEvent.text)}
                            placeholderTextColor = {ACCENT_GRAY}/>
                    </View>

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.loginContainer} onPress={() => {this.props.navigation.navigate(this.state.loginButtonNavigate)}}>
                        <Text style={styles.loginText}>{this.state.loginButtonText}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signUpContainer} onPress={() => {this.props.navigation.navigate("SignUp")}}>
                        <Text style={styles.signUpText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }

    checkRoomCode(text){//check to see if the room code is valid and auto join
        axios.get(`http:tixo.ca:7537/game/${text}`).then((res)=>{
            // console.log(res.data)
            this.props.navigation.push("JoinGame", res.data);//TODO:: impliment navigaiton
        }).catch((res)=>{
            Alert.alert(
                "Bad room name",
                `${text} doesn't exist`,
                [
                    {
                        text:"close",
                        onPress:()=>{}
                    }
                ],
                {cancelable:false}
            )
        })
    }
}
