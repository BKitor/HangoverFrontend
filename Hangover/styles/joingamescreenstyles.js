import { StyleSheet } from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { FONT } from './common';

export default styles = StyleSheet.create({
    backgroundView:{
        flex:1,
        alignItems:'center'
    },

    titleContainer:{
        alignItems:"center",
        justifyContent:"center",
        height:hp(30),
        width:wp(100),
    },
    titleText:{
        fontFamily:FONT,
        fontSize:wp(14),
    },

    
    playersJoinedContainer:{
        height:hp(50),
        width:wp(70),
        backgroundColor:'red',
    },
    playersJoinedText:{},
    playerTagList:{},
    playerTagContainer:{
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:5,
    },
    playerTagText:{
        fontFamily:FONT
    },

    userInputContainer:{
        height:hp(25),
    },
    playerNameInput:{
        height:'100%',
        width:'100%',
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