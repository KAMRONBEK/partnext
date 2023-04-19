import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommonButton from '../../Common/Components/Button/CommonButton';
import CustomText from '../../Common/Components/Text/CustomText';
import { Images } from '../../Common/constants/Images';
import SpaceStyles from '../../Common/style/SpaceStyles';
import TextStyles from '../../Common/style/TextStyles';
import { AuthStackParamList } from '../../Core/StackParamLists/AuthStackParamList';

type Props = {
    navigation: NativeStackNavigationProp<AuthStackParamList, 'RegistrationComplete'>;
    route: RouteProp<AuthStackParamList, 'RegistrationComplete'>;
};

export default function RegistrationComplete({ navigation, route }: Props) {

    return (
        <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={{ backgroundColor: '#CEE8FF' }} />
            <LinearGradient style={[styles.container]} colors={['#CEE8FF', '#F2F9FF']}>
                <View style={SpaceStyles.spaceHorizontal}>
                    <CustomText numberOfLines={undefined} text={`Registration Complete`} style={[TextStyles.regularDongle48DarkBlue, SpaceStyles.top5, { alignSelf: 'center' }]} />
                    <CustomText numberOfLines={undefined} text={`Slide right to talk business
It will be a Match if you both slide right.
Slide left if you don't think the partner shown is a good match.`} style={[TextStyles.regular14DarkBlue, SpaceStyles.top2, { alignSelf: 'center' }]} />
                </View>

                <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.spaceHorizontal]}>
                    <Image source={Images.swipDisLikeImage} style={{ marginTop: 150 }} />
                    <Image source={Images.swipLikeImage} />
                </View>

                <CommonButton
                    onPress={() => navigation.navigate('AppStack')}
                    title={'Start Browsing'}
                    containerStyle={[SpaceStyles.top8]}
                    whiteButton={false}
                />
            </LinearGradient>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F9FF'
    },
    img: {
        width: 11,
        height: 16,
        marginVertical: 15,
    },
    wrapperView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
        justifyContent: 'space-between',
    }
});
