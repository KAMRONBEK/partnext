import React, { useEffect, useState } from 'react';
import AppStack from './src/Core/Stacks/AppStack';
import AuthStack from './src/Core/Stacks/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Variables } from './src/Common/constants/Variables';
import { setAccessToken } from './src/Common/constants/GlobalFunction';


const Main = React.memo(() => {

  // const { isAuthenticated } = useAppSelector(state => state.global);

  const [token, setToken] = useState('');

  useEffect(() => {
    setTimeout(() => {
    }, 500)
    getToken()
  }, []);

  const getToken = async () => {
    const authToken = await AsyncStorage.getItem(Variables.accessToken)
    setToken(authToken)
    if (authToken) {
      setAccessToken(authToken)
    }
    return authToken
  }

  return token ? <AppStack /> : <AuthStack />;
});

export default Main;
