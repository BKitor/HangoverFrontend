import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp, wp} from "react-native-responsive-screen";
import {ACCENT_GRAY, FONT, PRIMARY_DARK, PRIMARY_LIGHT} from "./common";

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: PRIMARY_LIGHT,
    },
    titleContainer:{
        alignItems: 'center',
        marginTop: hp(20),
    },
    title: {
        fontFamily: FONT,
        fontSize: wp(15),
        color: ACCENT_GRAY
    },
    subtitleContainer: {
        alignItems: 'center',
        marginTop: hp(5)
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
    subtitle: {
        fontFamily: FONT,
        fontSize: wp(7),
        color: ACCENT_GRAY,
        textAlign: 'center',
        width: wp(75)
    }
});