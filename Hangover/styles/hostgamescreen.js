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
    titleContainer: {
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
    headerText: {
        marginTop: hp(7),
        fontFamily: FONT,
        color: PRIMARY_DARK,
        fontSize: hp(3.5),
        textAlign: 'center'
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