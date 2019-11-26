import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {ACCENT_BLUE, ACCENT_GRAY, FONT, PRIMARY_DARK} from "./common";

export default styles = StyleSheet.create({
    bigBtnContainer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(10),
        backgroundColor: PRIMARY_DARK,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bigBText: {
        fontFamily: FONT,
        fontSize: wp(7),
        color: ACCENT_GRAY,
    },
    background: {
        flex: 1,
        backgroundColor: ACCENT_GRAY,
        alignItems: 'center'
    },
    flatlist: {
        alignItems: 'center',
    },
    itemText: {
        fontFamily: FONT,
        color: PRIMARY_DARK,
        fontSize: wp(12)
    },
    itemBackground: {
        borderRadius: wp(3),
        borderColor: "#000000",
        borderWidth: wp(.5),
        marginTop: hp(2),
        alignContent: 'center',
        alignItems: 'center',
        width: wp(80)
    }
});