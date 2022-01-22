import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ShopScreen} from '../screens/Shop/ShopScreen';
import { MoneyScreen } from '../screens/Money/MoneyScreen';

const Stack = createStackNavigator();

export const MoneyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoneyScreen"
        component={MoneyScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
    </Stack.Navigator>
  );
};
