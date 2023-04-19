import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AfterUpgradeScreen from '../Screens/AfterUpgradeScreen';
import BeforeUpgradeScreen from '../Screens/BeforeUpgradeScreen';
import EditLookIam from '../Screens/EditLookIam';
import EditPhotos from '../Screens/EditPhotos';
import EditProfileScreen from '../Screens/EditProfileScreen';
import EditWhatIam from '../Screens/EditWhatIam';
import FeedbackScreen from '../Screens/FeedbackScreen';
import FeedbackThankyouScreen from '../Screens/FeedbackThankyouScreen';
import PartnerInterestScreen from '../Screens/PartnerInterestScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import YourInterestScreen from '../Screens/YourInterestScreen';

const Profile = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
    contentStyle: {
        backgroundColor: '#fff',
    }
};
const ProfileStack = () => {
    return (
        <Profile.Navigator
            initialRouteName={'ProfileScreen'}
            screenOptions={screenOptions} >
            <Profile.Screen name="ProfileScreen" component={ProfileScreen} />
            <Profile.Screen name="BeforeUpgradeScreen" component={BeforeUpgradeScreen} />
            <Profile.Screen name="AfterUpgradeScreen" component={AfterUpgradeScreen} />
            <Profile.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Profile.Screen name="EditWhatIam" component={EditWhatIam} />
            <Profile.Screen name="EditLookIam" component={EditLookIam} />
            <Profile.Screen name="YourInterestScreen" component={YourInterestScreen} />
            <Profile.Screen name="PartnerInterestScreen" component={PartnerInterestScreen} />
            <Profile.Screen name="FeedbackScreen" component={FeedbackScreen} />
            <Profile.Screen name="FeedbackThankyouScreen" component={FeedbackThankyouScreen} />
            <Profile.Screen name="EditPhotos" component={EditPhotos} />
        </Profile.Navigator>
    );
}

export default ProfileStack;
