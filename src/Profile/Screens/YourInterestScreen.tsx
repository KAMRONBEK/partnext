import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Lable from '../../Common/constants/English';
import style from '../../AuthFont/style';
import { COLORS } from '../../Common/constants/Colors';
import { Images } from '../../Common/constants/Images';
import { getYourInterestsCall } from '../../Core/Redux/Services/AuthServices';
import CommonHeader from '../../Common/Components/Header/CommonHeader';
import Input from '../../Authentication/Components/Input';
import CommonButton from '../../Common/Components/Button/CommonButton';
import SpaceStyles from '../../Common/style/SpaceStyles';
import { updateProfileCall } from '../../Core/Redux/Services/ProfileServices';
import { UserAction } from '../../Core/Redux/action/UserAction';
import { useDispatch, useSelector } from "react-redux";
import { AppStackParamList } from '../../Core/StackParamLists/AppStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type props = {
    navigation: NativeStackNavigationProp<AppStackParamList, 'YourInterestScreen'>;
    route: RouteProp<AppStackParamList, 'YourInterestScreen'>;
};

export default function YourInterestScreen({ navigation, route }: props) {
    const dispatch = useDispatch()
    const [others, setOthers] = useState(false);
    const [selectedInterest, setSelectedInterest] = useState([]);
    const [tourInterestData, setYourInterestData] = useState([]);
    const [chip, setChip] = useState(false);
    const [otherValue, setOtherValue] = useState('');

    useEffect(() => { }, [chip]);

    useEffect(() => {
        setSelectedInterest(route?.params?.yourInterstsId)
        getAllIntrest()
    }, []);
    useEffect(() => {
        route?.params?.yourInterstsId.map((i) => {
            if (i.intersts == 25) {
                setOthers(true)
                setOtherValue(i?.intersts_text)
            }
        })
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

    const registerApi = () => {

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
            user_intersts: selectedInterest,
            user_images: route?.params?.userImagesId
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
        <KeyboardAwareScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            <SafeAreaView style={{ backgroundColor: '#CEE8FF' }} />
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
                    {others &&
                        <Input
                            height={50}
                            imageSource={Images.close1}
                            onImagePress={() => { setOthers(false), setSelectedInterest(getNewArray(28)) }}
                            errorText={undefined}
                            lable={undefined}
                            keyboardType={undefined}
                            inputStyle={undefined}
                            inputHeight={undefined}
                            onChangeText={(value) => { onOtherChipPress(value), setOtherValue(value) }}
                            error={undefined}
                            multiline={false}
                            defaultValue={otherValue}
                        />
                    }

                    <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.top2, SpaceStyles.bottom4]}>
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
        </KeyboardAwareScrollView>
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
