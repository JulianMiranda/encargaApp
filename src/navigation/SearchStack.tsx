import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchScreen} from '../screens/Search/SearchScreen';

const Stack = createStackNavigator();

export const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
    </Stack.Navigator>
  );
};
