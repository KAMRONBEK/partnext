import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import style from '../../AuthFont/style';
import Modal from 'react-native-modal';
import { COLORS } from '../../Common/constants/Colors';
import Lable from '../../Common/constants/English';
import { Images } from '../../Common/constants/Images';
import GrowBox from '../../Authentication/Components/GrowBox';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { AppStackParamList } from '../../Core/StackParamLists/AppStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SpaceStyles from '../../Common/style/SpaceStyles';
import CommonStyles from '../../Common/style/CommonStyles';
import CustomText from '../../Common/Components/Text/CustomText';
import TextStyles from '../../Common/style/TextStyles';
import { useDispatch, useSelector } from "react-redux";
import { getPendingRequstCall, purchaseSubscriptionApiCall } from '../../Core/Redux/Services/ProfileServices';
import { addLeftRightCall } from '../../Core/Redux/Services/HomeServices';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type props = {
    navigation: NativeStackNavigationProp<AppStackParamList, 'GrowScreen'>;
    route: RouteProp<AppStackParamList, 'GrowScreen'>;
};

const tabBarConfig = [{
    icon: Images.opportunitiesunSelectedIcon,
    selectedIcon: Images.opportunitiesSelectedIcon,
    name: "HomeStack",
    text: 'Opportunities'
}, {
    icon: Images.chatsUnselectedIcon,
    selectedIcon: Images.chatSelectedIcon,
    name: "ChatStack",
    text: 'Chats'
}, {
    icon: Images.growUnselectedIcon,
    selectedIcon: Images.selectedGrowIcon,
    name: "GrowStack",
    text: 'Grow'
}, {
    icon: Images.profileUnselectedIcon,
    selectedIcon: Images.profileSelectedIcon,
    name: "ProfileStack",
    text: 'Profile'
}]

interface RootState {
    user: any
}

export default function GrowScreen({ navigation }) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [allFrendList, setAllFrendList] = useState([]);
    const userData = useSelector((state: RootState) => state.user.userData);

    useEffect(() => {
        if (!userData?.data?.subscription_status) {
            setIsModalVisible(true)
        }
    }, []);

    useEffect(() => {
        getPendingFreindList()
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            if (!userData?.data?.subscription_status) {
                setIsModalVisible(true)
            }
            return () => {
            };
        }, [])
    );

    const getPendingFreindList = () => {
        const data = {
            start: 0,
            length: 5
        }
        getPendingRequstCall(data)
            .then((res: any) => {
                console.log(res?.data?.data, "-----pending om----");
                setAllFrendList(res?.data?.data)
            })
            .catch((err) => {
            });
    }

    const acceptCall = (id) => {
        const data = {
            user: id,
            connection_status: 2
        }
        addLeftRightCall(data)
            .then((res: any) => {
                getPendingFreindList()
                //   if (res.data.message == 'Matched SuccessFully') {
                //     setUserId(id)
                //     setOpenMatchModal(true)
                //   }
            })
            .catch((err) => {
            });
    }

    const rejectCall = (id) => {
        const data = {
            user: id,
            connection_status: 1
        }
        addLeftRightCall(data)
            .then((res: any) => {
                getPendingFreindList()
                //   if (res.data.message == 'Matched SuccessFully') {
                //     setUserId(id)
                //     setOpenMatchModal(true)
                //   }
            })
            .catch((err) => {
            });
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#CEE8FF' }} />
            <LinearGradient style={styles.container} colors={['#CEE8FF', '#F2F9FF']}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.container}>
                    <View style={styles.subView}>
                        <TouchableOpacity onPress={() => { navigation.goBack(), setIsModalVisible(userData?.data?.subscription_status ? false : true) }}>
                            <Image source={Images.backIcon} style={styles.img} />
                        </TouchableOpacity>
                        <View style={styles.headerView}>
                            <Image source={Images.grow} style={styles.img1} />
                            <Text style={[style.primaryTitle, { marginLeft: 5, marginTop: 7 }]}>
                                {Lable.PARTNEXT_GROW}
                            </Text>
                        </View>
                        <Text style={style.smallText}>
                            {Lable.YOUR_GROWTH_CAN_ACCELERATE_TEXT}
                        </Text>
                        <Text style={style.smallText}>
                            {Lable.SEE_WHO_WANTS_TO_CONNECT_WITH_YOU}
                        </Text>

                        {allFrendList.map((i) => {
                            return (
                                <GrowBox
                                    onAccept={() => acceptCall(i?.id)}
                                    onCancel={() => rejectCall(i?.id)}
                                    name={i?.full_name}
                                    currentPosition={i?.current_position}
                                    image={i?.user_images}

                                />
                            )
                        })}
                    </View>
                </ScrollView>
            </LinearGradient>
            <Modal
                style={styles.modalMainView}
                coverScreen={true}
                hasBackdrop={true}
                transparent={true}
                visible={isModalVisible}
            // onBackdropPress={() => setIsModalVisible(false)}
            // onRequestClose={() => { setIsModalVisible(!isModalVisible)}}
            >
                <>
                    <LinearGradient
                        style={styles.modalView}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#00ECB9', '#27C3C6']}>
                        <SafeAreaView />
                        <TouchableOpacity onPress={() => { setIsModalVisible(false), navigation.goBack() }}>
                            <Image source={Images.backIcon}
                                resizeMode={'contain'}
                                style={SpaceStyles.left3}
                            />
                        </TouchableOpacity>
                        <Image source={Images.grow} style={styles.img2} />
                        <Text
                            style={[
                                style.primaryTitle,
                                { color: COLORS.WHITE, textAlign: 'center', marginTop: -5 },
                            ]}>
                            {Lable.PARTNEXT_GROW}
                        </Text>
                        <Text
                            style={[
                                style.smallText_16,
                                { color: COLORS.WHITE, textAlign: 'center' },
                            ]}>
                            {Lable.UPGRADE_TO_PARTNEXT_TEXT}
                        </Text>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => { setIsModalVisible(false), navigation.navigate('AfterUpgradeScreen') }}>
                            <Text style={style.smallText}>{Lable.UPGRADE_TO_PREMIUM}</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <View style={{ backgroundColor: '#FFFFFF', position: 'absolute', bottom: 0, width: '100%' }}>
                        <View style={CommonStyles.tabContainer}>
                            {tabBarConfig.map((route, index) => {
                                const isFocused = 2 === index;

                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => { setIsModalVisible(false), navigation.navigate(route.name) }}
                                        style={isFocused ? CommonStyles.selectedTab : CommonStyles.unSelectedTab}
                                    >
                                        <Image
                                            source={isFocused ? route.selectedIcon : route.icon}
                                            resizeMode='contain'
                                        />
                                        <CustomText
                                            text={route.text}
                                            style={isFocused ? TextStyles.regular12Title : TextStyles.regular12SecondoryBlue} numberOfLines={undefined} />
                                    </TouchableOpacity>
                                )
                            })
                            }
                        </View>
                        <SafeAreaView style={{ backgroundColor: COLORS.PRIMARY_COLOR }} />
                    </View>
                </>
            </Modal>
        </>
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
        marginTop: 20,
    },
    img1: {
        width: 19,
        height: 19,
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: -5,
    },
    modalMainView: {
        backgroundColor: ' rgba(239, 251, 255, 0.85)',
        width: windowWidth,
        marginLeft: 0,
        marginTop: 0,
        marginBottom: 0,
    },
    modalView: {
        position: 'absolute',
        paddingVertical: 20,
        height: 240,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 40,
        top: 0,
        width: windowWidth,
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },

    img2: {
        width: 31,
        height: 31,
        tintColor: COLORS.WHITE,
        alignSelf: 'center',
    },
    btn: {
        alignSelf: 'center',
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginTop: 15,
    },
});
