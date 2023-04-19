import instance from "./apiConfig";
import { debounce } from "lodash";
import { logOut } from "../../../Common/constants/GlobalFunction";

const block = debounce(() => {
    logOut();
}, 1000);


export const baseApiCall = (config: any) => {
    return new Promise((resolve, reject) => {
        instance(config)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response);
                }
            })
            .catch((e) => {
                console.log(e, ".......ee....");
                if (e.response.data.detail == 'User account is disabled.') {
                    block()
                }
                if (e.response && e.response.data) {
                    reject(e.response.data);
                } else {
                    reject(e);
                }

                if (e && e.error == "Unauthorized") {
                    return;
                }
            });
    });
};
