import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountScreen} from '../screens/Account/AccountScreen';
import {Order} from '../interfaces/Order.interface';
import {SingleOrderScreen} from '../screens/Account/SingleOrderScreen';
import {OrderScreen} from '../screens/Account/OrderScreen';
import {CarnetScreen} from '../screens/Account/CarnetScreen';

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
        name="OrderScreen"
        component={OrderScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
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
      <Stack.Screen
        name="CarnetScreen"
        component={CarnetScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
    </Stack.Navigator>
  );
};
