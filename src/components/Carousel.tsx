import React from 'react';
import {FlatList} from 'react-native';
import {SubcategoryCard} from './SubcategoryCard';
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
        renderItem={({item}) => <SubcategoryCard item={item._id} />}
      />
    </>
  );
};
