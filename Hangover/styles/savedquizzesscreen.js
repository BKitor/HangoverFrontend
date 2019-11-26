import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {BASE, ACCENT_GRAY, FONT, PRIMARY_DARK, PRIMARY_LIGHT, SECONDARY} from "./common";

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: BASE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        top: hp(5),
        position: 'absolute',
        width: wp(90),
        height: hp(15),
        borderRadius: hp(2.1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: FONT,
        color: PRIMARY_DARK,
        fontSize: wp(12),
        textAlign: 'center'
    },
    listContainer: {
        width: wp(100),
        height: hp(70),
        top: hp(20),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    selectionBox: {
        width: wp(90),
        height: hp(12),
        position: 'absolute',
        top: hp(49),
        zIndex: 999,
        borderStyle: 'solid',
        borderWidth: hp(0.3), 
        borderColor: '#000000',
        borderRadius: hp(2),
    },
    quizContainer: {
        width: wp(90),
        height: hp(12),
        backgroundColor: BASE,
        marginHorizontal: wp(5),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp(2),
        marginBottom: hp(5),
        shadowColor: "#000",
        shadowOffset: {width: 3, height: 0},
        shadowRadius: 5,
        shadowOpacity: 0.8,
    },
    quizText: {
        fontFamily: FONT,
        fontSize: wp(10),
        color: PRIMARY_DARK,
        textAlign: 'center'
    },
    blankSpace: {
        width: wp(90),
        height: hp(12),
        backgroundColor: BASE,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp(2.5),
    },
});