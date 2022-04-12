import 'react-native-gesture-handler';
import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import {StackNavigator} from './src/navigation/Navigation';
import {AuthProvider} from './src/context/auth/AuthContext';
import {ThemeProvider} from './src/context/theme/ThemeContext';
import {ShopProvider} from './src/context/shop/ShopContext';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

const AppState = ({children}: any) => {
  LogBox.ignoreLogs([
    'Warning: isMounted(...) is deprecated', // works
    'Module RCTImageLoader', // works
    'Require cycle:', // doesn't work
  ]);

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
