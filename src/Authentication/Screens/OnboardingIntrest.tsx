import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Lable from '../../Common/constants/English';
import style from '../../AuthFont/style';
import { COLORS } from '../../Common/constants/Colors';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { Images } from '../../Common/constants/Images';
import { getYourInterestsCall } from '../../Core/Redux/Services/AuthServices';
import CommonHeader from '../../Common/Components/Header/CommonHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../Core/StackParamLists/AuthStackParamList';
import { RouteProp } from '@react-navigation/native';
import Toast from "react-native-simple-toast";
import SpaceStyles from '../../Common/style/SpaceStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'OnboardingIntrest'>;
  route: RouteProp<AuthStackParamList, 'OnboardingIntrest'>;
};


export default function OnboardingIntrest({ navigation, route }: Props) {

  const { user_category, partner_category } = route.params

  const [others, setOthers] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState([]);
  const [tourInterestData, setYourInterestData] = useState([]);
  const [chip, setChip] = useState(false);
  const [otherValue, setOtherValue] = useState('');

  useEffect(() => { }, [chip]);

  useEffect(() => {
    getAllIntrest()
  }, []);

  const getAllIntrest = () => {
    getYourInterestsCall()
      .then((res: any) => {
        setYourInterestData(res?.data?.data)
      })
      .catch((err) => {
      });
  }

  const onChipPress = item => {
    ChoosenOrNot(item.id)
      ? setSelectedInterest(getNewArray(item.id))
      : selectedInterest.push({ intersts: item.id });
    item.id == 25 ? setOthers(true) : null;
  };

  const onOtherChipPress = (value) => {
    let dummy = []
    selectedInterest.map((i) => {
      if (i.intersts == 25) {
        i.intersts_text = value
      }
      dummy.push(i)
    })
    console.log(selectedInterest, "===selectedInterest====");
    setSelectedInterest(dummy)
  };

  const getNewArray = id => {
    var newArrayList = [];
    newArrayList = selectedInterest.filter(item => item.intersts != id);
    return newArrayList;
  };

  function ChoosenOrNot(id) {
    var temp = false;
    selectedInterest.map(item => {
      item.intersts == id ? (temp = true) : null;
    });

    return temp;
  }

  const screenChange = () => {
    if (selectedInterest.length == 0) {
      return Toast.showWithGravity('Please select any Your Interests', Toast.SHORT, Toast.BOTTOM);
    }

    navigation.navigate('PartnerInterestScreen', {
      user_intersts: selectedInterest,
      user_category: user_category,
      partner_category: partner_category
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F9FF' }}>
      <SafeAreaView style={{ backgroundColor: '#CEE8FF' }} />
      <KeyboardAwareScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <LinearGradient colors={['#CEE8FF', '#F2F9FF']}>
          <View style={styles.subView}>
            <CommonHeader
              onPressBack={() => navigation.goBack()}
              text={Lable.YOUR_INTEREST}
            />


            <View style={styles.wrapperView}>
              {tourInterestData.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => { onChipPress(item), setChip(!chip) }}
                    style={[
                      styles.chipCard,
                      {
                        borderWidth: 2,
                        borderColor: ChoosenOrNot(item.id)
                          ? '#0079D4'
                          : COLORS.WHITE,
                      },
                    ]}>
                    <Text style={style.smallText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {others ? (
              <Input
                height={50}
                imageSource={Images.close1}
                onImagePress={() => { setOthers(false), setSelectedInterest(getNewArray(28)) }}
                errorText={undefined} lable={undefined}
                // onChangeText={(value) => setOtherValue(value) }
                onChangeText={(value) => { onOtherChipPress(value), setOtherValue(value) }}
                keyboardType={undefined}
                inputStyle={undefined}
                inputHeight={undefined}
                error={undefined}
                multiline={false}
              />
            ) : (
              <View style={{ height: 50 }}></View>
            )}
            {/* <View style={styles.editView}>
              <Button width="47%"
                title={Lable.SAVE}
                unFilled={true}
                onPress={() => screenChange()}
                buttonStyle={undefined}
              />
              <Button
                width="47%"
                title={Lable.CANCEL}
                unFilled={true}
                onPress={() => setSelectedInterest([])}
                buttonStyle={undefined}
              />
            </View> */}
            <View style={styles.view}>
              <TouchableOpacity style={[styles.linkView, { alignSelf: 'center' }]}>
                <Text style={style.linkText}>{''}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => screenChange()}
                style={styles.logoView}>
                <LinearGradient
                  style={styles.logoContainer}
                  colors={['#0079D4', '#00B3EB']}>
                  <Image source={Images.right_arrow} style={styles.img1} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAwareScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', bottom: 20, position: 'absolute', backgroundColor: '#F2F9FF', width: '40%', alignSelf: 'center' }}>
        <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
        <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
        <Image source={Images.currentScreen} style={SpaceStyles.left3} />
        <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
        <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
        <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F9FF'
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
  chipCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  wrapperView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
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
  editView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  linkView: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.TITLE,
    marginLeft: 150,
  },
  view: {
    flexDirection: 'row',
    marginTop: 45,
    marginBottom: 45,
  },
  logoView: { alignSelf: 'flex-end', position: 'absolute', right: 0 },
});
