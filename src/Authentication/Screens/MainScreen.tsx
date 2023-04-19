import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommonButton from '../../Common/Components/Button/CommonButton';
import CustomText from '../../Common/Components/Text/CustomText';
import { Images } from '../../Common/constants/Images';
import CommonStyles from '../../Common/style/CommonStyles';
import SpaceStyles from '../../Common/style/SpaceStyles';
import TextStyles from '../../Common/style/TextStyles';
import messaging from '@react-native-firebase/messaging';

export default function MainScreen(props) {

    const { navigation } = props

    const checkToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
           console.log("fcmToken", fcmToken);
        } 
    }

    checkToken()
       

    return (
        <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={{ backgroundColor: '#CEE8FF' }} />
            <LinearGradient style={[styles.container]} colors={['#CEE8FF', '#F2F9FF']}>
                <View style={[SpaceStyles.spaceHorizontal, SpaceStyles.top5, { position: 'absolute' }]}>
                    <Image source={Images.partNextLogo}
                        resizeMode={'contain'}
                    />
                    <View style={[SpaceStyles.rowFlex, SpaceStyles.top1]}>
                        <Image source={Images.rightGreenArrow}
                            resizeMode={'contain'}
                        />
                        <CustomText numberOfLines={undefined} text={`Business opportunities`} style={[TextStyles.regular14DarkBlue, SpaceStyles.left3]} />
                    </View>
                    <View style={[SpaceStyles.rowFlex, SpaceStyles.top1]}>
                        <Image source={Images.rightGreenArrow}
                            resizeMode={'contain'}
                        />
                        <CustomText numberOfLines={undefined} text={`Partnerships`} style={[TextStyles.regular14DarkBlue, SpaceStyles.left3]} />
                    </View>
                    <View style={[SpaceStyles.rowFlex, SpaceStyles.top1]}>
                        <Image source={Images.rightGreenArrow}
                            resizeMode={'contain'}
                        />
                        <CustomText numberOfLines={undefined} text={`Connections`} style={[TextStyles.regular14DarkBlue, SpaceStyles.left3]} />
                    </View>
                </View>
                <Image source={Images.mainImage}
                    resizeMode={'contain'}
                    style={CommonStyles.mainImageView}
                />

                <CommonButton
                    onPress={() => navigation.navigate('Registration')}
                    title={'Start'}
                    containerStyle={[SpaceStyles.top5, { position: 'absolute', bottom: 90 }]}
                    whiteButton={false}
                />

                <TouchableOpacity style={{ position: 'absolute', bottom: 60, alignSelf: 'center' }} onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={[TextStyles.regular14DarkBlue]}>Already have an account?<Text style={{ textDecorationLine: 'underline' }}> Login</Text></Text>
                </TouchableOpacity>
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
