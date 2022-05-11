import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountScreen} from '../screens/Account/AccountScreen';

const Stack = createStackNavigator();

export const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
    </Stack.Navigator>
  );
};
