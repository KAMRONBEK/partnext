import { GET_FRIEND_SUGGESTION_CALL, UPDATE_LEFT_RIGHT_CALL } from "../config/apiEndPoints";
import { baseApiCall } from "../config/BaseApiCall";


export const getFriendSuggestionCall = (data) => {
    return baseApiCall({
        url: GET_FRIEND_SUGGESTION_CALL,
        method: "post",
        data
    });
};
export const addLeftRightCall = (data) => {
    console.log("asdsadsa")
    return baseApiCall({
        url: UPDATE_LEFT_RIGHT_CALL,
        method: "post",
        data
    });
};