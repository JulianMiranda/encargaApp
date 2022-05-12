import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ShopScreen} from '../screens/Shop/ShopScreen';
import {CarnetScreen} from '../screens/Shop/CarnetScreen';

const Stack = createStackNavigator();

export type RootStackParams = {
  ShopScreen: undefined;
  CarnetScreen: {paquetes: number};
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
        name="CarnetScreen"
        component={CarnetScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
    </Stack.Navigator>
  );
};
