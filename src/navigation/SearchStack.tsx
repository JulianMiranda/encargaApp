import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchScreen} from '../screens/Search/SearchScreen';
import {SubcategorySearchScreen} from '../screens/Search/SubcategorySearchScreen';
import {Subcategory} from '../interfaces/Subcategory.interface';

const Stack = createStackNavigator();

export type RootStackParams = {
  SearchScreen: undefined;
  SubcategorySearchScreen: {subcategory: Subcategory};
};
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
      <Stack.Screen
        name="SubcategorySearchScreen"
        component={SubcategorySearchScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
    </Stack.Navigator>
  );
};
