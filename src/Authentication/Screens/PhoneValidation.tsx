import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import style from '../../AuthFont/style';
import Lable from '../../Common/constants/English';
import Button from '../Components/Button';
import Input from '../Components/Input';
import Link from '../Components/Link';
import { AuthStackParamList } from '../../Core/StackParamLists/AuthStackParamList';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Images } from '../../Common/constants/Images';
import { otpCall } from '../../Core/Redux/Services/AuthServices';
import { setAccessToken } from '../../Common/constants/GlobalFunction';
import Toast from "react-native-simple-toast";
import AsyncStorage from '@react-native-async-storage/async-storage';

type props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'PhoneValidation'>;
  route: RouteProp<AuthStackParamList, 'PhoneValidation'>;
};

export default function PhoneValidation({ navigation, route }: props) {

  const { phoneNumber, countryCode, screen } = route.params

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const checkVerification = () => {

    if (text == '') {
      return setError(true)
    }
    const data = {
      country_code: countryCode,
      phone_no: phoneNumber.charAt(0) == '0' ? phoneNumber.slice(1) : phoneNumber,
      otp: text
    }
    console.log(data, "====+++====");

    setLoading(true)
    otpCall(data)
      .then(async (res: any) => {
        setLoading(false)
        setAccessToken(res?.data?.data?.token)
        await AsyncStorage.setItem('token', res?.data?.data?.token);
        if (res?.data?.code == 200) {
          Toast.showWithGravity(res?.data?.message, Toast.SHORT, Toast.BOTTOM);
          if (screen == 'Login') {
            navigation.replace('AppStack')
          } else {
            navigation.replace('OnboardingToolTip')
          }
        } else {
          Toast.showWithGravity(res?.data?.message, Toast.SHORT, Toast.BOTTOM);
        }
      })
      .catch((err) => {
        setLoading(false)
      });
  }

  return (
    <LinearGradient style={styles.container} colors={['#CEE8FF', '#F2F9FF']}>
      <SafeAreaView style={{ backgroundColor: '#CEE8FF' }} />
      <View style={styles.subView}>
        <TouchableOpacity
          style={{ marginVertical: 10 }}
          onPress={() => navigation.goBack()}>
          <Image source={Images.backIcon} style={styles.img} />
        </TouchableOpacity>
        <Text style={[style.primaryTitle, styles.title]}>
          {Lable.POHNE_VALIDATION}
        </Text>
        <Input
          keyboardType="numeric"
          onChangeText={text => (setError(false), setText(text))}
          lable={Lable.PLEASE_ENTER_VALIDATION_CODE}
          errorText={error ? Lable.INVALID_CODE_MESSAGE : null}
          inputStyle={undefined}
          inputHeight={undefined}
          error={undefined}
          imageSource={undefined}
          onImagePress={undefined}
          multiline={undefined}
          height={undefined}
        />
        <Button
          title="Next"
          buttonStyle={styles.buttonStyle}
          onPress={() => checkVerification()}
          width={undefined} unFilled={false}
        />
        <View style={styles.view1}>
          <Text style={style.smallText}>{Lable.DID_NOT_GET_CODE}</Text>
          <Link
            linkText={Lable.RESEND_CODE}
            onPress={() => alert('Link pressed!')}
            linkStyle={undefined}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: { textAlign: 'center', marginTop: 9, marginBottom: 23 },
  subView: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  img: {
    width: 11,
    height: 16,
    marginTop: 15,
  },
  buttonStyle: {
    marginTop: 50,
    marginBottom: 16,
  },
  view1: { alignSelf: 'center', flexDirection: 'row' },
});
