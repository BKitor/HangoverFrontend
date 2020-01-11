import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { FONT, PRIMARY_DARK, ACCENT_GRAY } from '../styles/common';


type BottomBarButtonProps = {
  onPress: () => void,
  buttonText: string,
  locked?: boolean,
}



export const BottomBarButton: FunctionComponent<BottomBarButtonProps> = ({ onPress, buttonText, locked = false }) => {
  return (
    <TouchableOpacity
      style={locked ? styles.locked_btnContainer : styles.btnContainer}
      onPress={() => { locked ? () => { } : onPress() }}
    >
      <Text style={styles.btnText}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  locked_btnContainer: {
    position: 'absolute',
    bottom: 0,
    width: wp(100),
    height: hp(10),
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    width: wp(100),
    height: hp(10),
    backgroundColor: PRIMARY_DARK,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontFamily: FONT,
    fontSize: wp(7),
    color: ACCENT_GRAY,
  },
})