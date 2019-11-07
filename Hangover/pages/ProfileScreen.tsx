import {KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, AsyncStorage} from "react-native";
import React from "react";
import {ACCENT_GRAY, ACCENT_BLUE, PRIMARY_DARK,  DEBUG, PRIMARY_LIGHT, SECONDARY, FONT} from '../styles/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import axios from "axios";

interface Props {
    navigation: any
}


export default class ProfileScreen extends React.Component<Props>{

    state = {
        username: "",   
    }

    componentDidMount(){
        AsyncStorage.getItem("userUUID").then((value)=>{
            axios.get(`http://165.22.239.96:8000/users/${value}`)
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

const styles = StyleSheet.create({
    bigBtnContainer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(10),
        backgroundColor: PRIMARY_DARK,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bigBText: {
        fontFamily: FONT,
        fontSize: wp(7),
        color: ACCENT_GRAY,
    },
    btnText: {
        fontFamily: FONT,
        fontSize: wp(8)
    },
    btnContainer: {
        width: wp(90),
        height: hp(10),
        backgroundColor: '#fff',
        marginTop: hp(5),
        borderRadius: wp(3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        flex: 1,
        backgroundColor: ACCENT_GRAY,
        alignItems: 'center'
    },
    usernameText: {
        fontSize: wp(14),
        fontFamily: FONT
    },
    phoneText: {
        fontSize: wp(7),
        fontFamily: FONT,
        marginTop: hp(-2)
    },
    infoContainer:{
        height: hp(40),
        width: wp(100),
        backgroundColor: ACCENT_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
