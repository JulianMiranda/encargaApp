import React, {useEffect} from 'react';
import {View, Text, Dimensions, FlatList} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {ENTRIES1} from '../utils/entries';
import {FadeInImage} from './FadeInImage';
import {Category} from '../interfaces/Category.interface';
import {CategoryCard} from './CategoryCard';
import {useCategoryPaginated} from '../hooks/useCategoryPaginated';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
interface Props {
  data?: Category[];
}
export const CategoryCarousel = ({data}: Props) => {
  const {categoryList, loadCategories} = useCategoryPaginated();

  return (
    <>
      <FlatList
        data={categoryList}
        keyExtractor={(category, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadCategories}
        onEndReachedThreshold={0.4}
        horizontal
        renderItem={({item}) => <CategoryCard category={item} />}
      />
    </>
  );
};
