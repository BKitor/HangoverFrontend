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
        marginTop: hp(2)
    },
    titleContainer: {
        marginTop: hp(3),
        width: wp(90),
        height: hp(12),
        borderRadius: hp(2.1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: FONT,
        color: PRIMARY_DARK,
        fontSize: hp(5.5),
        textAlign: 'center'
    },
    makeOwnContainer: {
        width: wp(70),
        height: hp(10),
        backgroundColor: PRIMARY_DARK,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp(2)
    },
    useSavedContainer: {
        marginTop:hp(2),
        width: wp(70),
        height: hp(10),
        backgroundColor: ACCENT_GRAY,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp(2),
    },
    btnContainer: {
        width: wp(90),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(5)
    },
    makeOwnText: {
        fontFamily: FONT,
        fontSize: wp(7),
        color: ACCENT_GRAY,
        textAlign: 'center'
    },
    useSavedText: {
        fontFamily: FONT,
        fontSize: wp(7),
        color: PRIMARY_DARK,
        textAlign: 'center'
    },
});