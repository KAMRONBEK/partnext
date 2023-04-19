import instance from "../../Core/Redux/config/apiConfig";
import { Images } from "./Images"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Variables } from "./Variables";
import NavigationService from "../../Core/Stacks/NavigationService";


export const setAccessToken = async (payload) => {
    instance.defaults.headers.common["Authorization"] = "Bearer " + payload;
    await saveData(Variables.accessToken, payload);
};

export const saveData = async (key, data) => {
    await AsyncStorage.setItem(key, data);
};

export const logOut = async () => {
    delete instance.defaults.headers.common["Authorization"]
    await removeData(Variables.accessToken)
    NavigationService.reset("AuthStack");
}

export const removeData = async (key) => {
    await AsyncStorage.removeItem(key);
};

export const experienceData = [
    { year: '0-2' },
    { year: '3-5' },
    { year: '6-10' },
    { year: '10+' },
    { year: '20+' }
]

export const upgradePlanArray = [
    {
        time: '1 Week',
        amount: '29₪',
        offer: ''
    },
    {
        time: '1 Month',
        amount: '99₪',
        offer: ''
    },
    {
        time: '3 Months',
        amount: '69₪',
        offer: 'Save 30%'
    },
    {
        time: '6 Months',
        amount: '49₪',
        offer: 'Save 51%'
    }
]

export const lookIamArray = [
    {
        title: 'Grow an idea',
        unSelectedIcon: Images.selectedYellow,
        isCheck: true
    },
    {
        title: 'Partnership on a startup ',
        unSelectedIcon: Images.unSelectedYellow,
        isCheck: false
    },
    {
        title: 'Partnership on existing business',
        unSelectedIcon: Images.unSelectedYellow,
        isCheck: false
    },
    {
        title: 'Strategic partner',
        unSelectedIcon: Images.unSelectedPurpal,
        isCheck: false
    },
    {
        title: 'Active parter',
        unSelectedIcon: Images.unSelectedPurpal,
        isCheck: false
    },
    {
        title: 'Other',
        unSelectedIcon: Images.unSelectedBlue,
        isCheck: false
    },
]

export const whatIamArray = [
    {
        title: 'I have an idea',
        unSelectedIcon: Images.selectedYellow,
        isCheck: true
    },
    {
        title: 'I own a startup',
        unSelectedIcon: Images.unSelectedYellow,
        isCheck: false
    },
    {
        title: 'I own a business ',
        unSelectedIcon: Images.unSelectedYellow,
        isCheck: false
    },
    {
        title: 'Strategic partner',
        unSelectedIcon: Images.unSelectedPurpal,
        isCheck: false
    },
    {
        title: 'Active parter',
        unSelectedIcon: Images.unSelectedPurpal,
        isCheck: false
    },
    {
        title: 'Other',
        unSelectedIcon: Images.unSelectedBlue,
        isCheck: false
    },
]

export const interestArray = [
    {
        title: 'Tech',
        isCheck: true
    },
    {
        title: 'Art & Entertainment',
        isCheck: false
    },
    {
        title: 'Banking',
        isCheck: false
    },
    {
        title: 'Finance',
        isCheck: false
    },
    {
        title: 'Consulting',
        isCheck: false
    },
    {
        title: 'Music',
        isCheck: false
    },
    {
        title: 'Fashion',
        isCheck: false
    },
    {
        title: 'Media & Journalism',
        isCheck: false
    },
    {
        title: 'Government & Politics',
        isCheck: false
    },
    {
        title: 'VC & Investment',
        isCheck: false
    },
    {
        title: 'Education',
        isCheck: false
    },
    {
        title: 'Sales',
        isCheck: false
    },
    {
        title: 'Marketing',
        isCheck: false
    },
    {
        title: 'Public Relations',
        isCheck: false
    },
    {
        title: 'Advertising',
        isCheck: false
    },
    {
        title: 'Insurance',
        isCheck: false
    },
    {
        title: 'Real Estate',
        isCheck: false
    },
    {
        title: 'Law & Policy',
        isCheck: false
    },
    {
        title: 'Counseling',
        isCheck: false
    },
    {
        title: 'Medicine',
        isCheck: false
    },
    {
        title: 'Police & Military',
        isCheck: false
    },
    {
        title: 'Constructions',
        isCheck: false
    },
    {
        title: 'Food & Beverage',
        isCheck: false
    },
    {
        title: 'Travel & Hospitality',
        isCheck: false
    },
    {
        title: 'Manufacturing',
        isCheck: false
    },
]