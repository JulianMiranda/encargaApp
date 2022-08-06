import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {LogBox, StatusBar} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import {StackNavigator} from './src/navigation/Navigation';
import {AuthProvider} from './src/context/auth/AuthContext';
import {ThemeProvider} from './src/context/theme/ThemeContext';
import {ShopProvider} from './src/context/shop/ShopContext';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

const AppState = ({children}: any) => {
  LogBox.ignoreLogs([
    'Warning: isMounted(...) is deprecated', // works
    'Module RCTImageLoader', // works
    'Require cycle:', // doesn't work
  ]);
  useEffect(() => {
    const type = 'notification';
    PushNotificationIOS.addEventListener(type, onRemoteNotification);
    return () => {
      PushNotificationIOS.removeEventListener(type);
    };
  });
  const onRemoteNotification = (notification: any) => {
    const isClicked = notification.getData().userInteraction === 1;

    if (isClicked) {
      // Navigate user to another screen
    } else {
      // Do something else with push notification
    }
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />

      <ToastProvider>
        <AuthProvider>
          <ThemeProvider>
            <ShopProvider>{children}</ShopProvider>
          </ThemeProvider>
        </AuthProvider>
      </ToastProvider>
    </>
  );
};

export const App = () => {
  return (
    <AppState>
      <StackNavigator />
    </AppState>
  );
};
export default App;
