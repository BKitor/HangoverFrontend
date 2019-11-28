import { StyleSheet } from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { FONT, PRIMARY_DARK, PRIMARY_LIGHT, SECONDARY } from './common';

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
        top:hp(5),
        alignItems:"center",
        marginBottom:hp(2),
        height:hp(20),
        width:wp(100),
    },
    questionTypeText:{
        fontFamily:FONT,
        fontSize:wp(14),
    },

    questionContainer:{
        width:wp(70),
        backgroundColor:SECONDARY,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
    },
    questionText:{
        color:'white',
        fontFamily:FONT,
        fontSize:wp(8),
        margin:hp(2),
    },

    answerDisplayContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
    answerRow:{

        alignItems:"center",
    },
    answerContainer:{
        borderWidth:1,
        marginVertical:hp(5),
        marginHorizontal:wp(10),
        backgroundColor:'white',
        borderRadius:5,
        alignItems:'center',
        width:wp(30),
        height:hp(10),
    },
    answerText:{
        fontFamily:FONT,
        color:PRIMARY_DARK,
    },

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
        fontSize:wp(6),
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