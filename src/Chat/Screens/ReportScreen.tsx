import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../Core/StackParamLists/AppStackParamList';
import CommonStyles from '../../Common/style/CommonStyles';
import SpaceStyles from '../../Common/style/SpaceStyles';
import CustomText from '../../Common/Components/Text/CustomText';
import TextStyles from '../../Common/style/TextStyles';
import { COLORS } from '../../Common/constants/Colors';
import CustomeTextInput from '../../Common/Components/TextInput/CustomeTextInput';
import CommonHeader from '../../Common/Components/Header/CommonHeader';
import CommonButton from '../../Common/Components/Button/CommonButton';
import { reportApiCall } from '../../Core/Redux/Services/ChatServices';

type props = {
    navigation: NativeStackNavigationProp<AppStackParamList, 'ReportScreen'>;
    route: RouteProp<AppStackParamList, 'ReportScreen'>;
};

const ReportScreen = ({ navigation, route }: props) => {

    const { userId } = route?.params
    const [reason, setReason] = useState(false)

    const reportApi = () => {
        const data = {
            user: userId,
            reason: reason
        }
        reportApiCall(data)
            .then((res) => {
                navigation.navigate('ReportThankyouScreen')
            })
            .catch((err) => {
            });
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ backgroundColor: COLORS.WHITE }} />
            <ScrollView style={[CommonStyles.container, { backgroundColor: COLORS.WHITE, marginTop: 0 }]}>
                <CommonHeader
                    onPressBack={() => navigation.goBack()}
                    text={`Report User`}
                />

                <CustomText
                    text={`Details`}
                    style={[TextStyles.bold14DarkBlue, SpaceStyles.top3]}
                    numberOfLines={undefined}
                />
                <CustomeTextInput
                    defaultValue={''}
                    value={undefined}
                    placeholder={''}
                    containerStyle={[SpaceStyles.top1, { height: 120 }]}
                    containerInputText={{ textAlignVertical: 'top', paddingTop: 10, paddingBottom: 10, height: 120 }}
                    onChangeText={(text) => setReason(text)}
                    editable={true}
                    multiline={true}
                />

                <CommonButton
                    onPress={() => reportApi()}
                    title={'Send'}
                    containerStyle={SpaceStyles.top5}
                    whiteButton={false}
                />
            </ScrollView>
        </View>
    );
};

export default ReportScreen;