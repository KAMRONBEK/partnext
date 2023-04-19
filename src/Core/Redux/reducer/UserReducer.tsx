import { USER_DATA } from "../config/actionTypes";

const initialState = {
    userData: ''
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_DATA: {
            return {
                ...state,
                userData: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default userReducer;
