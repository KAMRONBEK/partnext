import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Lable from '../../Common/constants/English';
import style from '../../AuthFont/style';
import Button from '../Components/Button';
import { Images } from '../../Common/constants/Images';
import SpaceStyles from '../../Common/style/SpaceStyles';
import CommonStyles from '../../Common/style/CommonStyles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { uploadImageCall } from '../../Core/Redux/Services/AuthServices';
import { updateProfileCall } from '../../Core/Redux/Services/ProfileServices';
import CommonHeader from '../../Common/Components/Header/CommonHeader';
import Toast from "react-native-simple-toast";
import LoaderModal from '../../Common/Components/Loadar/LoaderModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../Core/StackParamLists/AuthStackParamList';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'OnBoarding_6'>;
  route: RouteProp<AuthStackParamList, 'OnBoarding_6'>;
};

export default function OnBoarding_6({ navigation, route }: Props) {

  const { linkedin_url, experience, about_us, partnership_reason, organization, current_position, partner_intersts, user_category, partner_category, user_intersts } = route?.params

  const [firstImageFile, setFirstImageFile] = React.useState<any>({});
  const [secondImageFile, setSecondImageFile] = React.useState<any>({});
  const [thirdImageFile, setThirdImageFile] = React.useState<any>({});
  const [forthImageFile, setForthImageFile] = React.useState<any>({});
  const [fifthImageFile, setFifthImageFile] = React.useState<any>({});
  const [sixthImageFile, setSixthImageFile] = React.useState<any>({});
  const [imageId, setImageId] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadImage = (obj) => {
    setLoading(true)
    const userData = new FormData();
    userData.append(`media`, obj)
    uploadImageCall(userData)
      .then((res: any) => {
        imageId.push({ image: res?.data?.data[0]?.id })
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      });
  }

  const picFirstImage = (num) => {
    try {
      launchImageLibrary({
        quality: 1,
        maxWidth: 768,
        maxHeight: 1024,
        mediaType: 'photo',
        includeBase64: true,
      }, (response: any) => {
        if (response?.didCancel != true) {

          let file = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].name != null ? response.assets[0].name : response.assets[0].uri,
            size: response.assets[0].size
          }
          uploadImage(file)

          if (num == 1) {
            setFirstImageFile(response?.assets[0])
          }
          if (num == 2) {
            setSecondImageFile(response?.assets[0])
          }
          if (num == 3) {
            setThirdImageFile(response?.assets[0])
          }
          if (num == 4) {
            setForthImageFile(response?.assets[0])
          }
          if (num == 5) {
            setFifthImageFile(response?.assets[0])
          }
          if (num == 6) {
            setSixthImageFile(response?.assets[0])
          }
          let array = []
          response?.assets?.map((i) => {
            let file = {
              uri: i.uri,
              type: i.type,
              name: i.fileName != null ? i.fileName : i.uri,
              size: i.fileSize
            }
            array.push(file)
          })
        }
      });
    } catch (e) {
    }
  }

  const registerApi = () => {

    if (imageId.length < 2) {
      return Toast.showWithGravity('Please upload minimum 2 photos', Toast.SHORT, Toast.BOTTOM);
    }

    const data = {
      linkedin_url: linkedin_url,
      experience: experience,
      about_us: about_us,
      partnership_reason: partnership_reason,
      organization: organization,
      current_position: current_position,
      partner_intersts: partner_intersts,
      user_category: user_category,
      partner_category: partner_category,
      user_intersts: user_intersts,
      user_images: imageId
    }

    updateProfileCall(data)
      .then((res: any) => {
        if (res?.data?.code == 200) {
          Toast.showWithGravity(res?.data?.message, Toast.SHORT, Toast.BOTTOM);
          // navigation.navigate('GrowUnlocked')
          navigation.navigate('RegistrationComplete')
        }
        if (res?.data?.code == 400) {
          Toast.showWithGravity(res?.data?.message, Toast.SHORT, Toast.BOTTOM);
        }
        console.log(res?.data?.data?.user_intersts[0]);

      })
      .catch((err) => {
      });
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F9FF' }}>
      <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{ backgroundColor: '#CEE8FF' }} />
        <LinearGradient style={[styles.container]} colors={['#CEE8FF', '#F2F9FF']}>
          <View style={styles.subView}>
            <CommonHeader
              onPressBack={() => navigation.goBack()}
              text={Lable.ADD_PHOTOS}
            />
            <LoaderModal
              loading={loading}
            />
            <Text style={style.smallText}>
              {Lable.THE_FIRST_IMAGE_WILL_BE_YOUR_PROFILE_TEXT}
            </Text>
            <Text style={style.smallText}>{Lable.ADD_AT_LEAST_2_PHOTO}</Text>

            <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.top2]}>
              <View style={CommonStyles.largeImageView}>
                <Image
                  style={CommonStyles.largeImageView}
                  source={{ uri: firstImageFile.uri }}
                />
                <TouchableOpacity
                  onPress={() => firstImageFile.uri ? setFirstImageFile({}) : picFirstImage(1)}
                  style={CommonStyles.plusPosition}>
                  <Image source={firstImageFile.uri ? Images.cancleImageIcon : Images.addImageIcon} />
                </TouchableOpacity>
              </View>

              <View >
                <View style={[CommonStyles.smallImageView, SpaceStyles.top1]}>
                  <Image
                    style={CommonStyles.smallImageView}
                    source={{ uri: secondImageFile.uri }}
                  />
                  <TouchableOpacity
                    onPress={() => secondImageFile.uri ? setSecondImageFile({}) : picFirstImage(2)}
                    style={CommonStyles.plusPosition}>
                    <Image source={secondImageFile.uri ? Images.cancleImageIcon : Images.addImageIcon} />
                  </TouchableOpacity>
                </View>
                <View style={[CommonStyles.smallImageView, SpaceStyles.top2]}>
                  <Image
                    style={CommonStyles.smallImageView}
                    source={{ uri: thirdImageFile.uri }}
                  />
                  <TouchableOpacity
                    onPress={() => thirdImageFile.uri ? setThirdImageFile({}) : picFirstImage(3)}
                    style={CommonStyles.plusPosition}>
                    <Image source={thirdImageFile.uri ? Images.cancleImageIcon : Images.addImageIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.top2]}>
              <View style={CommonStyles.smallImageView}>
                <Image
                  style={CommonStyles.smallImageView}
                  source={{ uri: forthImageFile.uri }}
                />
                <TouchableOpacity
                  onPress={() => forthImageFile.uri ? setForthImageFile({}) : picFirstImage(4)}
                  style={CommonStyles.plusPosition}>
                  <Image source={forthImageFile.uri ? Images.cancleImageIcon : Images.addImageIcon} />
                </TouchableOpacity>
              </View>
              <View style={CommonStyles.smallImageView}>
                <Image
                  style={CommonStyles.smallImageView}
                  source={{ uri: fifthImageFile.uri }}
                />
                <TouchableOpacity
                  onPress={() => fifthImageFile.uri ? setFifthImageFile({}) : picFirstImage(5)}
                  style={CommonStyles.plusPosition}>
                  <Image source={fifthImageFile.uri ? Images.cancleImageIcon : Images.addImageIcon} />
                </TouchableOpacity>
              </View>
              <View style={CommonStyles.smallImageView}>
                <Image
                  style={CommonStyles.smallImageView}
                  source={{ uri: sixthImageFile.uri }}
                />
                <TouchableOpacity
                  onPress={() => sixthImageFile.uri ? setSixthImageFile({}) : picFirstImage(6)}
                  style={CommonStyles.plusPosition}>
                  <Image source={sixthImageFile.uri ? Images.cancleImageIcon : Images.addImageIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <Button
              title={Lable.FINISH_REGISTRATION}
              onPress={() => registerApi()}
              buttonStyle={{ marginVertical: 24 }}
              width={undefined} unFilled={false}
            />
          </View>
        </LinearGradient>
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', bottom: 20, backgroundColor: '#F2F9FF' }}>
        <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
        <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
        <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
        <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
        <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
        <Image source={Images.currentScreen} style={SpaceStyles.left3} />
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
    width: '90%',
    alignSelf: 'center',
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