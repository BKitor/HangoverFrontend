import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    FlatList,
    StyleSheet
} from 'react-native';
import {ACCENT_GRAY, PRIMARY_DARK,  DEBUG, PRIMARY_LIGHT, SECONDARY, FONT, BASE} from '../styles/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp, heightPercentageToDP} from "react-native-responsive-screen";
import * as Font from 'expo-font'
import styles from "../styles/savedquizzesscreen.js";

interface Props {
    navigation: any
}

let DATA = [
    {
        title: 'First Item',
        key: 'key1'//use the quizzes uuid?
    },
    {
        title: 'Second Item',
        key: 'key2'
    },
    {
        title: 'Third Item',
        key: 'key3'
    },
    {
        title: 'Fourth Item',
        key: 'key4'
    },
    {
        title: 'Fifth Item',
        key: 'key5'
    },
    {
        title: 'Sixth Item',
        key: 'key6'
    },
    {
        title: 'Seventh Item',
        key: 'key7'
    },
  ];
  let DATA2 = [
    {
        title: 'First Item',
        key: 'key1'
    },
    {
        title: 'Second Item',
        key: 'key2'
    },
  ];

export default class HomeScreen extends React.Component<Props> {
    state = {
        opacities: [],
    };

    componentDidMount(){
        //console.debug("true");
    }

    fixData(data){
        return [
        {key:"blank1"},
        {key:"blank2"},
         ...data,
         {key:"blank3"},
         {key:"blank4"}];
    }

    getOpacity(){
        if (this.state.opacities.length == 0)
            return 0.2;
        return this.state.opacities[this.state.opacities.length-1]+0.1
    }

    renderQuiz(quiz){
        if(quiz.title == null){
            return(
                <View style={styles.blankSpace}>
                </View>
            )
        } else {
            this.state.opacities.push(this.getOpacity());
            console.debug(this.state.opacities);
            return(
                <View style={{
                    opacity: this.state.opacities[this.state.opacities.length-1]+0.5
                }}>
                    <TouchableOpacity style={styles.quizContainer} onPress={() => {this.props.navigation.navigate("")}}>
                        <Text style={styles.quizText}>{quiz.title}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    handleScroll(){
        for(let quiz of this.state.opacities){
            //console.debug(quiz.props.style);
            //console.debug("****************************************************");
        }
    }

    render() {
        DATA = this.fixData(DATA);
        return (
            <KeyboardAvoidingView style={styles.background} behavior={'padding'} enabled>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>SAVED QUIZZES</Text>
                </View>
                <View pointerEvents='none' style={styles.selectionBox}>
                </View>
                <SafeAreaView style={styles.listContainer}>
                    <FlatList
                        data={DATA}
                        getItemLayout={(data, index) => (
                            {
                            length: styles.quizContainer.height,
                            offset: (styles.quizContainer.height+styles.quizContainer.marginBottom)*(index-2),
                            index
                        })}
                        initialScrollIndex={Math.floor(DATA.length/2)}
                        showsVerticalScrollIndicator={false}
                        onScroll={(event) => this.handleScroll()}
                        renderItem={({ item }) => this.renderQuiz(item)}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}