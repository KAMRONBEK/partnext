/**
 * Notifications handler
 * @format
 */

import React from 'react';
import {Alert} from 'react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {connect} from 'react-redux';

import NavigationService from './Core/Stacks/NavigationService';

class _Notification extends React.Component {
  foregroundListener;

  async componentDidMount() {
    const isEnabled = await this.requestPermission();
    if (isEnabled) {
      this.createChannel();
      this.listenForegroundNotification();
      this.listenBackgroundNotification();
      this.listenForegroundNotificationTap();
    }
  }

  createChannel() {
    notifee.createChannel({
      id: 'partnext',
      name: 'PartNext',
      importance: AndroidImportance.HIGH,
    });
  }

  async requestPermission() {
    const permissionStatus = await messaging().requestPermission();
    const enabled =
      permissionStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      permissionStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  }

  listenForegroundNotificationTap() {
    notifee.onForegroundEvent(({type, detail}) => {
      if (type == EventType.PRESS) {
        this.handleNotification(detail);
      }
    });
  }

  listenForegroundNotification() {
    messaging().onMessage(
      (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        this.displayNotification(remoteMessage);
      },
    );
  }

  listenBackgroundNotification() {
    messaging().setBackgroundMessageHandler(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        setTimeout(() => {
          this.handleNotification(remoteMessage);
        }, 800);
      }
    );
  }

  displayNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
    notifee.displayNotification({
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
      android: {
        channelId: 'partnext',
      },
    });
  }

  async handleNotification(
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) {
    NavigationService.navigate('ChatStack', {});
  }

  componentWillUnmount() {
    this.foregroundListener?.();
  }

  render() {
    return null;
  }
}

const Notification = connect(null, {})(_Notification);

export {Notification};
