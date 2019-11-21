import { StyleSheet } from "react-native";
import { FONT } from './common';

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        height: '100%',
    },
    gameTitleText: {
        flex:0.1,
        fontFamily: FONT
    },
    playersHeaderText: {
        flex:0.1,
        fontFamily: FONT,
    },
    playerTilesViewLeft:{
        flex:0.5,
    },
    playerTilesViewRight:{
        flex:0.5,
    },
    playerTileText: {
        fontFamily: FONT,
    },
    playerNameFieldTextInput: {
        flex:0.1,
        fontFamily: FONT,
    },
    footerText: {
        flex:0.1,
        fontFamily: FONT,
    },
});