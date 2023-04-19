import React from 'react';
import { View, Image, TouchableOpacity, Platform } from 'react-native';
import { Images } from '../../constants/Images';
import CommonStyles from '../../style/CommonStyles';
import SpaceStyles from '../../style/SpaceStyles';
import TextStyles from '../../style/TextStyles';
import CustomText from '../Text/CustomText';

type props = {
    onPressBack: () => void;
    text: String
};

const isIos = Platform.OS === "ios"

const CommonHeader = ({ onPressBack, text }: props) => {

    return (
        <View style={{}}>
            <TouchableOpacity style={[CommonStyles.backButtonView, SpaceStyles.top2]} onPress={onPressBack}>
                <Image
                    resizeMode={'contain'}
                    source={Images.backIcon}
                />
            </TouchableOpacity>

            <CustomText
                text={text}
                style={[TextStyles.regularDongle48DarkBlue, SpaceStyles.alignSelf, { marginTop: -10 }]}
                numberOfLines={undefined}
            />
            <View style={CommonStyles.backButtonView}>
            </View>


        </View>
    );
};

export default CommonHeader;