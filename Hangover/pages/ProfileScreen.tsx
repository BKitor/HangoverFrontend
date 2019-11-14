import {KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, AsyncStorage} from "react-native";
import React from "react";
import {ACCENT_GRAY, ACCENT_BLUE, PRIMARY_DARK,  DEBUG, PRIMARY_LIGHT, SECONDARY, FONT} from '../styles/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import axios from "axios";
import styles from "../styles/profilescreenstyles";

interface Props {
    navigation: any
}


export default class ProfileScreen extends React.Component<Props>{

    state = {
        username: "",   
    }

    componentDidMount(){
        AsyncStorage.getItem("userUUID").then((value)=>{
            axios.get(`http://tixo.ca:7537/users/${value}`)
                .then((res)=>{
                    this.setState({username:res.data.username})
                })
        })
    }

    render(){
        return(
            <View style={styles.background}>
                <View style={styles.infoContainer}>
                    <Text style={styles.usernameText}>{this.state.username}</Text>
                    {/* <Text style={styles.phoneText}>(444) - 444 - 4444</Text> */}
                </View>


                <View style={styles.btnContainer}>
                    <Text style={styles.btnText}>Join Room</Text>
                </View>
                <View style={styles.btnContainer}>
                    <Text style={styles.btnText}>Create New Quiz</Text>
                </View>
                <View style={styles.btnContainer}>
                    <Text style={styles.btnText}>View Saved Quizzes</Text>
                </View>

                <TouchableOpacity style={styles.bigBtnContainer} onPress={() => {
                    this.props.navigation.navigate("Home");
                    AsyncStorage.setItem("userUUID", "")}}>
                    <Text style={styles.bigBText}>LOG OUT</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
