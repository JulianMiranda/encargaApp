import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MoneyScreen} from '../screens/Money/MoneyScreen';
import {CardScreen} from '../screens/Money/CardScreen';
import {Currency} from '../interfaces/Order.interface';
import {CountryCode} from '../utils/countryTypes';

export type RootStackParams = {
  MoneyScreen: undefined;
  CardScreen: {
    name: string;
    phone: string;
    sender: string;
    reciber: string;
    currency: Currency;
    countryCode: CountryCode;
  };
};

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
      <Stack.Screen
        name="CardScreen"
        component={CardScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
    </Stack.Navigator>
  );
};
