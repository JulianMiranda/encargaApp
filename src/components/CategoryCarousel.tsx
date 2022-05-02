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
  const renderItem = (item: Category) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 5,
        }}>
        <FadeInImage
          uri={item.image.url}
          style={{
            width: '100%',
            height: 150,
            resizeMode: 'cover',
            borderRadius: 5,
          }}
        />
        <Text
          style={{
            fontSize: 18,
            marginBottom: 5,
            alignSelf: 'center',
          }}>
          {item.name}
        </Text>
      </View>
    );
  };
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(category, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        horizontal
        renderItem={({item}) => <CategoryCard category={item} />}
      />
      {/* <Carousel
      data={data}
      firstItem={1}
      layout={'default'}
      renderItem={({item}) => renderItem(item)}
      sliderWidth={viewportWidth}
      itemWidth={viewportWidth * 0.6}
    /> */}
    </>
  );
};
