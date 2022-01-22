import React, {useContext, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {ThemeContext} from '../context/theme/ThemeContext';
import {AuthContext} from '../context/auth/AuthContext';
import {Tabs} from './Tabs';
import {EnterPhoneScreen} from '../screens/Login/EnterPhone';
import {InfoScreen} from '../screens/Login/InfoScreen';
import {Loading} from '../components/Loading';
import { MainScreen } from '../screens/MainScreen';
import { MoneyStack } from './MoneyStack';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const {status, utility} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  /* useEffect(() => {
    SplashScreen.hide();
  }, []);
  console.log(status); */

  if (status === 'checking') return <Loading />;
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
          <>
          {console.log(utility)}
          {utility === 'choose' ? (
            <Stack.Screen name="MainScreen" component={MainScreen} />
          ):(

            <>
           {utility === 'money' ? (
             <Stack.Screen name="MoneyStack" component={MoneyStack} />
           ):(<Stack.Screen name="Tabs" component={Tabs} />)}
             </>
          )}
                 
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
  /* </View> */
};/* 
<Stack.Screen name="MainScreen" component={MainScreen} />
          <>
          {console.log(utility)}
          {utility !== 'shop' ? (
            <Stack.Screen name="MainScreen" component={MainScreen} />
          ):(<Stack.Screen name="Tabs" component={Tabs} />)}
                 
          </> */