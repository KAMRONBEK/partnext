import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Opportunities from '../Screens/Opportunities/Opportunities';

const Home = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: '#fff',
  },
};
const HomeStack = () => {
  return (
    <Home.Navigator
      initialRouteName={'Opportunities'}
      screenOptions={screenOptions}>
      <Home.Screen name="Opportunities" component={Opportunities} />
    </Home.Navigator>
  );
};

export default HomeStack;
