import { StyleSheet } from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { FONT, PRIMARY_DARK, PRIMARY_LIGHT } from './common';

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
        alignItems:'center',
        justifyContent:'center',
        bottom:0,
        marginTop:hp(15),
        width:wp(100),
    },
    submitResponseTextInput:{
        height:hp(5),
        width: wp(70),
        borderRadius:20,
        fontFamily:FONT,
        textAlign:'center',
        fontSize:wp(4),
        backgroundColor:'white',
        marginBottom:hp(2),
    },

    submitResponseButton:{
        width:wp(50),
        height:hp(13),
        borderRadius:100,
        backgroundColor:PRIMARY_DARK,
        marginBottom: hp(5),
        justifyContent:'center',
        alignItems:'center',
    },
    submitResponseButtonText:{
        fontFamily:FONT,
        fontSize:wp(6),
        color:'white',
    },
});