import React from 'react';
import {FlatList} from 'react-native';
import {Subcategory} from '../interfaces/subcategory.interface';
import {CategoryCard} from './CategoryCard';
import {SubcategoryCard} from './SubcategoryCard';

interface Props {
  data: Subcategory[];
}
export const SubcategoryCarousel = ({data}: Props) => {
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(category, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        horizontal
        renderItem={({item}) => <SubcategoryCard item={item} />}
      />
    </>
  );
};
