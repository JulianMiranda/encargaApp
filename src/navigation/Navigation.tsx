import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeContext} from '../context/theme/ThemeContext';
import {AuthContext} from '../context/auth/AuthContext';
import {Tabs} from './Tabs';
import {EnterPhoneScreen} from '../screens/Login/EnterPhone';
import {InfoScreen} from '../screens/Login/InfoScreen';
import {Loading} from '../components/Loading';
import {MainScreen} from '../screens/MainScreen';
import {MoneyStack} from './MoneyStack';
import {NotInternetConection} from '../components/NotInternetConection';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const {status, utility} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);

  if (status === 'checking') {
    return <Loading />;
  }
  if (status === 'not-internet') {
    return <NotInternetConection />;
  }
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        /*  headerMode="none" */
        screenOptions={{
          headerShown: false,
        }}>
        {status !== 'authenticated' ? (
          <>
            <Stack.Screen name="InfoScreen" component={InfoScreen} />
            <Stack.Screen
              name="EnterPhoneScreen"
              component={EnterPhoneScreen}
            />
          </>
        ) : (
          <Stack.Screen name="Tabs" component={Tabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
