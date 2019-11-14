import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {ACCENT_GRAY, FONT, PRIMARY_LIGHT} from "./common";

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
    }
});