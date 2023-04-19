import React from 'react';
import { StyleSheet, TouchableOpacity, Image, ImageBackground, ImageSourcePropType } from 'react-native';
import { COLORS } from '../../Common/constants/Colors';
import { Images } from '../../Common/constants/Images';

type props = {
  imageSource: ImageSourcePropType;
  backgroundImage: ImageSourcePropType;
  imageStyle: object;
  cardStyle: object;
};

export default function Card({
  imageSource,
  imageStyle,
  cardStyle,
  backgroundImage,
}: props) {
  return (
    <ImageBackground
      source={backgroundImage}
      borderRadius={12}
      style={[styles.mainView, cardStyle]}>
      <TouchableOpacity
        style={[
          styles.view,
          { backgroundColor: imageSource ? COLORS.WHITE : COLORS.SECONDARY_BLUE },
        ]}>
        <Image
          source={imageSource ? imageSource : Images.plush}
          style={[imageStyle ? imageStyle : styles.img]}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: 96.36,
    height: 96.36,
    backgroundColor: COLORS.WHITE,
    borderRadius: 17.52,
  },
  view: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  img: { width: 15.93, height: 15.93 },
});
