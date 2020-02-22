import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { FONT, PRIMARY_DARK, SECONDARY, ACCENT_RED_LIGHT, ACCENT_GRAY } from './common';

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(100),
        width: wp(100),
    },

    titleContainer: {
        position: 'absolute',
        top: hp(2),
        height: hp(20),
    },
    titleText: {
        fontFamily: FONT,
        fontSize: wp(12),
        color: PRIMARY_DARK
    },

    playerScoreContainer: {
        height: hp(60)
    },
    playerScoreList: {
        flex: 1,
        flexGrow: 1,
        width: wp(80),
    },
    playerScoreTile: {
        marginTop: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: SECONDARY,
        borderRadius: wp(5),
    },
    playerScoreText: {
        margin: wp(3),
        fontFamily: FONT,
        fontSize: wp(8)
    },
    playerNameText: {
        margin: wp(3),
        fontFamily: FONT,
        fontSize: wp(5)
    },

    winnerTileStyle: {
        marginTop: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: ACCENT_RED_LIGHT,
        borderRadius: wp(5),
    },
    loserTileStyle: {
        marginTop: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: ACCENT_GRAY,
        borderRadius: wp(5),
    }


})