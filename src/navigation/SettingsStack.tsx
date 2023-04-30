import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingsScreen} from '../screens/Settings/SettingsScreen';
import {ChangeThemeScreen} from '../screens/Settings/ChangeThemeScreen';
import {ThemeContext} from '../context/theme/ThemeContext';
import {TandCScreen} from '../screens/Settings/TandCScreen';
import {AppScreen} from '../screens/Settings/AppScreen';
import {TrackScreen} from '../screens/Settings/TrackScreen';
import {SingleTrackScreen} from '../screens/Settings/SingleTackScreen';
import {NotificationScreen} from '../screens/Settings/NotificationScreen';
import {PrivacityScreen} from '../screens/Settings/PrivacityScreen';
import {PerfilScreen} from '../screens/Settings/PerfilScreen';
import {TermsScreen} from '../screens/Settings/TermsScreen';

const Stack = createStackNavigator();

export type RootStackParams = {
  SettingsScreen: undefined;
  ChangeThemeScreen: undefined;
  OrdersScreen: undefined;
  TandCScreen: undefined;
  TrackScreen: undefined;
  SingleTrackScreen: {code: string};
  NotificationScreen: undefined;
};

export const SettingsStack = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
          /* title: 'Configuración',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="ChangeThemeScreen"
        component={ChangeThemeScreen}
        options={{
          headerShown: false,
          /* title: 'ChangeTheme', */
          /* headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="TandCScreen"
        component={TandCScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="AppScreen"
        component={AppScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="TrackScreen"
        component={TrackScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="SingleTrackScreen"
        component={SingleTrackScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="PerfilScreen"
        component={PerfilScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="PrivacityScreen"
        component={PrivacityScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="TermsScreen"
        component={TermsScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
    </Stack.Navigator>
  );
};
