import React, { useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../Core/StackParamLists/AppStackParamList';
import CommonStyles from '../../Common/style/CommonStyles';
import SpaceStyles from '../../Common/style/SpaceStyles';
import CustomText from '../../Common/Components/Text/CustomText';
import TextStyles from '../../Common/style/TextStyles';
import { COLORS } from '../../Common/constants/Colors';
import CustomeTextInput from '../../Common/Components/TextInput/CustomeTextInput';
import CommonHeader from '../../Common/Components/Header/CommonHeader';
import { experienceData } from '../../Common/constants/GlobalFunction';
import CommonButton from '../../Common/Components/Button/CommonButton';
import { useDispatch, useSelector } from "react-redux";
import Loader from '../../Authentication/Components/loader';
import { updateProfileCall } from '../../Core/Redux/Services/ProfileServices';
import { useFocusEffect } from '@react-navigation/native';
import { UserAction } from '../../Core/Redux/action/UserAction';

type props = {
    navigation: NativeStackNavigationProp<AppStackParamList, 'EditProfileScreen'>;
    route: RouteProp<AppStackParamList, 'EditProfileScreen'>;
};

interface RootState {
    user: any
}

const EditProfileScreen = ({ navigation, route }: props) => {

    const dispatch = useDispatch()
    // const userData = useSelector((state) => state.user.userData);
    const userData = useSelector((state: RootState) => state.user.userData);

    const [loading, setLoading] = useState(false);
    const [yearExperience, setYearExperience] = useState(userData?.data?.experience);
    const [currentPosition, setCurrentPosition] = useState(userData?.data?.current_position);
    const [partnershipReason, setPartnershipReason] = useState(userData?.data?.partnership_reason);
    const [aboutUs, setAboutUs] = useState(userData?.data?.about_us);
    const [linkdinUrl, setLinkdinUrl] = useState(userData?.data?.linkedin_url);
    const [userImages, setUserImages] = useState(userData?.data?.user_images);

    useFocusEffect(
        React.useCallback(() => {
            dispatch(UserAction())
            return () => {
            };
        }, [])
    );

    const getAllId = (screen) => {
        let whatIAmid = []
        userData?.data?.user_category.map((i) => {
            whatIAmid.push({ category: i?.category?.id })
        })

        let lookingForid = []
        userData?.data?.partner_category.map((i) => {
            lookingForid.push({ category: i?.category?.id })
        })

        let yourInterstsId = []
        userData?.data?.user_intersts.map((i) => {
            if (i?.intersts?.id == 25) {
                yourInterstsId.push({ intersts_text: i?.intersts_text, intersts: i?.intersts?.id })
            } else {
                yourInterstsId.push({ intersts: i?.intersts?.id })
            }
        })

        let partnerInterstsId = []
        userData?.data?.partner_intersts.map((i) => {
            if (i?.intersts?.id == 25) {
                partnerInterstsId.push({ intersts_text: i?.intersts_text, intersts: i?.intersts?.id })
            } else {
                partnerInterstsId.push({ intersts: i?.intersts?.id })
            }
        })

        let userImagesId = []
        userImages.map((i) => {
            userImagesId.push({ image: i?.image?.id })
        })

        if (screen == 'whatIAm') {
            navigation.navigate('EditWhatIam', {
                id: whatIAmid,
                userData: userData?.data,
                lookingForid: lookingForid,
                yourInterstsId: yourInterstsId,
                partnerInterstsId: partnerInterstsId,
                userImagesId: userImagesId
            })
        }
        if (screen == 'EditLookIam') {
            navigation.navigate('EditLookIam', {
                id: whatIAmid,
                userData: userData?.data,
                lookingForid: lookingForid,
                yourInterstsId: yourInterstsId,
                partnerInterstsId: partnerInterstsId,
                userImagesId: userImagesId
            })
        }
        if (screen == 'YourInterestScreen') {
            navigation.navigate('YourInterestScreen', {
                id: whatIAmid,
                userData: userData?.data,
                lookingForid: lookingForid,
                yourInterstsId: yourInterstsId,
                partnerInterstsId: partnerInterstsId,
                userImagesId: userImagesId
            })
        }
        if (screen == 'PartnerInterestScreen') {
            navigation.navigate('PartnerInterestScreen', {
                id: whatIAmid,
                userData: userData?.data,
                lookingForid: lookingForid,
                yourInterstsId: yourInterstsId,
                partnerInterstsId: partnerInterstsId,
                userImagesId: userImagesId
            })
        }
    }


    const registerApi = () => {

        let whatIAmid = []
        userData?.data?.user_category.map((i) => {
            whatIAmid.push({ category: i?.category?.id })
        })

        let lookingForid = []
        userData?.data?.partner_category.map((i) => {
            lookingForid.push({ category: i?.category?.id })
        })

        let yourInterstsId = []
        userData?.data?.user_intersts.map((i) => {
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
        userData?.data?.partner_intersts.map((i) => {
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
        userImages.map((i) => {
            userImagesId.push({ image: i?.image?.id })
        })


        const data = {
            linkedin_url: linkdinUrl,
            experience: yearExperience,
            about_us: aboutUs,
            partnership_reason: partnershipReason,
            organization: currentPosition,
            current_position: currentPosition,
            partner_intersts: partnerInterstsId,
            user_category: whatIAmid,
            partner_category: lookingForid,
            user_intersts: yourInterstsId,
            user_images: userImagesId
        }

        updateProfileCall(data)
            .then((res: any) => {
                if (res?.data?.code == 200) {
                    dispatch(UserAction())
                    navigation.goBack()
                }
            })
            .catch((err) => {
            });
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ backgroundColor: COLORS.WHITE }} />
            <Loader loading={loading} />
            <ScrollView style={[CommonStyles.container, { backgroundColor: COLORS.WHITE }]}>
                <CommonHeader
                    onPressBack={() => navigation.goBack()}
                    text={`Edit My Profile`}
                />
                <CustomText
                    text={`*Please don't mention numbers`}
                    style={[TextStyles.bold14DarkBlue, SpaceStyles.alignSelf, { marginTop: -40 }]}
                    numberOfLines={undefined}
                />

                <CustomText
                    text={`Your current position and organization`}
                    style={[TextStyles.bold14DarkBlue, SpaceStyles.top3]}
                    numberOfLines={undefined}
                />
                <CustomeTextInput
                    value={currentPosition}
                    defaultValue={currentPosition}
                    placeholder={''}
                    containerStyle={SpaceStyles.top1}
                    onChangeText={(text) => setCurrentPosition(text)}
                    editable={true}
                    multiline={false} containerInputText={undefined}
                />

                <CustomText
                    text={`What kind of partnership are you looking for?`}
                    style={[TextStyles.bold14DarkBlue, SpaceStyles.top3]}
                    numberOfLines={undefined}
                />
                <CustomeTextInput
                    value={partnershipReason}
                    defaultValue={partnershipReason}
                    placeholder={''}
                    containerStyle={[SpaceStyles.top1, { height: 120 }]}
                    onChangeText={(text) => setPartnershipReason(text)}
                    editable={true}
                    multiline={true}
                    containerInputText={{ textAlignVertical: 'top', paddingTop: 10, paddingBottom: 10, height: 120 }}
                />

                <CustomText
                    text={`Tell us about yourself, what you are passionate about? what have you achieved?`}
                    style={[TextStyles.bold14DarkBlue, SpaceStyles.top3]}
                    numberOfLines={undefined}
                />
                <CustomeTextInput
                    defaultValue={aboutUs}
                    value={aboutUs}
                    placeholder={''}
                    onChangeText={(text) => setAboutUs(text)}
                    containerStyle={[SpaceStyles.top1, { height: 120 }]}
                    editable={true}
                    multiline={true}
                    containerInputText={{ textAlignVertical: 'top', paddingTop: 10, paddingBottom: 10, height: 120 }}
                />

                <CustomText
                    text={`Years of experience `}
                    style={[TextStyles.bold14DarkBlue, SpaceStyles.top3]}
                    numberOfLines={undefined}
                />

                <View style={[SpaceStyles.rowWrap, SpaceStyles.top1]}>
                    {experienceData.map((i) => {
                        return (
                            <TouchableOpacity
                                style={[CommonStyles.experienceYearView, i.year == yearExperience && { borderWidth: 2, borderColor: COLORS.NAVEY_BLUE }]}
                                onPress={() => setYearExperience(i.year)}
                            >
                                <CustomText
                                    text={i.year}
                                    style={[TextStyles.regular14DarkBlue]}
                                    numberOfLines={undefined}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </View>

                <CustomText
                    text={`LinkedIn profile URL`}
                    style={[TextStyles.bold14DarkBlue, SpaceStyles.top3]}
                    numberOfLines={undefined}
                />
                <CustomeTextInput
                    defaultValue={linkdinUrl}
                    value={linkdinUrl}
                    onChangeText={(text) => setLinkdinUrl(text)}
                    placeholder={''}
                    containerStyle={[SpaceStyles.top1]}
                    editable={true}
                    multiline={false} containerInputText={undefined}
                />

                <CustomText
                    text={`What am I`}
                    style={[TextStyles.bold14DarkBlue, SpaceStyles.top3]}
                    numberOfLines={undefined}
                />
                <TouchableOpacity onPress={() => getAllId('whatIAm')}>
                    <View style={[CommonStyles.inputView, SpaceStyles.top1]}>
                        {userData?.data?.user_category.map((i) => {
                            return (
                                <>
                                    <CustomText
                                        text={i?.category?.name}
                                        style={[TextStyles.regular14DarkBlue]}
                                        numberOfLines={undefined}
                                    />
                                    <CustomText
                                        text={' , '}
                                        style={[TextStyles.regular14DarkBlue]}
                                        numberOfLines={undefined}
                                    />
                                </>
                            )
                        })}
                    </View>
                </TouchableOpacity>

                <CustomText
                    text={`I am Looking for`}
                    style={[TextStyles.bold14DarkBlue, SpaceStyles.top3]}
                    numberOfLines={undefined}
                />

                <TouchableOpacity onPress={() => getAllId('EditLookIam')}>
                    <View style={[CommonStyles.inputView, SpaceStyles.top1]}>
                        {userData?.data?.partner_category.map((i) => {
                            return (
                                <>
                                    <CustomText
                                        text={i?.category?.name}
                                        style={[TextStyles.regular14DarkBlue]}
                                        numberOfLines={undefined}
                                    />
                                    <CustomText
                                        text={' , '}
                                        style={[TextStyles.regular14DarkBlue]}
                                        numberOfLines={undefined}
                                    />
                                </>
                            )
                        })}
                    </View>
                </TouchableOpacity>

                <CustomText
                    text={`Your Interests`}
                    style={[TextStyles.bold14DarkBlue, SpaceStyles.top3]}
                    numberOfLines={undefined}
                />

                {console.log(userData?.data?.user_intersts, ",,,...UUUUUUUU,,,...")}

                <TouchableOpacity onPress={() => getAllId('YourInterestScreen')}>
                    <View style={[CommonStyles.inputView, SpaceStyles.top1]}>
                        {userData?.data?.user_intersts.map((i) => {
                            return (
                                <>
                                    {i?.intersts?.id != 25 ?
                                        <CustomText
                                            text={i?.intersts?.name}
                                            style={[TextStyles.regular14DarkBlue]}
                                            numberOfLines={undefined}
                                        />
                                        :
                                        <CustomText
                                            text={i?.intersts_text}
                                            style={[TextStyles.regular14DarkBlue]}
                                            numberOfLines={undefined}
                                        />
                                    }
                                    <CustomText
                                        text={' , '}
                                        style={[TextStyles.regular14DarkBlue]}
                                        numberOfLines={undefined}
                                    />
                                </>
                            )
                        })}
                    </View>
                </TouchableOpacity>

                <CustomText
                    text={`Interests of your next partner`}
                    style={[TextStyles.bold14DarkBlue, SpaceStyles.top3]}
                    numberOfLines={undefined}
                />
                {console.log(userData?.data?.partner_intersts, ",,,...PPPPPPPP,,,...")}

                <TouchableOpacity onPress={() => getAllId('PartnerInterestScreen')}>
                    <View style={[CommonStyles.inputView, SpaceStyles.top1]}>
                        {userData?.data?.partner_intersts.map((i) => {
                            console.log(i, "iiiiiii---iiiii");

                            return (
                                <>
                                    {i?.intersts?.id != 25 ?
                                        <CustomText
                                            text={i?.intersts?.name}
                                            style={[TextStyles.regular14DarkBlue]}
                                            numberOfLines={undefined}
                                        />
                                        :
                                        <CustomText
                                            text={i?.intersts_text}
                                            style={[TextStyles.regular14DarkBlue]}
                                            numberOfLines={undefined}
                                        />
                                    }
                                    <CustomText
                                        text={' , '}
                                        style={[TextStyles.regular14DarkBlue]}
                                        numberOfLines={undefined}
                                    />
                                </>
                            )
                        })}
                    </View>
                </TouchableOpacity>

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
            </ScrollView>
        </View>
    );
};

export default EditProfileScreen;