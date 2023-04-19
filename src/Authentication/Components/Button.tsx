import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import style from '../../AuthFont/style';
import { COLORS } from '../../Common/constants/Colors';

type props = {
  title: String;
  onPress: () => void;
  buttonStyle: Object,
  width: any,
  unFilled: boolean
};

export default function Button({ title, buttonStyle, onPress, width, unFilled }: props) {
  return (
    <LinearGradient
      style={[styles.view, buttonStyle, { width: width ? width : '70%' }]}
      colors={['#0079D4', '#00B3EB']}>
      <TouchableOpacity
        activeOpacity={unFilled ? 1 : null}
        style={[
          styles.btn,
          {
            backgroundColor: unFilled ? COLORS.WHITE : null,
            borderWidth: unFilled ? 2 : null,
            borderColor: unFilled ? COLORS.SECONDARY_BLUE : null,
          },
        ]}
        onPress={onPress}>
        <Text
          style={[
            style.buttonText,
            { color: unFilled ? COLORS.DARK_BLUE : COLORS.WHITE },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  view: {
    height: 50,
    alignSelf: 'center',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 50,
    width: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
