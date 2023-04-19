import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType
} from 'react-native';
import style from '../../AuthFont/style';
import { COLORS } from '../../Common/constants/Colors';

type props = {
  errorText: any;
  lable: any;
  onChangeText: any;
  keyboardType: any;
  inputStyle: object;
  inputHeight: any;
  error: any;
  imageSource: ImageSourcePropType;
  onImagePress: () => void;
  multiline: boolean;
  height: any;
  defaultValue: any;
};

export default function Input({
  errorText,
  lable,
  onChangeText,
  keyboardType,
  inputStyle,
  inputHeight,
  error,
  imageSource,
  onImagePress,
  multiline,
  height,
  defaultValue
}: props) {
  return (
    <View style={[inputStyle, { height: height ? height : 90 }]}>
      {lable ? (
        <Text style={[style.smallText, { marginLeft: 3 }]}>{lable}</Text>
      ) : null}
      <TextInput
        multiline={multiline}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        defaultValue={defaultValue}
        style={[
          styles.inputView,
          {
            borderColor: error
              ? COLORS.ERROR_TEXT
              : errorText
                ? COLORS.ERROR_TEXT
                : COLORS.BLUE,
            height: inputHeight ? inputHeight : 40,
          },
        ]}
      />
      {errorText ? (
        <Text style={[style.errorText, { marginLeft: 3 }]}>{errorText}</Text>
      ) : null}

      {imageSource ? (
        <TouchableOpacity style={styles.imageView} onPress={onImagePress}>
          <Image source={imageSource} style={styles.img} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    marginTop: 5,
    marginBottom: 3,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    color: COLORS.BLACK,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  imageView: {
    position: 'absolute',
    right: 10,
    top: 12,
    width: 24,
    height: 24,
    backgroundColor: COLORS.DARK_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  img: {
    width: 12,
    height: 12,
  },
});
