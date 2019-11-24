import { StyleSheet, Dimensions } from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { FONT } from './common';

export default styles = StyleSheet.create({
    keyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    backgroundView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:wp(100),
        height:hp(100),
    },

    questionTypeContainer:{
        position:'absolute',
        top:0,
        alignItems:"center",
        // justifyContent:"center",
        height:hp(20),
        width:wp(100),
    },
    questionTypeText:{
        fontFamily:FONT,
        fontSize:wp(14),
    },

    questionContainer:{
        width:wp(70),
    },
    questionText:{
        fontFamily:FONT,
        fontSize:wp(10),
        marginBottom:hp(5),
    },

    answerContainer:{},

    playerResponseContainer:{
        position:'absolute',
        bottom:0,
        marginTop:hp(15),
        width:wp(100),
    },
    submitResponseTextInput:{
        height:hp(10),
        width: wp(70),
        borderRadius:10,
        borderWidth:2,
        fontFamily:FONT,
        textAlign:'center',
        fontSize:wp(6),
        backgroundColor:'white'
    },

    submitResponseButton:{
        width:wp(100),
        height:hp(15),
        justifyContent:'center',
        alignItems:'center',
    },
    submitResponseButtonText:{
        fontFamily:FONT,
        fontSize:wp(6),
    },
});s