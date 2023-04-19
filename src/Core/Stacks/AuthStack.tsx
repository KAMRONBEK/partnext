import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AuthenticationStack from '../../Authentication/Stack/AuthenticationStack';
import AppStack from './AppStack';

const Auth = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: '#fff',
  },
};

const AuthStack = () => {
  return (
    <Auth.Navigator screenOptions={screenOptions}>
      <Auth.Screen
        name="AuthenticationStack"
        component={AuthenticationStack}
      />
      <Auth.Screen
        name="AppStack"
        component={AppStack}
      />
    </Auth.Navigator>
  );
};

export default AuthStack;
