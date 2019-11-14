import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {ACCENT_GRAY, FONT, PRIMARY_DARK, PRIMARY_LIGHT, SECONDARY} from "./common";

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: PRIMARY_LIGHT,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: hp(15)
    },
    codeContainer: {
        marginTop: hp(5),
        width: wp(80),
        height: hp(12),
        borderRadius: hp(2.1),
        backgroundColor: SECONDARY,
        alignItems: 'center',
        justifyContent: 'center',
    },
    codeInput: {
        fontFamily: FONT,
        color: ACCENT_GRAY,
        fontSize: hp(7.2),
        textAlign: 'center'
    },
    loginContainer: {
        width: wp(40),
        height: hp(7),
        backgroundColor: PRIMARY_DARK,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp(2),
        marginLeft: hp(1),
        marginRight: wp(5)
    },
    signUpContainer: {
        width: wp(40),
        height: hp(7),
        backgroundColor: ACCENT_GRAY,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp(2),
    },
    btnContainer: {
        flexDirection: 'row',
        width: wp(90),
        alignItems: 'center',
        marginTop: hp(10)
    },
    loginText: {
        fontFamily: FONT,
        fontSize: wp(7),
        color: ACCENT_GRAY,
        textAlign: 'center'
    },
    signUpText: {
        fontFamily: FONT,
        fontSize: wp(7),
        color: PRIMARY_DARK,
        textAlign: 'center'
    },
});