import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EditILookFor from '../Screens/EditILookFor';
import GrowUnlocked from '../Screens/GrowUnlocked';
import LoginScreen from '../Screens/LoginScreen';
import MainScreen from '../Screens/MainScreen';
import OnboardingIntrest from '../Screens/OnboardingIntrest';
import OnboardingToolTip from '../Screens/OnboardingToolTip';
import OnBoarding_5 from '../Screens/OnBoarding_5';
import OnBoarding_6 from '../Screens/OnBoarding_6';
import PartnerInterestScreen from '../Screens/PartnerInterestScreen';
import PhoneValidation from '../Screens/PhoneValidation';
import Registration from '../Screens/Registration';
import RegistrationComplete from '../Screens/RegistrationComplete';

const Authentication = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: '#fff',
  },
};

const AuthenticationStack = () => {
  return (
    <Authentication.Navigator
      screenOptions={screenOptions}
      initialRouteName="MainScreen">
      <Authentication.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Authentication.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Authentication.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
      />
      <Authentication.Screen
        name="PhoneValidation"
        component={PhoneValidation}
        options={{ headerShown: false }}
      />
      <Authentication.Screen
        name="OnboardingToolTip"
        component={OnboardingToolTip}
        options={{ headerShown: false }}
      />
      <Authentication.Screen
        name="EditILookFor"
        component={EditILookFor}
        options={{ headerShown: false }}
      />
      <Authentication.Screen
        name="OnboardingIntrest"
        component={OnboardingIntrest}
        options={{ headerShown: false }}
      />
      <Authentication.Screen
        name="PartnerInterestScreen"
        component={PartnerInterestScreen}
        options={{ headerShown: false }}
      />
      <Authentication.Screen
        name="OnBoarding_5"
        component={OnBoarding_5}
        options={{ headerShown: false }}
      />
      <Authentication.Screen
        name="OnBoarding_6"
        component={OnBoarding_6}
        options={{ headerShown: false }}
      />
      <Authentication.Screen
        name="RegistrationComplete"
        component={RegistrationComplete}
        options={{ headerShown: false }}
      />
      <Authentication.Screen
        name="GrowUnlocked"
        component={GrowUnlocked}
        options={{ headerShown: false }}
      />
    </Authentication.Navigator>
  );
};

export default AuthenticationStack;
