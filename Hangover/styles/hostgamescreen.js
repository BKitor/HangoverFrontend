import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { FONT, PRIMARY_DARK, BASE } from "./common";

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
        top: hp(10),
        width: wp(90),
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: FONT,
        color: PRIMARY_DARK,
        fontSize: hp(6),
        textAlign: 'center'
    },
    playersJoinedText: {
        fontFamily: FONT,
        fontSize: wp(10),
        marginBottom: hp(2),
    },

    playerList: {
        flex: 1,
        flexGrow: 0.6,
        top: hp(17),
        width:wp(80),
    },
    playerTagContainer: {
        marginTop: hp(1),
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

    playerBubblesContainer: {
        top: hp(35),
        width: wp(100),
        height: hp(53),//(100-35-12) to end directly at PLAY button
        position: 'absolute',
        alignItems: 'center'
    },
    playerBubbleContainer: {
        width: wp(60),
        height: hp(9),
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderRadius: hp(2),
        justifyContent: 'space-around',
        margin: hp(1),
    },
    playerBubbleName: {
        fontFamily: FONT,
        fontSize: hp(3.5),
        color: PRIMARY_DARK,
        alignSelf: 'center',
    },
    playerIcon: {
        alignSelf: 'center',
        width: hp(7),
        height: hp(7),
    },
    bigBtnContainer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(12),
        backgroundColor: PRIMARY_DARK,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bigBText: {
        fontFamily: FONT,
        color: BASE,
        fontSize: hp(3.5),
        textAlign: 'center'
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