import { GET_CHAT_DETAIL_LIST_CALL, GET_CHAT_LIST_CALL, REPORT_CALL, SEND_MSG_CALL,DELETE_CHAT_ROOM,DELETE_CONNECTION_CALL } from "../config/apiEndPoints";
import { baseApiCall } from "../config/BaseApiCall";


export const getChatListCall = (data) => {
    return baseApiCall({
        url: GET_CHAT_LIST_CALL,
        method: "post",
        data
    });
};
export const getChatDetailListCall = (param, data) => {
    return baseApiCall({
        url: GET_CHAT_DETAIL_LIST_CALL + param,
        method: "post",
        data
    });
};
export const sendMsgCall = (data) => {
    return baseApiCall({
        url: SEND_MSG_CALL,
        method: "post",
        data
    });
};

export const reportApiCall = (data) => {
    return baseApiCall({
        url: REPORT_CALL,
        method: "post",
        data
    });
}
    export const deleteMatchCall = (data) => {
        return baseApiCall({
            url: DELETE_CONNECTION_CALL,
            method: "post",
            data
        });
};