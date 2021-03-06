import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ACCENT_GRAY, FONT, PRIMARY_DARK } from "./common";

export default styles = StyleSheet.create({
    background: {
        height: hp(100),
        width: wp(100),
        flex: 1,
        backgroundColor: ACCENT_GRAY,
        alignItems: 'center',
        justifyContent:'space-around'
    },

    titleContainer: {
        alignItems:'center'
    },
    title: {
        color: PRIMARY_DARK,
        fontFamily: FONT,
        fontSize: hp(7)
    },
    badLoginText:{
        color:'red',
        fontFamily:FONT,
    },
    
    inputContainer: {
        flex:.7,
        alignItems: 'center'
    },
    fieldContainer: {
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
        width: wp(70),
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
    bad_usernameInput: {
        backgroundColor: "#fff",
        borderRadius: wp(2),
        height: hp(8),
        fontFamily: FONT,
        fontSize: wp(7),
        paddingLeft: wp(4),
        marginLeft: wp(5),
        width: wp(70),
        borderColor: 'red',
        borderWidth: 1
    },
    bad_passwordInput: {
        backgroundColor: "#fff",
        borderRadius: wp(2),
        height: hp(8),
        fontFamily: FONT,
        fontSize: wp(7),
        paddingLeft: wp(4),
        marginLeft: wp(5),
        width: wp(70),
        borderColor: 'red',
        borderWidth: 1
    },

});