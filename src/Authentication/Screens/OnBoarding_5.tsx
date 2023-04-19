import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Lable from '../../Common/constants/English';
import style from '../../AuthFont/style';
import Input from '../Components/Input';
import { COLORS } from '../../Common/constants/Colors';
import { Images } from '../../Common/constants/Images';
import CommonHeader from '../../Common/Components/Header/CommonHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../Core/StackParamLists/AuthStackParamList';
import { RouteProp } from '@react-navigation/native';
import TextStyles from '../../Common/style/TextStyles';
import SpaceStyles from '../../Common/style/SpaceStyles';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'OnBoarding_5'>;
  route: RouteProp<AuthStackParamList, 'OnBoarding_5'>;
};

export default function OnBoarding_5({ navigation, route }: Props) {

  const { partner_intersts, user_category, partner_category, user_intersts } = route?.params

  const [organization, setOrganization] = useState('');
  const [partnerShip, setPartnerShip] = useState('');
  const [aboutYourSelf, setAboutYourSelf] = useState('');
  const [yearExperience, setYearExperience] = useState('');
  const [linkdin, setLinkdin] = useState(null);
  const [isValidOrganization, setIsValidOrganization] = useState(true);
  const [isValidPartnerShip, setIsValidPartnerShip] = useState(true);
  const [isIsValidYourSelf, setIsValidYourSelf] = useState(true);
  const [isValidYearExperience, setIsValidYearExperience] = useState(true);
  const YEAR_EXPERIENCT = [
    { id: '1', year: '0-2' },
    { id: '2', year: '3-5' },
    { id: '3', year: '6-10' },
    { id: '4', year: '10+' },
    { id: '5', year: '20+' },
  ];
  const onNextPressed = () => {
    organization == ''
      ? setIsValidOrganization(false)
      : setIsValidOrganization(true);
    partnerShip == ''
      ? setIsValidPartnerShip(false)
      : setIsValidPartnerShip(true);
    aboutYourSelf == '' ? setIsValidYourSelf(false) : setIsValidYourSelf(true);
    yearExperience == ''
      ? setIsValidYearExperience(false)
      : setIsValidYearExperience(true);

    organization != '' &&
      partnerShip != '' &&
      aboutYourSelf != '' &&
      yearExperience != ''
      ? navigation.navigate('OnBoarding_6', {
        current_position: organization,
        organization: organization,
        partnership_reason: partnerShip,
        about_us: aboutYourSelf,
        experience: yearExperience,
        linkedin_url: linkdin,
        partner_intersts: partner_intersts,
        user_category: user_category,
        partner_category: partner_category,
        user_intersts: user_intersts
      })
      : console.log("Fill all value");
  };
  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#F2F9FF' }} showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ backgroundColor: '#CEE8FF' }} />
      <LinearGradient style={styles.container} colors={['#CEE8FF', '#F2F9FF']}>
        <View style={styles.subView}>

          <CommonHeader
            onPressBack={() => navigation.goBack()}
            text={Lable.TELL_USE_ABOUT_YOURSELF}
          />

          <Text style={[style.text1, { textAlign: 'center', marginTop: -40 }]}>
            {Lable.PLEASE_DO_NOT_MENTION_NUMBERS}
          </Text>
          <Input
            onChangeText={text => setOrganization(text)}
            inputStyle={styles.inputView}
            lable={Lable.YOUR_CURRENT_POSITION_ORGANIZATION}
            errorText={isValidOrganization ? null : Lable.THIS_FIELD_IS_REQUIRED}
            keyboardType={undefined} inputHeight={undefined}
            error={undefined} imageSource={0}
            onImagePress={undefined}
            multiline={false}
            height={undefined}
          />
          <Input
            multiline={true}
            onChangeText={text => setPartnerShip(text)}
            inputStyle={styles.inputView1}
            inputHeight={100}
            lable={Lable.WHAT_KIND_OF_PARTNERSHIP_ARE_YOU_LOOKING_FOR}
            errorText={isValidPartnerShip ? null : Lable.THIS_FIELD_IS_REQUIRED}
            keyboardType={undefined} error={undefined}
            imageSource={0}
            onImagePress={undefined}
            height={undefined}
          />
          <Text style={{ flexDirection: 'row', marginTop: 65 }}>
            <Text style={style.text1}>
              {Lable.TELL_USE_ABOUT_YOURSELF + ', '}
            </Text>
            <Text style={style.smallText}>
              {Lable.WHAT_YOU_ARE_PASSIONATE_ABOUT}
            </Text>
          </Text>
          <Input
            multiline={true}
            onChangeText={text => setAboutYourSelf(text)}
            inputStyle={{ height: 130 }}
            inputHeight={100}
            errorText={isIsValidYourSelf ? null : Lable.THIS_FIELD_IS_REQUIRED}
            lable={undefined}
            keyboardType={undefined}
            error={undefined}
            imageSource={0}
            onImagePress={undefined}
            height={undefined}
          />
          <Text style={[style.smallText, { marginBottom: 5, marginTop: 40 }]}>
            {Lable.YEARS_OF_EXPERIENCE}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {YEAR_EXPERIENCT.map(item => {
              return (
                <TouchableOpacity
                  style={[styles.yearView, item.year == yearExperience && { borderWidth: 2, borderColor: COLORS.NAVEY_BLUE }]}
                  onPress={() => setYearExperience(item.year)}>
                  <Text style={[style.smallText, item.year == yearExperience && { bottom: 2 }]}>{item.year}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {isValidYearExperience ? null : (
            <Text style={[style.errorText, { marginTop: 5 }]}>
              {Lable.THIS_FIELD_IS_REQUIRED}
            </Text>
          )}
          <Input
            inputStyle={styles.inputView2}
            lable={Lable.LINKEDIN_PROFILE_URL}
            errorText={undefined}
            onChangeText={text => setLinkdin(text)}
            keyboardType={undefined}
            inputHeight={undefined} error={undefined}
            imageSource={0}
            onImagePress={undefined}
            multiline={false}
            height={undefined} />
          <TouchableOpacity
            onPress={() => onNextPressed()}
            style={styles.rightArrowView}>
            <LinearGradient
              style={styles.logoContainer}
              colors={['#0079D4', '#00B3EB']}>
              <Image source={Images.right_arrow} style={styles.img1} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', bottom: 20, backgroundColor: '#F2F9FF' }}>
        <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
        <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
        <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
        <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
        <Image source={Images.currentScreen} style={SpaceStyles.left3} />
        <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subView: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  img: {
    width: 11,
    height: 16,
    marginVertical: 15,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img1: {
    width: 16,
    height: 24,
  },
  yearView: {
    backgroundColor: COLORS.WHITE,
    marginRight: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 10,
  },
  inputView: { marginTop: 23, height: 70 },
  inputView1: { height: 140 },
  inputView2: { marginTop: 20, height: 50 },
  rightArrowView: { alignSelf: 'flex-end', marginVertical: 30 },
});
