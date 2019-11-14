import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp, wp} from "react-native-responsive-screen";
import {ACCENT_GRAY, FONT, PRIMARY_DARK} from "./common";

export default styles = StyleSheet.create({
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