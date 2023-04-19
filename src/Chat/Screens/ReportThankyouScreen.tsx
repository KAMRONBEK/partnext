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
    navigation: NativeStackNavigationProp<AppStackParamList, 'ReportThankyouScreen'>;
    route: RouteProp<AppStackParamList, 'ReportThankyouScreen'>;
};

const ReportThankyouScreen = ({ navigation, route }: props) => {

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
                    text={`Thank You for`}
                    style={[TextStyles.regularDongle48DarkBlue, SpaceStyles.alignSelf]}
                    numberOfLines={undefined}
                />
                <CustomText
                    text={`Reporting a User`}
                    style={[TextStyles.regularDongle48DarkBlue, SpaceStyles.alignSelf, { marginTop: -28 }]}
                    numberOfLines={undefined}
                />

                <CustomText
                    text={`Your reported profile will be reviewed and action will be taken.`}
                    style={[TextStyles.regular14DarkBlue, SpaceStyles.top1, SpaceStyles.width62, SpaceStyles.alignSelf, { textAlign: 'center' }]}
                    numberOfLines={undefined}
                />

                <CommonButton
                    onPress={() => navigation.navigate('AllChatListScreen')}
                    title={'Back to Chats'}
                    containerStyle={SpaceStyles.top2}
                    whiteButton={false}
                />
            </ScrollView>
        </View>
    );
};

export default ReportThankyouScreen;