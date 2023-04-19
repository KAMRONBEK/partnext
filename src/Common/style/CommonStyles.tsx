import { StyleSheet, Platform } from "react-native";
import { BaseStyle } from "../constants/BaseStyle";
import { COLORS } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";

const isIos = Platform.OS === "ios"

const HEIGHT = (BaseStyle.DEVICE_HEIGHT / 100)
const WIDTH = (BaseStyle.DEVICE_WIDTH / 100)

const CommonStyles = StyleSheet.create({

    //Bottom Tab
    tabContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.PRIMARY_COLOR,
        paddingVertical: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

        shadowColor: "#00000",
        shadowOpacity: 1,
        shadowRadius: 7,
        shadowOffset: {
            height: 1,
            width: 1
        },
        elevation: 5
    },
    selectedTab: {
        paddingHorizontal: WIDTH * 5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    unSelectedTab: {
        paddingHorizontal: WIDTH * 5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    profileImage: {
        alignSelf: 'center',
        height: HEIGHT * 13,
        width: HEIGHT * 13,
        borderRadius: 90,
        marginTop: HEIGHT * 2
    },

    // Common Button
    buttonStyle: {
        borderRadius: 90,
        width: WIDTH * 52,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 0,
        alignSelf: 'center'
    },

    // Common Textinput

    inputView: {
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        width: WIDTH * 90,
        alignSelf: "center",
        borderColor: COLORS.BLUE,
        height: 45,
        paddingHorizontal: WIDTH * 2,
        borderRadius: 12
    },
    inputText: {
        marginLeft: 10,
        width: WIDTH * 80,
        color: COLORS.DARK_BLUE,
        ...Fonts.regular14
    },


    // Opportunities Screen
    mainContainer: {
        backgroundColor: COLORS.BACKGROUND,
        flex: 1
    },
    secondContainer: {
        marginTop: HEIGHT * 2,
        paddingHorizontal: WIDTH * 5
    },
    container: {
        backgroundColor: COLORS.BACKGROUND,
        flex: 1,
        marginTop: HEIGHT * 2,
        paddingHorizontal: WIDTH * 5
    },
    whiteContainer: {
        width: WIDTH * 100,
        backgroundColor: COLORS.WHITE,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: WIDTH * 5,
        paddingVertical: HEIGHT * 1,
        marginTop: HEIGHT * 54.5
    },
    whiteContainerDummy: {
        width: WIDTH * 100,
        backgroundColor: COLORS.WHITE,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: WIDTH * 5,
        paddingVertical: HEIGHT * 1
    },
    topSwipeImage: {
        width: WIDTH * 90,
        height: HEIGHT * 45,
        borderRadius: 10,
        alignSelf: 'center'
    },
    tagView: {
        backgroundColor: COLORS.WHITE,
        borderColor: '#B9DDFF',
        borderWidth: 3,
        paddingHorizontal: WIDTH * 4,
        paddingVertical: HEIGHT * 0.6,
        borderRadius: 90,
        marginRight: WIDTH * 2,
        marginTop: HEIGHT * 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerContainer: {
        top: 15,
        width: WIDTH * 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 1
    },
    topImageView: {
        alignSelf: 'center',
        width: WIDTH * 90
    },
    linkedinLogo: {
        position: 'absolute',
        bottom: 70,
        right: 15
    },
    linkedinLogoDummy: {
        position: 'absolute',
        bottom: 20,
        right: 15
    },

    // Profile screen
    profileImageView: {
        height: HEIGHT * 13,
        width: HEIGHT * 13,
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    editProfileIcon: {
        position: 'absolute',
        top: HEIGHT * 10,
        right: WIDTH * 0,
        alignSelf: 'center'
    },
    profileWhiteContainer: {
        width: WIDTH * 100.5,
        backgroundColor: COLORS.WHITE,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: WIDTH * 5,
        paddingVertical: HEIGHT * 1,
        marginTop: HEIGHT * 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 3,
        flex: 1
    },
    editProfileButton: {
        backgroundColor: COLORS.SECONDARY_BLUE,
        borderRadius: 20,
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 5
    },
    profileSepreteView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.BACKGROUND,
        paddingHorizontal: WIDTH * 3,
        marginTop: HEIGHT * 3,
        paddingVertical: HEIGHT * 1.5,
        borderRadius: 12
    },

    // Upgared screen
    planView: {
        backgroundColor: COLORS.BACKGROUND,
        width: WIDTH * 41,
        // height: HEIGHT * 14,
        borderRadius: 20,
        paddingHorizontal: WIDTH * 4,
        paddingVertical: HEIGHT * 2,
        marginHorizontal: WIDTH * 2,
        marginTop: HEIGHT * 2,
    },
    saveAmountView: {
        borderWidth: 2,
        borderColor: COLORS.DARK_BLUE,
        borderRadius: 20,
        marginTop: HEIGHT * 1,
        width: WIDTH * 24,
        alignItems: 'center',
        paddingVertical: 2
    },
    myPlanStyle: {
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 0,
        paddingHorizontal: WIDTH * 2,
        paddingVertical: HEIGHT * 1
    },
    cancelPlanButton: {
        borderRadius: 20,
        backgroundColor: COLORS.WHITE,
        width: WIDTH * 32,
        alignItems: 'center',
        paddingVertical: 3,
        marginTop: HEIGHT * 2
    },
    cancelModalView: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 28,
        paddingVertical: 20
    },

    // Edit Profile Screen
    experienceYearView: {
        borderRadius: 10,
        backgroundColor: COLORS.BACKGROUND,
        alignItems: 'center',
        paddingHorizontal: WIDTH * 3,
        paddingVertical: HEIGHT * 1,
        marginRight: HEIGHT * 2
    },
    yourIntrestView: {
        borderRadius: 20,
        backgroundColor: COLORS.BACKGROUND,
        alignItems: 'center',
        paddingHorizontal: WIDTH * 3,
        paddingVertical: HEIGHT * 1,
        marginRight: HEIGHT * 1,
        marginTop: HEIGHT * 1
    },
    backButtonView: {
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chatBackButtonView: {
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chatListView: {
        borderRadius: 18,
        backgroundColor: COLORS.BACKGROUND,
        paddingHorizontal: WIDTH * 5,
        paddingVertical: HEIGHT * 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: HEIGHT * 2
    },

    // Chat screen
    reportModalView: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 28,
        paddingVertical: 20,
        position: 'absolute',
        bottom: 0,
        width: WIDTH * 90
    },
    lineView: {
        borderWidth: 0.5,
        borderColor: COLORS.BORDER,
        marginHorizontal: WIDTH * 5
    },
    bottomMessageView: {
        // position: 'absolute',
        // bottom: 100,
        backgroundColor: COLORS.WHITE,
        width: WIDTH * 100,
        // paddingHorizontal: WIDTH * 5,
        paddingVertical: HEIGHT * 1
    },
    textInputChat: {
        borderRadius: 25,
        paddingLeft: WIDTH * 5,
        paddingRight: WIDTH * 1,
        marginVertical: HEIGHT * 1,
        backgroundColor: COLORS.WHITE,
        width: WIDTH * 95,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 3
    },
    sendView: {
        height: HEIGHT * 5,
        width: HEIGHT * 5,
        borderRadius: 10,
        backgroundColor: COLORS.BLACK,
        alignItems: 'center',
        justifyContent: 'center'
    },
    allMessageView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: HEIGHT * 0.5,
    },
    messageBox: {
        paddingHorizontal: WIDTH * 3,
        borderRadius: 12,
        backgroundColor: '#FFFAE4',
        paddingVertical: HEIGHT * 1
    },
    sendMessageView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: HEIGHT * 0.5,
        marginRight: WIDTH * 3
    },
    largeImageView: {
        height: HEIGHT * 31,
        width: WIDTH * 58,
        backgroundColor: COLORS.WHITE,
        borderRadius: 17
    },
    smallImageView: {
        height: HEIGHT * 14.5,
        width: WIDTH * 28,
        backgroundColor: COLORS.WHITE,
        borderRadius: 17
    },
    plusPosition: {
        position: 'absolute',
        bottom: 10, right: 10
    },
    mainImageView: {
        height: HEIGHT * 100,
        width: WIDTH * 100
    },
    modalView: {
        // position: 'absolute',
        backgroundColor: COLORS.WHITE,
        borderRadius: 12,
        // padding: 10,
        width: WIDTH * 100,
        height: HEIGHT * 97,
        right: 18,
        // shadowColor: COLORS.BLACK,
        // shadowOffset: { width: -2, height: 4 },
        // shadowOpacity: 0.2,
        // shadowRadius: 3,
        // elevation: 40,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    mainImageMatchView: {
        height: HEIGHT * 100,
        width: WIDTH * 100
    },
    bottomMessageMatchView: {
        // backgroundColor: COLORS.WHITE,
        width: WIDTH * 75,
        paddingVertical: HEIGHT * 1
    },
    textInputChatMatch: {
        borderRadius: 25,
        paddingLeft: WIDTH * 5,
        paddingRight: WIDTH * 1,
        marginVertical: HEIGHT * 1,
        backgroundColor: COLORS.WHITE,
        width: WIDTH * 85,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 3
    },
});

export default CommonStyles;
