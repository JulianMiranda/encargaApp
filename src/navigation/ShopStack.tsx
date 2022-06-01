import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ShopScreen} from '../screens/Shop/ShopScreen';
import {InputCarnetScreen} from '../screens/Shop/InputCarnetScreen';
import {ShopSuccess} from '../screens/Shop/ShopSuccess';

const Stack = createStackNavigator();

export type RootStackParams = {
  ShopScreen: undefined;
  ShopSuccess: undefined;
  InputCarnetScreen: {paquetes: number};
};

export const ShopStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShopScreen"
        component={ShopScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
      <Stack.Screen
        name="InputCarnetScreen"
        component={InputCarnetScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />

      <Stack.Screen
        name="ShopSuccess"
        component={ShopSuccess}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
    </Stack.Navigator>
  );
};
