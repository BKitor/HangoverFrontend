// TODO: FIX THIS COMPONENT, it doesn't work and I don't know why
// Answer list will get called, but AnswerListTile wont
// when it works it should be used in HostRoundScreen and PlayRoundScreen

import React, { Component } from 'react';
import { FunctionComponent } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { FONT, PRIMARY_DARK, PRIMARY_LIGHT, SECONDARY } from '../styles/common';

interface Answer {
  answer_text: string,
  player_uuid: string
}

type AnswerListProps = {
  answers: Array<Answer>,
}

export const AnswerList: FunctionComponent<AnswerListProps> = ({ answers }) => {
  function AnswerListTile({ answer, index }) {
    return (
      <View style={styles.answerContainer}>
        <Text style={styles.answerText}>{answer.answer_text}</Text>
      </View>
    )
  }

  return (
    <FlatList
      style={styles.answerList}
      data={answers}
      keyExtractor={(item: Answer, index) => item.player_uuid}
      renderItem={({ item, index }) => <AnswerListTile answer={item} index={index} />}
    />
  )
}

const styles = StyleSheet.create({
  answerList: {
    flex:1,
    flexGrow:0.6,
    width:wp(65),
  },
  answerText: {
    marginLeft: 3,
    fontFamily: FONT,
    color: PRIMARY_DARK,
  },
  answerContainer: {
    marginTop: hp(1),
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },

})