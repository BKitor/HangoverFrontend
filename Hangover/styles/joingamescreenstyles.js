import { StyleSheet, Dimensions } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { FONT } from './common';


export const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(100),
        height: hp(100),
    },

    titleContainer: {
        position: 'absolute',
        top: 0,
        alignItems: "center",
        // justifyContent:"center",
        height: hp(20),
        width: wp(100),
    },
    titleText: {
        fontFamily: FONT,
        fontSize: wp(14),
    },

    playersJoinedContainer: {
        alignItems: "center",
        width: wp(70),
    },
    playersJoinedText: {
        fontFamily: FONT,
        fontSize: wp(10),
        marginBottom: hp(2),
    },
    playerList: {
        flex: 1,
        flexGrow: 0.6,
        top: hp(20),
    },
    playerTagContainer: {
        marginTop: hp(2),
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
    },
    playerTagText: {
        fontFamily: FONT,
        fontSize: hp(3),
    },

    userInputContainer: {
        marginTop: hp(5),
        width: wp(70),
    },
    nicknameText: {
        fontFamily: FONT,
    },
    playerNameInput: {
        height: hp(10),
        width: wp(70),
        borderRadius: 10,
        borderWidth: 2,
        fontFamily: FONT,
        textAlign: 'center',
        fontSize: wp(6),
        backgroundColor: 'white'
    },
    playerNameBadInput: {
        height: hp(10),
        width: wp(70),
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'red',
        color: 'red',
        fontFamily: FONT,
        textAlign: 'center',
        fontSize: wp(6),
        backgroundColor: 'white'
    },

    footerContainer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(15),
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontFamily: FONT,
        fontSize: wp(6),
    },
});


export const possibleFontAwesomeIcons = [
    'thumbs-up',
    'glass',
    'user',
    'check',
    'trash-o',
    'headphones',
    'plane',
    'fire',
    'eye',
    'lemon-o',
    'github',
    'bell',
    'flask'
]
