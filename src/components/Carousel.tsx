import React from 'react';
import {FlatList} from 'react-native';
import {SubcategoryCardHome} from './SubcategoryCardHome';
interface Props {
  data: any[];
}
export const CarouselComponent = ({data}: Props) => {
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(category, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        horizontal
        renderItem={({item}) => (
          <SubcategoryCardHome item={item.mostSaleSubcategory} />
        )}
      />
    </>
  );
};
