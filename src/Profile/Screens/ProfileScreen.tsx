import React, { useState } from 'react';
import { View, Image, TouchableOpacity, SafeAreaView, Alert, Share } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../Core/StackParamLists/AppStackParamList';
import CommonStyles from '../../Common/style/CommonStyles';
import { Images } from '../../Common/constants/Images';
import SpaceStyles from '../../Common/style/SpaceStyles';
import CustomText from '../../Common/Components/Text/CustomText';
import TextStyles from '../../Common/style/TextStyles';
import ProfileSeparateButton from '../Components/ProfileSeparateButton';
import { COLORS } from '../../Common/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../../Core/Redux/config/apiConfig';
import { useDispatch, useSelector } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import { logout,deleteUserAccountCall } from '../../Core/Redux/Services/AuthServices';

type props = {
    navigation: NativeStackNavigationProp<AppStackParamList, 'ProfileScreen'>;
    route: RouteProp<AppStackParamList, 'ProfileScreen'>;
};

interface RootState {
    user: any
}

const ProfileScreen = ({ navigation, route }: props) => {

    // const userData = useSelector((state) => state.user.userData);
    const userData = useSelector((state: RootState) => state.user.userData);

    const [whatIAm, setWhatIAm] = useState(userData?.data?.user_category);
    const [lookingFor, setLookingFor] = useState(userData?.data?.partner_category);
    const [yourIntersts, setYourIntersts] = useState(userData?.data?.user_intersts);
    const [partnerIntersts, setPartnerIntersts] = useState(userData?.data?.partner_intersts);
    const [userImages, setUserImages] = useState(userData?.data?.user_images);

    // console.log(partnerIntersts, "===partnerIntersts===");

    const logOut = () => {
        Alert.alert(
            'Logout',
            'Are you sure? You want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        logout(instance.defaults.headers.common["Authorization"])
                        delete instance.defaults.headers.common["Authorization"]
                        AsyncStorage.clear();
                        navigation.replace('AuthStack')
                    },
                },
            ],
            { cancelable: false },
        );
    }

    const uploadImage = () => {
        let whatIAmid = []
        whatIAm.map((i) => {
            whatIAmid.push({ category: i.category.id })
        })

        let lookingForid = []
        lookingFor.map((i) => {
            lookingForid.push({ category: i.category.id })
        })

        let yourInterstsId = []
        yourIntersts.map((i) => {
            if (i?.intersts?.id == 25) {
                if (i?.intersts_text != null) {
                    yourInterstsId.push({ intersts_text: i?.intersts_text, intersts: i?.intersts?.id })
                } else {
                    yourInterstsId.push({ intersts: i?.intersts?.id })
                }
            } else {
                yourInterstsId.push({ intersts: i?.intersts?.id })
            }
        })

        let partnerInterstsId = []
        partnerIntersts.map((i) => {
            console.log(i?.intersts_text, "----i?.intersts_text-----");

            if (i?.intersts?.id == 25) {
                if (i?.intersts_text != null) {
                    partnerInterstsId.push({ intersts_text: i?.intersts_text, intersts: i?.intersts?.id })
                } else {
                    partnerInterstsId.push({ intersts: i?.intersts?.id })
                }
            } else {
                partnerInterstsId.push({ intersts: i?.intersts?.id })
            }
        })

        let userImagesId = []
        userData?.data?.user_images?.map((i) => {
            userImagesId.push({ image: i.image.id })
        })

        navigation.navigate('EditPhotos', {
            id: whatIAmid,
            userData: userData?.data,
            lookingForid: lookingForid,
            yourInterstsId: yourInterstsId,
            partnerInterstsId: partnerInterstsId,
            userImagesId: userImagesId,
            image: userData?.data?.user_images
        })
    }


    const shareFun = async () => {
        try {
            const result = await Share.share({
                message: `Partnext App helps entrepreneurs and businessmen find their ultimate partners
                Google play - https://play.google.com/store/apps/details?id=com.partnext

                App store - https://apps.apple.com/il/app/partnext/id1660238779
                `,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const deleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'Are you sure? You want to delete account?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: 'Confirm',
                    onPress: async() => {
                        try{
                            const res= await deleteUserAccountCall()
                            console.log("user dataaa---",res.data)
                            delete instance.defaults.headers.common["Authorization"]
                            AsyncStorage.clear();
                            navigation.replace('AuthStack')
                        }catch(error){
                            console.log("dataa-a---error",error)
                        }
                        // logout(instance.defaults.headers.common["Authorization"])
                        // delete instance.defaults.headers.common["Authorization"]
                        // AsyncStorage.clear();
                        // navigation.replace('AuthStack')
                    },
                },
            ],
            { cancelable: false },
        );
    }
    return (
        <View style={[CommonStyles.mainContainer, { backgroundColor: '#F2F9FF' }]}>
            <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUND }} />
            <LinearGradient style={{}} colors={['#CEE8FF', '#F2F9FF']}>
                <View style={[CommonStyles.profileImageView, CommonStyles.secondContainer]}>
                    <Image
                        style={CommonStyles.profileImage}
                        // source={Images.userImage}
                        source={{ uri: userData?.data?.user_images[0]?.image?.media_file_url }}

                    />
                    <TouchableOpacity
                        // onPress={() => navigation.navigate('EditPhotos', {
                        //     image: userData?.data?.user_images
                        // })}
                        onPress={() => uploadImage()}
                        activeOpacity={0.7}
                        style={CommonStyles.editProfileIcon}>
                        <Image source={Images.cameraIcon} />
                    </TouchableOpacity>
                </View>

                <CustomText
                    style={[TextStyles.regular14DarkBlue, SpaceStyles.top2, { textAlign: 'center' }]}
                    text={userData?.data?.full_name}
                    numberOfLines={undefined}
                />
                <CustomText
                    style={[TextStyles.regular14DarkBlue, { textAlign: 'center' }]}
                    text={userData?.data?.country_code + userData?.data?.phone_no}
                    numberOfLines={undefined}
                />

                <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfileScreen')}
                    style={CommonStyles.editProfileButton}>
                    <CustomText
                        style={[TextStyles.semiBold14White, { textAlign: 'center' }]}
                        text={`Edit my profile`}
                        numberOfLines={undefined}
                    />
                </TouchableOpacity>
            </LinearGradient>

            <View style={[CommonStyles.profileWhiteContainer]}>
                <ProfileSeparateButton
                    leftIcon={Images.shareIcon}
                    text={`Share`}
                    onPress={() => shareFun()}
                />
                {/* <ProfileSeparateButton
                    leftIcon={Images.upgradeIcon}
                    text={`Upgrade`}
                    onPress={() => userData?.data?.subscription_status ? navigation.navigate('AfterUpgradeScreen') : navigation.navigate('BeforeUpgradeScreen')}
                /> */}
                <ProfileSeparateButton
                    leftIcon={Images.feedbackIcon}
                    text={`Send Feedback`}
                    onPress={() => navigation.navigate('FeedbackScreen')}
                />
                 <ProfileSeparateButton
                    leftIcon={Images.deleteIcon}
                    text={`Delete Account`}
                    imageStyle={{width:35,height:32}}
                    onPress={deleteAccount}
                />
                <ProfileSeparateButton
                    leftIcon={Images.shareIcon}
                    text={`Logout`}
                    onPress={() => logOut()}
                />
            </View>
        </View>
    );
};

export default ProfileScreen;