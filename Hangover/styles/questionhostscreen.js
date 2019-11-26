import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {ACCENT_GRAY, FONT, PRIMARY_DARK, PRIMARY_LIGHT, SECONDARY, BASE} from "./common";

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: BASE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    promptContainer: {
        position: 'absolute',
        top: hp(10),
        width: wp(90),
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingTitleContainer: {
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