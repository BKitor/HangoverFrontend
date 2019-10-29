import React from 'react';
import {View, Text, StyleSheet, Image, Animated, TouchableOpacity, TextInput} from 'react-native';
import {ACCENT_GRAY, PRIMARY_DARK,  DEBUG, PRIMARY_LIGHT, SECONDARY, FONT} from '../styles/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/FontAwesome'
interface Props {
    navigation: any
}

export default class LogInScreen extends React.Component<Props> {

    render() {
        return (
            <View style={styles.background}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>LOG IN</Text>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.fieldContainer}>
                        <Icon name="user-circle" size={wp(13)} color={PRIMARY_DARK}/>
                        <TextInput style={styles.usernameInput} placeholder="Username" />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Icon name="lock" size={wp(16)} color={PRIMARY_DARK}/>
                        <TextInput style={styles.passwordInput} placeholder="Password" />
                    </View>
                </View>

                <TouchableOpacity style={styles.btnContainer} onPress={() => {this.props.navigation.navigate("")}}>
                    <Text style={styles.btnText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
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