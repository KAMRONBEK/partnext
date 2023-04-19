import React, { useCallback, useState } from 'react';
import { Animated, Image, ScrollView, Text, View, ImageSourcePropType, TouchableOpacity, Linking } from 'react-native';
import CustomText from '../../../../Common/Components/Text/CustomText';
import { BaseStyle } from '../../../../Common/constants/BaseStyle';
import { Images } from '../../../../Common/constants/Images';
import CommonStyles from '../../../../Common/style/CommonStyles';
import SpaceStyles from '../../../../Common/style/SpaceStyles';
import TextStyles from '../../../../Common/style/TextStyles';
import { addLeftRightCall } from '../../../../Core/Redux/Services/HomeServices';
import { ACTION_OFFSET } from '../utils/constants';
import { styles } from './styles';

const WIDTH = (BaseStyle.DEVICE_WIDTH / 100)

type props = {
  allIndex: Number;
  allFriendData: Object;
  source: ImageSourcePropType;
  isFirst: Boolean;
  swipe: any;
  tiltSign: any;
  rest: any;
  item: any;
};

export default function Card({ item, allIndex, allFriendData, source, isFirst, swipe, tiltSign, ...rest }: props): JSX.Element {

  const [index, setIndex] = useState(0);

  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, ACTION_OFFSET],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, -25],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };


  const callRightApi = (status) => {
    // console.log(status, "...index....");

    // const data = {
    //   user: item?.id,
    //   connection_status: 2
    // }
    // addLeftRightCall(data)
    //   .then((res) => {
    //   })
    //   .catch((err) => {
    //   });
  }


  const renderChoice = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.likeContainer,
            { opacity: likeOpacity },
          ]}
        >
          <Image source={Images.likeIcon} />
          {callRightApi(1)}
        </Animated.View>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.nopeContainer,
            { opacity: nopeOpacity },
          ]}
        >
          {callRightApi(2)}
          <Image source={Images.disLikeIcon} />
        </Animated.View>
      </>
    );
  }, [likeOpacity, nopeOpacity]);

  const setIndexFun = () => {
    if (source?.user_images.length > index + 1) {
      setIndex(index + 1)
    } else {
      setIndex(0)
    }
  }

  return (
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...rest}
    >
      <View style={[SpaceStyles.alignSpaceBlock, { position: 'absolute', zIndex: 99999, top: 15, paddingHorizontal: WIDTH * 3 }]}>
        {source?.user_images.map((i, indexs) => {
          return (
            <View style={{ height: 5, borderRadius: 20, width: WIDTH * (70 / source?.user_images.length), backgroundColor: index == indexs ? '#FFFFFF' : '#FFFFFF80', marginRight: WIDTH * (15 / source?.user_images.length) }} />
          )
        })}
      </View>
      <TouchableOpacity activeOpacity={1} onPress={() => setIndexFun()}>
        <Image source={{ uri: source?.user_images[index]?.image?.media_file_url }} style={CommonStyles.topSwipeImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL('https://' + allFriendData.linkedin_url)} style={CommonStyles.linkedinLogo}>
        <Image source={Images.linkedinLogo} />
      </TouchableOpacity>
      <CustomText
        text={item?.full_name}
        style={[TextStyles.bold18DarkBlue, SpaceStyles.top2]} numberOfLines={undefined}
      />
      <CustomText
        text={item?.current_position}
        style={[TextStyles.regular14DarkBlue]} numberOfLines={undefined}
      />

      {isFirst && renderChoice()}
    </Animated.View>
  );
}
