import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../Core/StackParamLists/AuthStackParamList';
import { RouteProp } from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import LinearGradient from 'react-native-linear-gradient';
import TextStyles from '../../Common/style/TextStyles';
import Loader from '../Components/loader';
import { loginCall } from '../../Core/Redux/Services/AuthServices';
import Toast from "react-native-simple-toast";

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'LoginScreen'>;
  route: RouteProp<AuthStackParamList, 'LoginScreen'>;
};

const LoginScreen = ({ navigation, route }: Props) => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+972');
  const [loading, setLoading] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  const sendVerification = async () => {
    if (phoneNumber == '') {
      return setShowMessage(true)
    }
    else if (phoneNumber.length < 7 || phoneNumber.length > 12) {
      return setShowMessage(true)
    }

    const data = {
      country_code: countryCode,
      phone_no: phoneNumber.charAt(0) == '0' ? phoneNumber.slice(1) : phoneNumber,
    }

    setLoading(true)
    loginCall(data)
      .then(async (res: any) => {
        setLoading(false)
        if (res?.data?.code == 200) {
          Toast.showWithGravity(res?.data?.message, Toast.SHORT, Toast.BOTTOM);
          navigation.replace('PhoneValidation', {
            phoneNumber: phoneNumber,
            countryCode: countryCode,
            screen: 'Login'
          })
        } else {
          Toast.showWithGravity(res?.data?.message, Toast.SHORT, Toast.BOTTOM);
        }
      })
      .catch((err) => {
        setLoading(false)
      });
  }

  return (
    <LinearGradient
      colors={['#CEE8FF', '#F2F9FF']}
      style={styleSheet.container}>
      <View style={styleSheet.MainContainer}>
        <Loader loading={loading} />
        <Text style={[TextStyles.regularDongle48DarkBlue, { paddingBottom: 20 }]}> Login </Text>
        <Text style={styleSheet.labelHeading}> Phone Number </Text>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="IL"
          layout="second"
          withShadow
          autoFocus
          containerStyle={styleSheet.phoneNumberView}
          // eslint-disable-next-line react-native/no-inline-styles
          textContainerStyle={{
            paddingVertical: 0,
            marginLeft: 20,
            borderRadius: 15,
            backgroundColor: 'white',
          }}
          onChangeCountry={(Country) => setCountryCode("+" + Country.callingCode[0])}
          // eslint-disable-next-line react-native/no-inline-styles
          countryPickerButtonStyle={{
            borderRadius: 15,
            backgroundColor: 'white',
          }}
          onChangeText={text => {
            setPhoneNumber(text);
            setShowMessage(false)
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
        />
        {showMessage && (
          <Text style={styleSheet.messageText}>
            Invalid phone number, please try again
          </Text>
        )}
        <TouchableOpacity
          style={styleSheet.touchButton}
          onPress={() => {
            sendVerification()
          }}>
          <LinearGradient
            colors={['#0079D4', '#00B3EB']}
            style={styleSheet.button}>
            <Text style={TextStyles.bold18White}>Send Verification Code</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styleSheet.textView}>
          <Text style={styleSheet.registerTextStyle}>
            Don't have an account yet?
          </Text>
          <Text
            style={styleSheet.registrationLink}
            onPress={() => navigation.navigate('Registration')}>
            Registration
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },

  heading: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 20,
    color: '#0C3F72',
    fontFamily: 'Dongle',
  },

  phoneNumberView: {
    width: '80%',
    height: 50,
    backgroundColor: 'transparent',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    padding: 15,
    paddingHorizontal: 25,
    backgroundColor: 'transparent',
    borderRadius: 25,
  },
  touchButton: {
    zIndex: 11111,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    width: '80%',
    padding: 15,
    backgroundColor: 'transparent',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerTextStyle: {
    color: '#0C3F72',
  },
  registrationLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#1593dd',
    paddingLeft: 5,
  },
  textView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  labelHeading: {
    color: '#0C3F72',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  messageText: {
    color: 'red',
    marginTop: 10,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
});
