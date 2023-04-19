import React from 'react';
import { View, SafeAreaView, ScrollView, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../Core/StackParamLists/AppStackParamList';
import CommonStyles from '../../Common/style/CommonStyles';
import SpaceStyles from '../../Common/style/SpaceStyles';
import CustomText from '../../Common/Components/Text/CustomText';
import TextStyles from '../../Common/style/TextStyles';
import { COLORS } from '../../Common/constants/Colors';
import CommonButton from '../../Common/Components/Button/CommonButton';
import { Images } from '../../Common/constants/Images';

type props = {
    navigation: NativeStackNavigationProp<AppStackParamList, 'FeedbackThankyouScreen'>;
    route: RouteProp<AppStackParamList, 'FeedbackThankyouScreen'>;
};

const FeedbackThankyouScreen = ({ navigation, route }: props) => {

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ backgroundColor: COLORS.WHITE }} />
            <ScrollView style={[CommonStyles.container, { backgroundColor: COLORS.WHITE }]}>

                <Image
                    source={Images.AppLogo}
                    resizeMode={'contain'}
                    style={[SpaceStyles.alignSelf, SpaceStyles.top5]}
                />

                <CustomText
                    text={`Feedback Accepted`}
                    style={[TextStyles.regularDongle48DarkBlue, SpaceStyles.alignSelf]}
                    numberOfLines={undefined}
                />

                <CustomText
                    text={`Thank you for taking the time to send us feedback`}
                    style={[TextStyles.regular14DarkBlue, SpaceStyles.top1, SpaceStyles.width62, SpaceStyles.alignSelf, { textAlign: 'center' }]}
                    numberOfLines={undefined}
                />

                <CommonButton
                    onPress={() => navigation.navigate('HomeStack', { screen: 'Opportunities' })}
                    title={'Continue Browsing'}
                    containerStyle={SpaceStyles.top2}
                    whiteButton={false}
                />
            </ScrollView>
        </View>
    );
};

export default FeedbackThankyouScreen;