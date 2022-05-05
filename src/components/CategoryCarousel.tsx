import React from 'react';
import {View, Text, Dimensions, FlatList} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {ENTRIES1} from '../utils/entries';
import {FadeInImage} from './FadeInImage';
import {Category} from '../interfaces/Category.interface';
import {CategoryCard} from './CategoryCard';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
interface Props {
  data: Category[];
}
export const CategoryCarousel = ({data}: Props) => {
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(category, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        horizontal
        renderItem={({item}) => <CategoryCard category={item} />}
      />
    </>
  );
};
