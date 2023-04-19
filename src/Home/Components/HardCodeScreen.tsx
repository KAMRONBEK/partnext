import React from "react";
import { View, Image } from "react-native";
import CustomText from "../../Common/Components/Text/CustomText";
import { Images } from "../../Common/constants/Images";
import SpaceStyles from "../../Common/style/SpaceStyles";
import TextStyles from "../../Common/style/TextStyles";

const HardCodeScreen = ({ }) => {

    return (
        <View style={[SpaceStyles.top5, { flex: 1, alignItems: 'center' }]}>
            <Image source={Images.hardCodeSwipeIcon} />
            <CustomText
                text={`Wow, That's a lot of`}
                style={[TextStyles.regularDongle48DarkBlue, SpaceStyles.top3, { textAlign: 'center', lineHeight: 48 }]}
                numberOfLines={undefined}
            />
            <CustomText
                text={`swipes today!`}
                style={[TextStyles.regularDongle48DarkBlue, { textAlign: 'center', marginTop: -32 }]}
                numberOfLines={undefined}
            />
            <CustomText
                text={`Check back soon, we'll have new profiles to show you`}
                style={[TextStyles.regular14DarkBlue, SpaceStyles.top1, SpaceStyles.width62, { textAlign: 'center' }]}
                numberOfLines={undefined}
            />
        </View>
    );
};

export default HardCodeScreen;