import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountScreen} from '../screens/Account/AccountScreen';
import {Order} from '../interfaces/Order.interface';
import {SingleOrderScreen} from '../screens/Account/SingleOrderScreen';
import {OrderScreen} from '../screens/Account/OrderScreen';
import {CarnetScreen} from '../screens/Account/CarnetScreen';
import {PricesScreen} from '../screens/Account/PricesScreen';
import {RateScreen} from '../screens/Account/RateScreen';
import {AduanaScreen} from '../screens/Account/AduanaScreen';

const Stack = createStackNavigator();

export type RootStackParams = {
  OrdersScreen: undefined;
  PricesScreen: undefined;
  RateScreen: undefined;
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
      <Stack.Screen
        name="PricesScreen"
        component={PricesScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="RateScreen"
        component={RateScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="AduanaScreen"
        component={AduanaScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
    </Stack.Navigator>
  );
};
