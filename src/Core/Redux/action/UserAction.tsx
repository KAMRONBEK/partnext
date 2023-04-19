import { USER_DATA } from "../config/actionTypes";
import { getProfileCall } from "../Services/ProfileServices";

export const UserAction = () => {
    return (dispatch: any) => {
        getProfileCall()
            .then((res: any) => {
                dispatch(userDataCall(res.data));
            })
            .catch((err) => { });
    };
};

export const userDataCall = (payload: any) => {
    return (dispatch: any) => {
        dispatch({ type: USER_DATA, payload: payload });
    };
};
