import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Lable from '../../Common/constants/English';
import style from '../../AuthFont/style';
import { Images } from '../../Common/constants/Images';
import SpaceStyles from '../../Common/style/SpaceStyles';
import CommonStyles from '../../Common/style/CommonStyles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { deleteImageCall, uploadImageCall } from '../../Core/Redux/Services/AuthServices';
import { updateProfileCall } from '../../Core/Redux/Services/ProfileServices';
import CommonHeader from '../../Common/Components/Header/CommonHeader';
import Toast from "react-native-simple-toast";
import CommonButton from '../../Common/Components/Button/CommonButton';
import { UserAction } from '../../Core/Redux/action/UserAction';
import { useDispatch, useSelector } from "react-redux";
import LoaderModal from '../../Common/Components/Loadar/LoaderModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../Core/StackParamLists/AppStackParamList';
import { RouteProp } from '@react-navigation/native';

type props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'EditPhotos'>;
  route: RouteProp<AppStackParamList, 'EditPhotos'>;
};

export default function EditPhotos({ navigation, route }: props) {

  const { image, userImagesId } = route?.params
  const dispatch = useDispatch()

  const [firstImageUploadedFile, setFirstImageUploadedFile] = useState(image[0]?.image);
  const [secondImageUploadedFile, setSecondImageUploadedFile] = useState(image[1]?.image);
  const [thirdImageUploadedFile, setThirdImageUploadedFile] = useState(image[2]?.image);
  const [forthImageUploadedFile, setForthImageUploadedFile] = useState(image[3]?.image);
  const [fifthImageUploadedFile, setFifthImageUploadedFile] = useState(image[4]?.image);
  const [sixthImageUploadedFile, setSixthImageUploadedFile] = useState(image[5]?.image);

  const [firstImageFile, setFirstImageFile] = React.useState<any>({});
  const [secondImageFile, setSecondImageFile] = React.useState<any>({});
  const [thirdImageFile, setThirdImageFile] = React.useState<any>({});
  const [forthImageFile, setForthImageFile] = React.useState<any>({});
  const [fifthImageFile, setFifthImageFile] = React.useState<any>({});
  const [sixthImageFile, setSixthImageFile] = React.useState<any>({});
  const [imageId, setImageId] = useState(userImagesId);
  const [loading, setLoading] = useState(false);

  console.log(imageId, "===========++++imageIdCCCC+++=====");

  const uploadImage = (obj) => {
    setLoading(true)
    const userData = new FormData();
    userData.append(`media`, obj)
    uploadImageCall(userData)
      .then((res: any) => {
        setLoading(false)
        let dummyArr = imageId
        dummyArr.push({ image: res?.data?.data[0]?.id })
        setImageId(dummyArr)
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

  console.log(route?.params?.yourInterstsId, "------route?.params?.yourInterstsId------");


  const registerApi = () => {
    if (imageId.length < 2) {
      return Toast.showWithGravity('Please upload minimum 2 photos', Toast.SHORT, Toast.BOTTOM);
    }
    setLoading(true)
    const data = {
      linkedin_url: route?.params?.userData?.linkedin_url,
      experience: route?.params?.userData?.experience,
      about_us: route?.params?.userData?.about_us,
      partnership_reason: route?.params?.userData?.partnership_reason,
      organization: route?.params?.userData?.organization,
      current_position: route?.params?.userData?.current_position,
      partner_intersts: route?.params?.partnerInterstsId,
      user_category: route?.params?.id,
      partner_category: route?.params?.lookingForid,
      user_intersts: route?.params?.yourInterstsId,
      user_images: imageId
    }
    console.log(data, ":=====::::::;");
    updateProfileCall(data)
      .then((res: any) => {
        dispatch(UserAction())
        setTimeout(() => { setLoading(false) }, 500)
        if (res?.data?.code == 200) {
          Toast.showWithGravity(res?.data?.message, Toast.SHORT, Toast.BOTTOM);
          navigation.goBack()
        }
      })
      .catch((err) => {
        setLoading(false)
      });
  }

  const deleteImage = (id, part) => {
    setLoading(true)
    let aa = []
    console.log(aa, "=====aa===");
    console.log(imageId, "=====imageId===");

    imageId?.map((i) => {
      if (i.image != id) {
        aa.push({ image: i.image })
      }
    })
    setImageId(aa)
    deleteImageCall(`${id}/`)
      .then((res) => {
        registerApi()
        if (part == 1) {
          setFirstImageUploadedFile('')
        } else if (part == 2) {
          setSecondImageUploadedFile('')
        } else if (part == 3) {
          setThirdImageUploadedFile('')
        } else if (part == 4) {
          setForthImageUploadedFile('')
          setForthImageFile({})
        } else if (part == 5) {
          setFifthImageUploadedFile('')
        } else if (part == 6) {
          setSixthImageUploadedFile('')
        }
      })
      .catch((err) => {
        setLoading(false)
      });
  }

  return (
    <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ backgroundColor: '#CEE8FF' }} />
      <LinearGradient style={[styles.container]} colors={['#CEE8FF', '#F2F9FF']}>
        <View style={styles.subView}>
          <CommonHeader
            onPressBack={() => navigation.goBack()}
            text={`Edit Photos`}
          />

          <LoaderModal
            loading={loading}
          />

          <Text style={style.smallText}>
            {Lable.THE_FIRST_IMAGE_WILL_BE_YOUR_PROFILE_TEXT}
          </Text>
          <Text style={style.smallText}>{Lable.ADD_AT_LEAST_2_PHOTO}</Text>

          <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.top2]}>
            {firstImageUploadedFile ?
              <View style={CommonStyles.largeImageView}>
                <Image
                  style={CommonStyles.largeImageView}
                  source={{ uri: firstImageUploadedFile?.media_file_url }}
                />
                <TouchableOpacity
                  onPress={() => firstImageUploadedFile ? deleteImage(firstImageUploadedFile?.id, 1) : picFirstImage(1)}
                  style={CommonStyles.plusPosition}>
                  <Image source={firstImageUploadedFile ? Images.cancleImageIcon : Images.addImageIcon} />
                </TouchableOpacity>
              </View>
              :
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
            }

            <View >
              {secondImageUploadedFile ?
                <View style={CommonStyles.smallImageView}>
                  <Image
                    style={CommonStyles.smallImageView}
                    source={{ uri: secondImageUploadedFile?.media_file_url }}
                  />
                  <TouchableOpacity
                    onPress={() => secondImageUploadedFile ? deleteImage(secondImageUploadedFile?.id, 2) : picFirstImage(2)}
                    style={CommonStyles.plusPosition}>
                    <Image source={secondImageUploadedFile ? Images.cancleImageIcon : Images.addImageIcon} />
                  </TouchableOpacity>
                </View>
                :
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
              }

              {thirdImageUploadedFile ?
                <View style={[CommonStyles.smallImageView, SpaceStyles.top2]}>
                  <Image
                    style={CommonStyles.smallImageView}
                    source={{ uri: thirdImageUploadedFile?.media_file_url }}
                  />
                  <TouchableOpacity
                    onPress={() => thirdImageUploadedFile ? deleteImage(thirdImageUploadedFile?.id, 3) : picFirstImage(3)}
                    style={CommonStyles.plusPosition}>
                    <Image source={thirdImageUploadedFile ? Images.cancleImageIcon : Images.addImageIcon} />
                  </TouchableOpacity>
                </View>
                :
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
              }
            </View>
          </View>

          <View style={[SpaceStyles.alignSpaceBlock]}>
            <>
              {forthImageUploadedFile ?
                <View style={[CommonStyles.smallImageView, SpaceStyles.top2]}>
                  <Image
                    style={CommonStyles.smallImageView}
                    source={{ uri: forthImageUploadedFile?.media_file_url }}
                  />
                  <TouchableOpacity
                    onPress={() => forthImageUploadedFile ? deleteImage(forthImageUploadedFile?.id, 4) : picFirstImage(4)}
                    style={CommonStyles.plusPosition}>
                    <Image source={forthImageUploadedFile ? Images.cancleImageIcon : Images.addImageIcon} />
                  </TouchableOpacity>
                </View>
                :
                <View style={[CommonStyles.smallImageView, SpaceStyles.top2]}>
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
              }

              {fifthImageUploadedFile ?
                <View style={[CommonStyles.smallImageView, SpaceStyles.top2]}>
                  <Image
                    style={CommonStyles.smallImageView}
                    source={{ uri: fifthImageUploadedFile?.media_file_url }}
                  />
                  <TouchableOpacity
                    onPress={() => fifthImageUploadedFile ? deleteImage(fifthImageUploadedFile?.id, 5) : picFirstImage(5)}
                    style={CommonStyles.plusPosition}>
                    <Image source={fifthImageUploadedFile ? Images.cancleImageIcon : Images.addImageIcon} />
                  </TouchableOpacity>
                </View>
                :
                <View style={[CommonStyles.smallImageView, SpaceStyles.top2]}>
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
              }

              {console.log(sixthImageUploadedFile, fifthImageUploadedFile, "----------")}

              {sixthImageUploadedFile ?
                <View style={[CommonStyles.smallImageView, SpaceStyles.top2]}>
                  <Image
                    style={CommonStyles.smallImageView}
                    source={{ uri: sixthImageUploadedFile?.media_file_url }}
                  />
                  <TouchableOpacity
                    onPress={() => sixthImageUploadedFile ? deleteImage(sixthImageUploadedFile?.id, 6) : picFirstImage(6)}
                    style={CommonStyles.plusPosition}>
                    <Image source={sixthImageUploadedFile ? Images.cancleImageIcon : Images.addImageIcon} />
                  </TouchableOpacity>
                </View>
                :
                <View style={[CommonStyles.smallImageView, SpaceStyles.top2]}>
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
              }
            </>
          </View>

          <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.top3, SpaceStyles.vertical2]}>
            <CommonButton
              onPress={() => registerApi()}
              title={'Save'}
              containerStyle={SpaceStyles.width40}
              whiteButton={false}
            />
            <CommonButton
              onPress={() => navigation.goBack()}
              title={'Cancel'}
              containerStyle={SpaceStyles.width40}
              whiteButton={true}
            />
          </View>

        </View>
      </LinearGradient>
    </ScrollView>
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
