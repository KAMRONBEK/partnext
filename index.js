/**
 * @format
 */

import React, { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { I18nManager } from 'react-native';

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

function HeadlessCheck({ isHeadless }) {
  useEffect(() => {
    setTimeout(() => {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }, 1000)
  }, []);
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent('partnext', () => HeadlessCheck);
