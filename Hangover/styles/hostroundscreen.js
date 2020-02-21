import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ACCENT_RED_DARK, FONT, PRIMARY_DARK, PRIMARY_LIGHT, SECONDARY, BASE } from "./common";

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: BASE,
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(100),
        width: wp(100),
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
        fontSize: hp(5),
        textAlign: 'center'
    },
    promptContainer: {
        position: 'absolute',
        top: hp(20),
        width: wp(90),
        justifyContent: 'center',
        backgroundColor: PRIMARY_LIGHT,
        borderRadius: hp(2),
    },
    promptText: {
        fontFamily: FONT,
        color: BASE,
        fontSize: hp(3.5),
        paddingHorizontal: wp(5),
        textAlign: 'left'
    },

    answerDisplayContainer: {
        alignItems: "center",
        justifyContent: 'center'
    },
    answerList: {
        width: wp(80),
        flex: 1,
        flexGrow: 0.62,
    },
    answerContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: hp(1),
    },
    answerText: {
        marginLeft: 3,
        fontFamily: FONT,
        color: PRIMARY_DARK,
    },



    bigBtnContainer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(14),
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

    lockQuestionBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: wp(100),
        height:hp(10),
    },


    WBtn: {
        backgroundColor: ACCENT_RED_DARK,
        height: hp(10),
        width: wp(40),
        borderRadius: hp(2),
        justifyContent: 'center',
        zIndex: 10,
    },
    LBtn: {
        backgroundColor: PRIMARY_LIGHT,
        height: hp(10),
        width: wp(40),
        borderRadius: hp(2),
        justifyContent: 'center',
        zIndex: 10,
    },
    pickWLBtnText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: FONT,
        fontSize: hp(4),
    },


    nextButton: {
        backgroundColor: SECONDARY,
        height: hp(10),
        width: wp(40),
        borderRadius: hp(2),
        justifyContent: 'center',
        zIndex: 10,
    },
    nextButtonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: FONT,
        fontSize: hp(3),
    },
});