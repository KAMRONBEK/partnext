import { getDeviceId, getDeviceType } from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

import { DELETE_IMAGE_CALL, DELETE_USER_ACCOUNT, GET_YOUR_INTEREST_CALL, LOGIN_API_CALL, LOGOUT_API_CALL, OTP_API_CALL, REGISTER_API_CALL, UPLOAD_IMAGE_CALL, WHAT_I_AM_CALL, WHAT_I_AM_LOOK_CALL } from "../config/apiEndPoints";
import { baseApiCall } from "../config/BaseApiCall";
import { Platform } from 'react-native';

export const registerCall = async (data) => {
    const deviceInfo = await getDeviceInfo();
    return baseApiCall({
        url: REGISTER_API_CALL,
        method: "post",
        data,
        headers: deviceInfo,
    });
};
export const loginCall = async (data) => {
    const deviceInfo = await getDeviceInfo();
    return baseApiCall({
        url: LOGIN_API_CALL,
        method: "post",
        data,
        headers: deviceInfo,
    });
};

export const logout = async (token) => {
    const deviceInfo = await getDeviceInfo();
    return baseApiCall({
        url: LOGOUT_API_CALL,
        method: "post",
        headers: { ...deviceInfo, Authorization: token },
    });
};

export const otpCall = async (data) => {
    const deviceInfo = await getDeviceInfo();
    return baseApiCall({
        url: OTP_API_CALL,
        method: "post",
        data,
        headers: deviceInfo
    });
};
export const whatIAmCall = () => {
    return baseApiCall({
        url: WHAT_I_AM_CALL,
        method: "get",
    });
};
export const whatILookCall = () => {
    return baseApiCall({
        url: WHAT_I_AM_LOOK_CALL,
        method: "get",
    });
};
export const getYourInterestsCall = () => {
    return baseApiCall({
        url: GET_YOUR_INTEREST_CALL,
        method: "get",
    });
};
export const uploadImageCall = (data) => {
    return baseApiCall({
        url: UPLOAD_IMAGE_CALL,
        method: "post",
        data
    });
};
export const deleteImageCall = (data) => {
    return baseApiCall({
        url: DELETE_IMAGE_CALL + data,
        method: "delete"
    });
};

export const getDeviceInfo = async () => {
    const deviceId = getDeviceId();
    const deviceType = getDeviceType();
    const deviceToken = await messaging().getToken();
    console.log("user device token====>", deviceToken)

    return {
        'device-id': deviceId,
        'device-type': Platform.OS === 'android' ? 'ANDROID' : 'IOS',
        'device-token': deviceToken,
    };
};

export const deleteUserAccountCall = async () => {
    return baseApiCall({
        url: DELETE_USER_ACCOUNT,
        method: "delete"
    });
};