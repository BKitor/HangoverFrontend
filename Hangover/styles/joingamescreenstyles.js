import { StyleSheet } from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { FONT } from './common';

export default styles = StyleSheet.create({
    backgroundView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },

    titleContainer:{
        position:'absolute',
        top:0,
        alignItems:"center",
        // justifyContent:"center",
        height:hp(20),
        width:wp(100),
    },
    titleText:{
        fontFamily:FONT,
        fontSize:wp(14),
    },

    playersJoinedContainer:{
        width:wp(70),
    },
    playersJoinedText:{
        fontFamily:FONT,
        fontSize:wp(10)
    },
    playerTagList:{},
    playerTagContainer:{
        marginTop:hp(2),
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:10,
    },
    playerTagText:{
        fontFamily:FONT,
        fontSize:hp(3),
    },

    userInputContainer:{
    },
    playerNameInput:{
        height:hp(10),
        width: wp(70),
        borderRadius:10,
        fontFamily:FONT,
        fontSize:wp(14),
        backgroundColor:'white'
    },

    footerContainer:{
        position:'absolute',
        bottom:0,
        width:wp(100),
        height:hp(15),
        justifyContent:'center',
        alignItems:'center',
    },
    footerText:{
        fontFamily:FONT,
        fontSize:wp(7),
    },
});