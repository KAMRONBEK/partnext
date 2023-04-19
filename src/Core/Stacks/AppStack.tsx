import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChatStack from '../../Chat/Stack/ChatStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarHome from './TabBarHome';
import HomeStack from '../../Home/Stack/HomeStack';
import ProfileStack from '../../Profile/Stack/ProfileStack';
import ChatDetailScreen from '../../Chat/Screens/ChatDetailScreen';
import ReportScreen from '../../Chat/Screens/ReportScreen';
import AuthStack from './AuthStack';
import GrowStack from '../../Grow/Stack/GrowStack';
import UserChatProfileScreen from '../../Home/Screens/Opportunities/UserChatProfileScreen';

const Tab = createBottomTabNavigator();
const App = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: '#fff',
  },
};
const AppStack = () => {
  return (
    <App.Navigator>
      <App.Screen
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
        name="BottomTab" component={BootmTab} />
      <App.Screen
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
        name="ChatDetailScreen" component={ChatDetailScreen} />
                      <App.Screen
        options={{
          headerShown: false,
          gestureEnabled: false,
          title: ''
          
        }}
        name="UserChatProfileScreen" component={UserChatProfileScreen} />
      <App.Screen
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
        name="ReportScreen" component={ReportScreen} />
      <App.Screen
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
        name="AuthStack" component={AuthStack} />
    </App.Navigator>
  );
};

function BootmTab(props: any) {
  return (
    <Tab.Navigator tabBar={props => <TabBarHome {...props} />}>
      <Tab.Screen
        options={{
          headerShown: false
        }}
        name="HomeStack" component={HomeStack} />
      <Tab.Screen
        options={{
          headerShown: false
        }}
        name="ChatStack" component={ChatStack} />
      <Tab.Screen
        options={{
          headerShown: false
        }}
        name="GrowStack" component={GrowStack} />
      <Tab.Screen
        options={{
          headerShown: false
        }}
        name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default AppStack;
