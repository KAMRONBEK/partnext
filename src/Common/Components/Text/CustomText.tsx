import React from "react";
import { StyleSheet, Text } from "react-native";
import { COLORS } from "../../constants/Colors";

type props = {
  numberOfLines: any;
  text: String;
  style: Object
};

const CustomText = ({ numberOfLines, text, style }: props) => {
  return (
    <Text numberOfLines={numberOfLines} style={[styles.textStyle, style]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: COLORS.BLACK,
    fontSize: 14
  },
});

export default CustomText;
