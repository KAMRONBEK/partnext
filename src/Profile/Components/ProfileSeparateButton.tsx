import React from "react";
import { View, Image, TouchableOpacity, ImageSourcePropType } from "react-native";
import CustomText from "../../Common/Components/Text/CustomText";
import { Images } from "../../Common/constants/Images";
import CommonStyles from "../../Common/style/CommonStyles";
import SpaceStyles from "../../Common/style/SpaceStyles";
import TextStyles from "../../Common/style/TextStyles";

type props = {
    leftIcon: ImageSourcePropType;
    text: String;
    onPress: () => void,
    imageStyle:{}
};

const ProfileSeparateButton = ({ leftIcon, text, onPress,imageStyle }: props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={CommonStyles.profileSepreteView}
        >
            <View style={SpaceStyles.rowFlex}>
                <Image
                    source={leftIcon}
                    resizeMode={'contain'}
                    style={imageStyle}
                />
                <CustomText
                    style={[TextStyles.regular14DarkBlue, SpaceStyles.left3, { textAlign: 'center' }]}
                    text={text}
                    numberOfLines={undefined}
                />
            </View>
            <Image
                resizeMode={'contain'}
                source={Images.rightArrow}
            />
        </TouchableOpacity>
    );
};

export default ProfileSeparateButton;