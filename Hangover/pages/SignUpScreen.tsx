import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Animated,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';
import {ACCENT_GRAY, PRIMARY_DARK,  DEBUG, PRIMARY_LIGHT, SECONDARY, FONT} from '../styles/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import * as Font from 'expo-font'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'


interface Props {
    navigation: any
}

/*
*
* UX is username / phone / password while backend is email / first / last / password / username
* */

export default class SignUpScreen extends React.Component<Props> {

    state = {
        username: '',
        phone: '',
        password: ''
    };


    createNewAccount() {

        const formData = new FormData();
        formData.append("first_name", "TEST");
        formData.append("last_name", "TEST");
        formData.append("email", `TEST${Date.now()}@queensu.ca`);
        formData.append("date_joined", "2019-10-20T00:00");
        formData.append("last_joined", "2019-10-20T00:00");
        formData.append("username", `${this.state.username}`);
        formData.append("password", this.state.password);

        axios({
            method: 'post',
            url: 'http://tixo.ca:7537/users/create/',
            data: formData,
        }).then((res) => {
            AsyncStorage.setItem("userUUID", res.data.id);
            console.log("Set async storage to the user ID: " + res.data.id);
        }).catch((error) => {
            console.log("error caught\n***********");
            console.log(error);
            console.log(error.response.data);
        });
        this.props.navigation.pop();
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.background} enabled>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>SIGN UP</Text>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.fieldContainer}>
                        <Icon name="user-circle" size={wp(13)} color={PRIMARY_DARK}/>
                        <TextInput style={styles.usernameInput} onChangeText={(text) => this.setState({username: text})} placeholder="Username" />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Icon name="phone" size={wp(13)} color={PRIMARY_DARK}/>
                        <TextInput style={styles.usernameInput}  onChangeText={(text) => this.setState({phone: text})} placeholder="Phone Number" />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Icon name="lock" size={wp(16)} color={PRIMARY_DARK}/>
                        <TextInput style={styles.passwordInput} secureTextEntry={true}  onChangeText={(text) => this.setState({password: text})} placeholder="Password" />
                    </View>
                </View>

                <TouchableOpacity style={styles.btnContainer} onPress={() => {this.createNewAccount()}}>
                    <Text style={styles.btnText}>CONTINUE</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: hp(10),
        alignItems: 'center'
    },
    fieldContainer:{
        flexDirection: 'row',
        width: wp(90),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(5)
    },
    usernameInput: {
        backgroundColor: "#fff",
        borderRadius: wp(2),
        height: hp(8),
        fontFamily: FONT,
        fontSize: wp(7),
        paddingLeft: wp(4),
        marginLeft: wp(5),
        width: wp(70)
    },
    passwordInput: {
        backgroundColor: "#fff",
        borderRadius: wp(2),
        height: hp(8),
        fontFamily: FONT,
        fontSize: wp(7),
        paddingLeft: wp(4),
        marginLeft: wp(5),
        width: wp(70)
    },
    background: {
        flex: 1,
        backgroundColor: ACCENT_GRAY,
        alignItems: 'center'
    },
    titleContainer: {
        marginTop: hp(20)
    },
    title: {
        color: PRIMARY_DARK,
        fontFamily: FONT,
        fontSize: hp(7)
    },
    btnContainer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(10),
        backgroundColor: PRIMARY_DARK,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontFamily: FONT,
        fontSize: wp(7),
        color: ACCENT_GRAY,
    },
});