import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../Core/StackParamLists/AppStackParamList';
import { COLORS } from '../../Common/constants/Colors';
import SpaceStyles from '../../Common/style/SpaceStyles';
import { Images } from '../../Common/constants/Images';
import CommonStyles from '../../Common/style/CommonStyles';
import CustomText from '../../Common/Components/Text/CustomText';
import TextStyles from '../../Common/style/TextStyles';
import LinearGradient from 'react-native-linear-gradient';
import { getChatListCall } from '../../Core/Redux/Services/ChatServices';
import { useFocusEffect } from '@react-navigation/native';
import LoaderModal from '../../Common/Components/Loadar/LoaderModal';

type props = {
    navigation: NativeStackNavigationProp<AppStackParamList, 'AllChatListScreen'>;
    route: RouteProp<AppStackParamList, 'AllChatListScreen'>;
};

const AllChatListScreen = ({ navigation, route }: props) => {

    const [loading, setLoading] = useState(false);
    const [allChatList, setAllChatList] = useState(false);

    useEffect(() => {
        getChatList()
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getChatList()
            return () => {
            };
        }, [])
    );

    const getChatList = () => {
        const data = {
            start: 0,
            length: 10
        }
        setLoading(true)
        getChatListCall(data)
            .then((res: any) => {
                setAllChatList(res?.data?.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
            });
    }

    const renderChatList = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ChatDetailScreen', {
                    userId: item?.user_details?.id,
                    chatId: item?.id,
                    name: item?.user_details?.full_name,
                    profileImage: item?.user_details?.user_image?.media_file_url
                })}
                style={CommonStyles.chatListView}>
                <View style={SpaceStyles.rowFlex}>
                    <Image
                        style={{ height: 40, width: 40, borderRadius: 90 }}
                        source={{ uri: item?.user_details?.user_image?.media_file_url }}
                    />
                    <View style={SpaceStyles.left3}>
                        <CustomText
                            text={item?.user_details?.full_name}
                            style={[TextStyles.bold14DarkBlue]}
                            numberOfLines={undefined}
                        />
                        <CustomText
                            text={item?.last_msg?.content}
                            style={[TextStyles.regular13DarkBlue]}
                            numberOfLines={undefined}
                        />
                    </View>
                </View>
                {item?.unseenmsg_count != 0 &&
                    < View >
                        <Image source={Images.messageNumberView} />
                        <CustomText
                            text={item?.unseenmsg_count}
                            style={[TextStyles.bold11White, { position: 'absolute', alignSelf: 'center' }]}
                            numberOfLines={undefined}
                        />
                    </View>
                }
            </TouchableOpacity >
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ backgroundColor: COLORS.WHITE }} />
            <LoaderModal loading={loading} />
            <ScrollView style={[CommonStyles.container, { backgroundColor: COLORS.WHITE }]}>
                <View style={SpaceStyles.alignSpaceBlock}>
                    <TouchableOpacity style={CommonStyles.backButtonView} onPress={() => navigation.goBack()}>
                        <Image source={Images.backIcon} />
                    </TouchableOpacity>
                    <CustomText
                        text={`Chats`}
                        style={[TextStyles.regularDongle48DarkBlue]}
                        numberOfLines={undefined}
                    />
                    <View style={CommonStyles.backButtonView} />
                </View>

                <LinearGradient
                    colors={['#00ECB9', '#27C3C6']}
                    start={{ x: 0.0, y: 0 }} end={{ x: 1.5, y: 0 }}
                    style={[CommonStyles.myPlanStyle]}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('GrowStack', { screen: 'GrowScreen' })}
                        style={[CommonStyles.myPlanStyle, SpaceStyles.rowFlex]}>
                        <Image source={Images.appLogoWhite} />
                        <View style={SpaceStyles.left3}>
                            <CustomText
                                text={`+99 Potential business opportunities`}
                                style={[TextStyles.bold14White]}
                                numberOfLines={undefined}
                            />
                            <CustomText
                                text={`Start a business conversation with them now!`}
                                style={[TextStyles.regular14]}
                                numberOfLines={undefined}
                            />
                        </View>
                    </TouchableOpacity>
                </LinearGradient >

                <FlatList
                    data={allChatList}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderChatList}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={SpaceStyles.top1}
                />
            </ScrollView>
        </View>
    );
};

export default AllChatListScreen;