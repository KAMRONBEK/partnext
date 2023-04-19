import React, { useCallback, useRef } from 'react';
import { Animated, Image, ImageSourcePropType, TouchableWithoutFeedback } from 'react-native';

type Props = {
  name: ImageSourcePropType;
  onPress: () => void;
};

export default function RoundButton({ name, onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateScale = useCallback(
    (newValue) => {
      Animated.spring(scale, {
        toValue: newValue,
        friction: 4,
        useNativeDriver: true,
      }).start();
    },
    [scale]
  );

  return (
    <TouchableWithoutFeedback
      onPressIn={() => animateScale(0.8)}
      delayPressIn={0}
      onPressOut={() => {
        animateScale(1);
        onPress();
      }}
      delayPressOut={110}
    >
      <Animated.View style={[{ transform: [{ scale }] }]}>
        <Image
          source={name}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
