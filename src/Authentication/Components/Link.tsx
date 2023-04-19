import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../Common/constants/Colors';

type props = {
  linkText: String;
  onPress: () => void;
  linkStyle: Object
};

export default function Link({ linkText, onPress, linkStyle }: props) {
  return (
    <TouchableOpacity style={linkStyle} onPress={onPress}>
      <Text style={styles.text}>{linkText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    borderBottomWidth: 0.5,
    color: COLORS.TITLE,
    borderColor: COLORS.TITLE,
    fontSize: 13,
  },
});
