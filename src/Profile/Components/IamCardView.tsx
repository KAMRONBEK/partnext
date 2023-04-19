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
    containerStyle: object
};

const IamCardView = ({ leftIcon, text, onPress, containerStyle }: props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[CommonStyles.profileSepreteView, containerStyle]}
        >
            <View style={SpaceStyles.rowFlex}>
                <Image
                    source={leftIcon}
                    resizeMode={'contain'}
                />
                <CustomText
                    style={[TextStyles.regular14DarkBlue, SpaceStyles.left3, { textAlign: 'center' }]}
                    text={text}
                    numberOfLines={undefined}
                />
            </View>
            <Image
                resizeMode={'contain'}
                source={Images.question}
                style={{ height: 25, width: 25, tintColor: '#0C3F72' }}
            />
        </TouchableOpacity>
    );
};

export default IamCardView;