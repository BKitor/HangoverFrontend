import {StyleSheet} from "react-native";
import {hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

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
    btnText: {
        fontFamily: FONT,
        fontSize: wp(8)
    },
    btnContainer: {
        width: wp(90),
        height: hp(10),
        backgroundColor: '#fff',
        marginTop: hp(5),
        borderRadius: wp(3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        flex: 1,
        backgroundColor: ACCENT_GRAY,
        alignItems: 'center'
    },
    usernameText: {
        fontSize: wp(14),
        fontFamily: FONT
    },
    phoneText: {
        fontSize: wp(7),
        fontFamily: FONT,
        marginTop: hp(-2)
    },
    infoContainer:{
        height: hp(40),
        width: wp(100),
        backgroundColor: ACCENT_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    }
});