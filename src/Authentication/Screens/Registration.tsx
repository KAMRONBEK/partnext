import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Lable from '../../Common/constants/English';
import { AuthStackParamList } from '../../Core/StackParamLists/AuthStackParamList';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Link from '../Components/Link';
import Button from '../Components/Button';
import Input from '../Components/Input';
import style from '../../AuthFont/style';
import CountryList from '../Components/CountryCodes';
import { COLORS } from '../../Common/constants/Colors';
import { Images } from '../../Common/constants/Images';
import TextStyles from '../../Common/style/TextStyles';
import SpaceStyles from '../../Common/style/SpaceStyles';
import { registerCall } from '../../Core/Redux/Services/AuthServices';
import Toast from "react-native-simple-toast";
import Loader from '../Components/loader';
import PhoneInput from 'react-native-phone-number-input';

type props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Registration'>;
  route: RouteProp<AuthStackParamList, 'Registration'>;
};

export default function Registration({ navigation }: props) {
  const [check, setCheck] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  // const [countryCode, setContryCode] = useState('IN');
  const [countryDialCode, setContryDialCode] = useState('+91');
  const [fullName, setFullName] = useState('');
  const [validFullName, setValidFullName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileNomErr, setMobileNomErr] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setContryCode] = useState('+972');
  const [formattedValue, setFormattedValue] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  function checkMobileNo() {
    if (mobileNo == '') return true;
    else if (mobileNo.length <= 12 && mobileNo.length >= 7) {
      return true;
    } else {
      return false;
    }
  }
  const onNextPressed = async () => {
    if (fullName == '') {
      return setValidFullName(true)
    }
    else if (mobileNo == '') {
      return setMobileNomErr(true)
    }
    else if (mobileNo.length < 7 || mobileNo.length > 12) {
      return setMobileNomErr(true)
    }
    else if (!check) {
      return Toast.showWithGravity('Must agree to the terms and conditions and privacy policy', Toast.SHORT, Toast.BOTTOM);
    }

    const data = {
      full_name: fullName,
      country_code: countryCode,
      phone_no: mobileNo.charAt(0) == '0' ? mobileNo.slice(1) : mobileNo,
    }

    setLoading(true)
    registerCall(data)
      .then(async (res: any) => {
        setLoading(false)
        Toast.showWithGravity(res?.data?.message, Toast.SHORT, Toast.BOTTOM);
        navigation.replace('PhoneValidation', {
          phoneNumber: mobileNo,
          countryCode: countryCode,
          screen: 'Register'
        })
      })
      .catch((err) => {
        setLoading(false)
      });
  };

  console.log(countryCode, "===countryCode==")

  function getContryCode(item) {
    setContryCode(item.code);
    setContryDialCode(item.dial_code);
    setCountryModalVisible(false);
  }
  return (
    <LinearGradient style={styles.container} colors={['#CEE8FF', '#F2F9FF']}>
      <View style={styles.subView}>
        <Loader loading={loading} />
        <Text style={[style.primaryTitle, styles.titleText]}>
          {Lable.REGISTRATION}
        </Text>
        <Input
          lable={Lable.FULL_NAME}
          errorText={!validFullName ? null : Lable.INVALID_FULLNAME}
          onChangeText={text => { setFullName(text), setValidFullName(true), setValidFullName(false) }}
          keyboardType={undefined}
          inputStyle={undefined}
          inputHeight={undefined}
          error={undefined}
          imageSource={undefined}
          onImagePress={undefined}
          multiline={undefined}
          height={undefined}
        />
        <Text style={[style.smallText, { marginLeft: 3, marginBottom: 5 }]}>
          {Lable.PHONE_NUMBER}
        </Text>
        {/* <View style={styles.phoneView}>
          <TouchableOpacity
            onPress={() => setCountryModalVisible(true)}
            style={[
              styles.inputText,
              styles.inputText_,
              {
                borderColor: !checkMobileNo()
                  ? COLORS.ERROR_TEXT
                  : COLORS.BLUE,
              },
            ]}>
            <View style={{ flex: 0.8 }}>
              <Text style={{ color: COLORS.BLACK }}>{countryCode}</Text>
            </View>
            <View style={styles.arrowView}>
              <Image source={Images.Down_Arrow} style={{ width: 14, height: 9 }} />
            </View>
          </TouchableOpacity>
          <View style={[styles.inputText,
          {
            flexDirection: "row",
            alignItems: 'center',
            flex: 0.7,
            borderColor: !checkMobileNo()
              ? COLORS.ERROR_TEXT
              : COLORS.BLUE,
          },
          ]}>
            <Text style={{ color: COLORS.BLACK }}>{countryDialCode}</Text>
            <TextInput
              keyboardType="numeric"
              maxLength={10}
              onChangeText={text => (setMobileNo(text), checkMobileNo(), setMobileNomErr(false))}
              style={[SpaceStyles.width70, { paddingLeft: countryDialCode.length * 2, color: COLORS.BLACK }]}
            />
          </View>
        </View> */}

        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="IL"
          layout="second"
          withShadow
          autoFocus
          containerStyle={styles.phoneNumberView}
          // eslint-disable-next-line react-native/no-inline-styles
          textContainerStyle={{
            paddingVertical: 0,
            marginLeft: 20,
            borderRadius: 15,
            backgroundColor: 'white',
          }}
          onChangeCountry={(Country) => setContryCode("+" + Country.callingCode[0])}
          // eslint-disable-next-line react-native/no-inline-styles
          countryPickerButtonStyle={{
            borderRadius: 15,
            backgroundColor: 'white',
          }}
          onChangeText={text => {
            setMobileNo(text);
            setShowMessage(false)
            setMobileNomErr(false)
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
        />
        <Text style={[style.errorText, { marginVertical: 2, marginLeft: 3 }]}>
          {!mobileNomErr ? null : Lable.INVALID_PHONENO}
        </Text>

        <View style={[SpaceStyles.rowFlex, SpaceStyles.top2]}>
          <TouchableOpacity onPress={() => setCheck(!check)}>
            <Image
              source={check ? Images.Square_Check : Images.Rectangle}
              style={styles.img}
            />
          </TouchableOpacity>

          <Text style={[TextStyles.regular13Black, SpaceStyles.left3]}>{`I accept `}<Text style={[TextStyles.regular13Title, { textDecorationLine: 'underline' }]}>{`Terms & Condition`}</Text><Text style={TextStyles.regular13Black}>{` and `}</Text><Text style={[TextStyles.regular13Title, { textDecorationLine: 'underline' }]}>{`privacy policy`}</Text></Text>
        </View>

        <Button
          title={Lable.NEXT}
          buttonStyle={{ marginTop: 61 }}
          onPress={() => onNextPressed()} width={undefined} unFilled={false} />
        <View style={styles.view1}>
          <Text style={style.smallText}>
            {Lable.ALREADY_HAVE_ACCOUNT + ' '}
          </Text>
          <Link linkText={Lable.LOGIN} onPress={() => navigation.navigate('LoginScreen')} linkStyle={{ top: 1 }} />
        </View>
      </View>
      <Modal
        transparent={true}
        visible={countryModalVisible}
        onRequestClose={() => {
          setCountryModalVisible(!countryModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalSubView}>
              <Text
                style={[
                  styles.modalText,
                  { color: COLORS.BLACK, marginLeft: 20 },
                ]}>
                {Lable.SELECT_COUNTRY}
              </Text>
              <View style={styles.countryView}>
                <TouchableOpacity onPress={() => setCountryModalVisible(false)}>
                  <Image
                    source={Images.close1}
                    style={{ width: 15, height: 15 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.view2}>
              <ScrollView>
                {CountryList.map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() => getContryCode(item)}
                      style={styles.countryNameView}>
                      <View>
                        <Text style={{ color: COLORS.BLACK }}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
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
  phoneNumberView: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
  },
  img: {
    width: 24,
    height: 24,
  },
  view1: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 16,
  },
  phoneView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    height: 40,
    borderWidth: 1,

    paddingHorizontal: 10,
    color: COLORS.BLACK,
  },
  inputText_: {
    flex: 0.2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: { textAlign: 'center', marginTop: 41, marginBottom: 23 },
  acceptView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    textAlign: 'center',
  },
  modalSubView: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  countryView: {
    flex: 0.9,
    alignItems: 'flex-end',
  },
  countryNameView: {
    backgroundColor: COLORS.BLUE,
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
  },
  arrowView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 0.2,
  },
  dialCodeView: {
    position: 'absolute',
    top: 0,
    bottom: 3,
    left: 5,
    justifyContent: 'center',
  },
  view2: { width: '89%', alignSelf: 'center' },
});
