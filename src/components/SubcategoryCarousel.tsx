import React from 'react';
import {FlatList} from 'react-native';
import {Subcategory} from '../interfaces/subcategory.interface';
import {SubcategoryCardHome} from './SubcategoryCardHome';

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
        renderItem={({item}) => <SubcategoryCardHome item={item} />}
      />
    </>
  );
};
