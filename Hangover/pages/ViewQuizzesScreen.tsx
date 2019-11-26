import {KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, AsyncStorage, FlatList} from "react-native";
import React from "react";
import {ACCENT_GRAY, ACCENT_BLUE, PRIMARY_DARK,  DEBUG, PRIMARY_LIGHT, SECONDARY, FONT} from '../styles/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import axios from "axios";
import styles from "../styles/viewquizzesstyles";

interface Props {
    navigation: any
}


export default class ViewQuizzesScreen extends React.Component<Props>{

    state = {
        quizzes: "",
    };

    componentDidMount(){
        AsyncStorage.getItem("userUUID").then((value)=>{
            axios.get(`http://10.217.55.23:8000/users/84d0ff80-2878-4883-819e-e4f35b58b32b/quizzes`)//make player specific and not pull from everyone
                .then((res)=>{
                    this.setState({quizzes: res.data});
                })
        })
    }

    render(){
        // @ts-ignore
        return(
            <View style={styles.background}>

                <FlatList
                    data={this.state.quizzes}
                    renderItem = { ({ item }) => (this.renderQuiz(item))}
                    keyExtractor={(item) => item.uuid}
                    contentContainerStyle={styles.flatlist}
                    style={{marginTop: hp(10), height: hp(75)}}/>

                <TouchableOpacity style={styles.bigBtnContainer} onPress={() => {
                    this.props.navigation.navigate("Home");
                    AsyncStorage.setItem("userUUID", "")}}>
                    <Text style={styles.bigBText}>LOG OUT</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderQuiz(item){
        return (
            <View style= {styles.itemBackground} onLayout={this.onLayout}>
                <Text style = {styles.itemText}>{item.name}</Text>
            </View>
        );
    }

    onLayout(event){
        console.log(event.nativeEvent.layout);
    }
}
