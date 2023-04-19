import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../Core/StackParamLists/AppStackParamList';
import CommonStyles from '../../Common/style/CommonStyles';
import { Images } from '../../Common/constants/Images';
import SpaceStyles from '../../Common/style/SpaceStyles';
import CustomText from '../../Common/Components/Text/CustomText';
import TextStyles from '../../Common/style/TextStyles';
import { COLORS } from '../../Common/constants/Colors';
import CommonButton from '../../Common/Components/Button/CommonButton';
import CancleModal from '../Components/CancleModal';
import CommonHeader from '../../Common/Components/Header/CommonHeader';
import { getAllSubscriptionCall, purchaseSubscriptionApiCall } from '../../Core/Redux/Services/ProfileServices';
import Toast from "react-native-simple-toast";
import { useDispatch, useSelector } from "react-redux";
import { UserAction } from '../../Core/Redux/action/UserAction';

type props = {
    navigation: NativeStackNavigationProp<AppStackParamList, 'BeforeUpgradeScreen'>;
    route: RouteProp<AppStackParamList, 'BeforeUpgradeScreen'>;
};

const BeforeUpgradeScreen = ({ navigation, route }: props) => {

    const dispatch = useDispatch()
    const [openFilterModal, setOpenFilterModal] = useState(false)
    const [allPlane, setAllPlane] = useState([])
    const [selectedPlan, setSelectedPlan] = useState('')

    useEffect(() => {
        getAllSubscription()
    }, []);

    const getAllSubscription = () => {
        getAllSubscriptionCall()
            .then((res: any) => {
                console.log(res?.data?.data, ".....>>>..>>>>");

                setAllPlane(res?.data?.data)
            })
            .catch((err) => {
            });
    }

    const purchaseSubscription = () => {
        const data = {
            subscription_id: selectedPlan
        }
        purchaseSubscriptionApiCall(data)
            .then((res: any) => {
                console.log(res, "-----purchase----");
                Toast.showWithGravity(res?.data?.message, Toast.SHORT, Toast.BOTTOM);
                dispatch(UserAction())
            })
            .catch((err) => {
            });
    }

    return (
        <View style={[CommonStyles.mainContainer, { backgroundColor: COLORS.WHITE }]}>
            <SafeAreaView style={{ backgroundColor: COLORS.WHITE }} />
            <CommonHeader
                onPressBack={() => navigation.goBack()}
                text={`Partnext Premium`}
            />
            <ScrollView style={[CommonStyles.secondContainer]}>


                <View style={[SpaceStyles.rowFlex, SpaceStyles.top2]}>
                    <Image source={Images.likeRoundButton} />
                    <CustomText
                        text={`See who wanted to create a business opportunity with you`}
                        style={[TextStyles.regular14DarkBlue, SpaceStyles.left3, SpaceStyles.width80]}
                        numberOfLines={undefined}
                    />
                </View>

                <View style={[SpaceStyles.rowFlex, SpaceStyles.vertical2]}>
                    <Image source={Images.messageRoundIcon} />
                    <CustomText
                        text={`Start conversation with potential business partners`}
                        style={[TextStyles.regular14DarkBlue, SpaceStyles.left3, SpaceStyles.width80]}
                        numberOfLines={undefined}
                    />
                </View>

                <View style={[SpaceStyles.rowFlex]}>
                    <Image source={Images.starRoundIcon} />
                    <CustomText
                        text={`Unlimited business collaborations`}
                        style={[TextStyles.regular14DarkBlue, SpaceStyles.left3, SpaceStyles.width80]}
                        numberOfLines={undefined}
                    />
                </View>

                <View style={[SpaceStyles.rowWrap, SpaceStyles.top2]}>
                    {allPlane?.map((i, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => setSelectedPlan(i?.id)}
                                style={[CommonStyles.planView, selectedPlan == i.id && { borderWidth: 1, borderColor: '#0079D4' }]}>
                                <CustomText
                                    text={i?.name}
                                    style={[TextStyles.bold18DarkBlue]}
                                    numberOfLines={undefined}
                                />
                                <CustomText
                                    text={i?.actual_price + '₪'}
                                    style={[TextStyles.regular12DarkBlue]}
                                    numberOfLines={undefined}
                                />
                                {i?.offer ?
                                    <View style={CommonStyles.saveAmountView}>
                                        <CustomText
                                            text={i?.offer}
                                            style={[TextStyles.bold13DarkBlue]}
                                            numberOfLines={undefined}
                                        />
                                    </View>
                                    :
                                    <View style={[CommonStyles.saveAmountView, { borderWidth: 0 }]}>
                                        <CustomText
                                            text={i?.offer}
                                            style={[TextStyles.bold13DarkBlue]}
                                            numberOfLines={undefined}
                                        />
                                    </View>
                                }
                            </TouchableOpacity>
                        )
                    })}
                </View>

                <CommonButton
                    containerStyle={[SpaceStyles.top3, SpaceStyles.vertical2]}
                    title={'Continue'}
                    onPress={() => purchaseSubscription()}
                    whiteButton={false}
                />

                <CancleModal
                    openFilterModal={openFilterModal}
                    setOpenFilterModal={setOpenFilterModal}
                />

            </ScrollView>
        </View>
    );
};

export default BeforeUpgradeScreen;