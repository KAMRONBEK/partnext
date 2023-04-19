import React, { useState, useEffect, useCallback } from 'react';
import { View, SafeAreaView, Image, ScrollView, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Keyboard, Platform, Modal, Pressable, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../Core/StackParamLists/AppStackParamList';
import { COLORS } from '../../Common/constants/Colors';
import SpaceStyles from '../../Common/style/SpaceStyles';
import { Images } from '../../Common/constants/Images';
import CommonStyles from '../../Common/style/CommonStyles';
import CustomText from '../../Common/Components/Text/CustomText';
import TextStyles from '../../Common/style/TextStyles';
import ReportModal from '../Components/ReportModal';
import { getChatDetailListCall, sendMsgCall, deleteMatchCall } from '../../Core/Redux/Services/ChatServices';
import { useDispatch, useSelector } from "react-redux";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { uploadImageCall } from '../../Core/Redux/Services/AuthServices';

type props = {
    navigation: NativeStackNavigationProp<AppStackParamList, 'ChatDetailScreen'>;
    route: RouteProp<AppStackParamList, 'ChatDetailScreen'>;
};

interface RootState {
    user: any
}

const ChatDetailScreen = ({ navigation, route }: props) => {

    const { userId, chatId, name, profileImage } = route?.params
    const [openReportModal, setOpenReportModal] = useState(false)
    const [allChatList, setAllChatList] = useState(false);
    const [msg, setMsg] = useState('');
    const [image, setShowImage] = useState(false)
    const [userImage, setShowUserImage] = useState(false)
    const userData = useSelector((state: RootState) => state.user.userData);
    const [bigPicture, setBigPicture] = useState('')
    useEffect(() => {
        getChatDetailList()
    }, []);

    const getChatDetailList = () => {
        const data = {
            start: 0,
            length: 100
        }
        getChatDetailListCall(`${chatId}/`, data)
            .then((res: any) => {
                setAllChatList(res?.data?.data)
            })
            .catch((err) => {
            });
    }

    const sendMsg = (id) => {
        const withoutImageData = {
            recipient: userId,
            content: msg,
            message_media: []
        }
        const data = {
            recipient: userId,
            content: msg,
            message_media: [{ media: id }]
        }
        sendMsgCall(id == '' ? withoutImageData : data)
            .then((res) => {
                setMsg('')
                getChatDetailList()
            })
            .catch((err) => {
            });
    }

    const openPhotos = () => {
        try {
            launchImageLibrary({
                maxHeight: 1000,
                maxWidth: 1000,
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


                    //   let array = []
                    //   response?.assets?.map((i) => {
                    //     let file = {
                    //       uri: i.uri,
                    //       type: i.type,
                    //       name: i.fileName != null ? i.fileName : i.uri,
                    //       size: i.fileSize
                    //     }
                    //     array.push(file)
                    //   })
                }
            });
        } catch (e) {
        }
    }

    const uploadImage = (obj) => {
        const userData = new FormData();
        userData.append(`media`, obj)
        uploadImageCall(userData)
            .then((res: any) => {
                console.log(res?.data?.data[0]?.id, "idddddd");
                sendMsg(res?.data?.data[0]?.id)
            })
            .catch((err) => {
            });
    }

    const navigateToCurrentUserProfile = () => {
        navigation.navigate('UserChatProfileScreen', { id: userId })
    }


    // const openModalImage = () => {
    //     setShowImage(!image)
    // }

    console.log(bigPicture)

    const renderChat = ({ item, index }) => {

        const openModalUserImage = () => {
console.log(item)
            setShowUserImage(!userImage)
            setBigPicture(item?.message_media[0]?.media?.media_file_url)
        }
        return (
            <>
                {item?.send_by?.id != userData.data.id ?
                    <>
                        <View style={[CommonStyles.allMessageView]}>
                            <View style={[CommonStyles.messageBox, SpaceStyles.left2]}>
                                {item?.message_media?.length == 0 ?

                                    <CustomText
                                        numberOfLines={undefined}
                                        text={item.content}
                                        style={TextStyles.regular14DarkBlue}
                                    />
                                    :
                                    <>
                                        <CustomText
                                            numberOfLines={undefined}
                                            text={item?.content}
                                            style={TextStyles.regular14DarkBlue}
                                        />
                                        <TouchableOpacity onPress={openModalUserImage}>
                                            <Image
                                                resizeMode={"contain"}
                                                style={{ height: 150, width: 150 }}
                                                source={{ uri: item?.message_media[0]?.media?.media_file_url }} />
                                        </TouchableOpacity>
                                    </>
                                }
                            </View>
                        </View>
                    </>
                    :
                    <View style={CommonStyles.sendMessageView}>
                        <View />
                        <View style={[CommonStyles.messageBox, SpaceStyles.left2, { backgroundColor: '#EDFAFF' }]}>
                            {item?.message_media?.length == 0 ?
                                <CustomText
                                    numberOfLines={undefined}
                                    text={item?.content}
                                    style={TextStyles.regular14DarkBlue}
                                />
                                :
                                <>
                                    <CustomText
                                        numberOfLines={undefined}
                                        text={item?.content}
                                        style={TextStyles.regular14DarkBlue}
                                    />
                                    <TouchableOpacity onPress={openModalUserImage}>
                                        <Image
                                            resizeMode={"contain"}
                                            style={{ height: 150, width: 150 }}
                                            source={{ uri: item?.message_media[0]?.media?.media_file_url }} />
                                    </TouchableOpacity>
                                </>
                            }
                        </View>
                    </View>
                }
            </>
        )
    }

    const handleDeleteChat = async () => {
        const data = { user: userId }
        try {
            setOpenReportModal(true)
            const res = await deleteMatchCall(data);
            navigation.goBack()
        } catch (error) {
            console.log("error from chat api===>", error)
        }
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUND }} />
            <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.paddingVertical1, { backgroundColor: COLORS.BACKGROUND }]}>
                <View style={SpaceStyles.rowFlex}>
                    <TouchableOpacity style={CommonStyles.chatBackButtonView} onPress={() => navigation.goBack()}>
                        <Image source={Images.backIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={navigateToCurrentUserProfile}>
                        <Image
                            style={{ height: 40, width: 40, borderRadius: 90 }}
                            source={{ uri: profileImage }}
                        />
                        <CustomText
                            text={name}
                            style={[TextStyles.bold18DarkBlue, SpaceStyles.left3]}
                            numberOfLines={undefined}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => setOpenReportModal(true)}
                    style={CommonStyles.backButtonView}>
                    <Image
                        source={Images.moreOptionIcon}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={[{ backgroundColor: COLORS.WHITE, flex: 1 }]}>

                <FlatList
                    data={allChatList}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderChat}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={SpaceStyles.top1}
                />
            </ScrollView>

            <View style={[CommonStyles.bottomMessageView]}>
                <View style={{}}>
                    <View style={[CommonStyles.textInputChat, SpaceStyles.left3]}>
                        <View style={SpaceStyles.rowFlex}>
                            <TouchableOpacity onPress={() => openPhotos()}>
                                <Image
                                    resizeMode={'contain'}
                                    source={Images.galleryIcon} />
                            </TouchableOpacity>
                            <TextInput
                                style={[SpaceStyles.left3, TextStyles.semiBold14DarkBlue, SpaceStyles.width62]}
                                placeholderTextColor={COLORS.DARK_BLUE}
                                placeholder={'Write a massege...'}
                                multiline={true}
                                defaultValue={msg}
                                value={msg}
                                onChangeText={(text) => setMsg(text)}
                            />
                        </View>
                        <TouchableOpacity onPress={() => sendMsg('')}>
                        <Image
                                resizeMode={'contain'}
                                source={Images.sendIcon} />
                            <Image
                                resizeMode={'contain'}
                                style={{ position: 'absolute', alignSelf: 'center', top: 10 }}
                                source={Images.sendWhiteArrow} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ReportModal
                openReportModal={openReportModal}
                setOpenReportModal={setOpenReportModal}
                onPressDelete={handleDeleteChat}
                showDeleteButton
                onPressReport={() => {
                    setOpenReportModal(false), navigation.navigate('ReportScreen', {
                        userId: userId
                    })
                }}
            />
            <SafeAreaView style={{ backgroundColor: COLORS.WHITE }} />
            <Modal
            animationType='fade'
            transparent={true}
            visible={userImage}
            onRequestClose={() => {

                setShowUserImage(!userImage);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image
                        resizeMode={"cover"}
                        style={{ height: 350, width: 350 }}
                        source={{ uri: bigPicture }} />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setShowUserImage(!userImage)}>
                        <Image style={{ width: 40, height: 40 }} source={Images.closeModal} />
                    </Pressable>
                </View>
            </View>
        </Modal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        width: '100%',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        padding: 35,
        alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        position: 'absolute',
        top: 0,
        right: 20,
    },

});

export default ChatDetailScreen;