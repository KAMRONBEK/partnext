import React from 'react';
import { View } from 'react-native';
import { Images } from '../../../../Common/constants/Images';
import CommonStyles from '../../../../Common/style/CommonStyles';
import RoundButton from '../RoundButton';

type Props = {
  handleChoice: (index: Number, id: any) => void;
  userId: any;
};

export default function Footer({ handleChoice, userId }: Props): JSX.Element {
  return (
    <View style={CommonStyles.footerContainer}>
      <RoundButton
        name={Images.disLikeSmallIcon}
        onPress={() => handleChoice(-1, userId)}
      />
      <RoundButton
        name={Images.likeSmallIcon}
        onPress={() => handleChoice(1, userId)}
      />
    </View>
  );
}
