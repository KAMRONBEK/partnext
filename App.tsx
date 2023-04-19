import React from 'react';
import { Provider } from 'react-redux';
import Main from './Main';
import { NavigationContainer } from '@react-navigation/native';
import { configureStore } from './src/Core/Redux/store';
import NavigationService from './src/Core/Stacks/NavigationService';
import { Notification } from './src/notification-handler';

const App = () => {

  const store = configureStore();

  return (
    <Provider store={store}>
      <NavigationContainer
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      >
        <Main />
      </NavigationContainer>
      <Notification />
    </Provider>
  );
};

export default App;
