import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {Category} from '../interfaces/Category.interface';
import {CategoryScreen} from '../screens/Home/CategoryScreen';
import {SearchScreen} from '../screens/Home/SearchScreen';
import {Subcategory} from '../interfaces/Subcategory.interface';
import {SubcategoryScreen} from '../screens/Home/SubcategoryScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  ShopScreen: {color: string};
  CategoryScreen: {category: Category; color: string};
  SubcategoryScreen: {subcategory: Subcategory};
};

const Stack = createStackNavigator<RootStackParams>();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
      <Stack.Screen
        name="SubcategoryScreen"
        component={SubcategoryScreen}
        options={{
          headerShown: false,
        }}
      />
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
