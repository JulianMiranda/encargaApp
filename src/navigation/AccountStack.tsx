import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountScreen} from '../screens/Account/AccountScreen';
import {Order} from '../interfaces/Order.interface';
import {SingleOrderScreen} from '../screens/Account/SingleOrderScreen';

const Stack = createStackNavigator();

export type RootStackParams = {
  OrdersScreen: undefined;
  SingleOrderScreen: {order: Order};
};

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
      <Stack.Screen
        name="SingleOrderScreen"
        component={SingleOrderScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
    </Stack.Navigator>
  );
};
