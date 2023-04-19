import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AfterUpgradeScreen from '../../Profile/Screens/AfterUpgradeScreen';
import BeforeUpgradeScreen from '../../Profile/Screens/BeforeUpgradeScreen';
import GrowScreen from '../Screens/GrowScreen';

const Home = createNativeStackNavigator();
const screenOptions = {
    headerShown: false,
    contentStyle: {
        backgroundColor: '#fff',
    },
};
const GrowStack = () => {
    return (
        <Home.Navigator
            initialRouteName={'GrowScreen'}
            screenOptions={screenOptions}>
            <Home.Screen
                name="GrowScreen"
                component={GrowScreen}
            />
            <Home.Screen name="AfterUpgradeScreen" component={AfterUpgradeScreen} />
            <Home.Screen name="BeforeUpgradeScreen" component={BeforeUpgradeScreen} />

        </Home.Navigator>
    );
};

export default GrowStack;
