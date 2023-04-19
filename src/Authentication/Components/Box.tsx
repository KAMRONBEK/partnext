import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import style from '../../AuthFont/style';
import { COLORS } from '../../Common/constants/Colors';
import { Images } from '../../Common/constants/Images';

type props = {
  title: String;
  onPress2: () => void;
  onPress1: () => void;
  myRef: any;
  color1: string;
  color2: string;
  BoxStyle: object;
  onBoxPress: any;
  onLayout: any;
  isSlected: boolean;
};


export default function Box({
  title,
  onPress2,
  onPress1,
  myRef,
  color1,
  color2,
  BoxStyle,
  onBoxPress,
  isSlected,
  onLayout,
}: props) {
  return (
    <TouchableOpacity
      style={[styles.box, BoxStyle]}
      onPress={onBoxPress}
      onLayout={onLayout}
      ref={myRef}>
      <View style={styles.boxSubView}>
        <TouchableOpacity onPress={onBoxPress}>
          <LinearGradient style={styles.imageView} colors={[color1, color2]}>
            <Image source={isSlected ? Images.right : ''} style={styles.img} />
          </LinearGradient>
        </TouchableOpacity>
        <Text style={[style.smallText, { marginLeft: 11 }]}>{title}</Text>
      </View>
      <TouchableOpacity onLayout={onLayout} onPress={onPress2}>
        <Image source={Images.qusMarkicon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 50,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 17,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  imageView: {
    width: 24,
    height: 24,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: 16,
    height: 12,
  },
  img1: {
    width: 8,
    height: 15,
  },
});
