import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {ACCENT_GRAY, FONT, PRIMARY_DARK, PRIMARY_LIGHT, SECONDARY, BASE} from "./common";

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: BASE,
        alignItems: 'center',
        justifyContent: 'center',
        height:hp(100),
        width:wp(100),
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
    nextButton: {
        position: 'absolute',
        backgroundColor: SECONDARY,
        bottom: hp(10),
        right: wp(3),
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