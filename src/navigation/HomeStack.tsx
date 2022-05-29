import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {CategoryScreen} from '../screens/Home/CategoryScreen';
import {SearchScreen} from '../screens/Home/SearchScreen';
import {SubcategoryScreen} from '../screens/Home/SubcategoryScreen';
import {OffersScreen} from '../screens/Home/OffersScreen';
import {Category} from '../interfaces/Category.interface';
import {Subcategory} from '../interfaces/Subcategory.interface';

export type RootStackParams = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  ShopScreen: {color: string};
  CategoryScreen: {category: Category; color: string};
  SubcategoryScreen: {subcategory: Subcategory};
  OffersScreen: undefined;
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
      <Stack.Screen
        name="OffersScreen"
        component={OffersScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
    </Stack.Navigator>
  );
};
