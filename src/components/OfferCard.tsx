import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Subcategory} from '../interfaces/Subcategory.interface';
import {FadeInImage} from './FadeInImage';

interface Props {
  offer: Subcategory;
}
export const OfferCard = ({offer}: Props) => {
  const {name, images, priceDiscount, price, priceGalore, priceGaloreDiscount} =
    offer;
  const navigation = useNavigation();

  const discount =
    priceDiscount && priceDiscount !== 0
      ? (100 * (price - priceDiscount)) / price
      : (100 * (priceGalore - priceGaloreDiscount)) / priceGalore;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        console.log('subcat');

        navigation.navigate('SubcategoryScreen', {
          subcategory: offer,
        });
      }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#FAFAFA',
          marginVertical: 2,
        }}>
        <View style={{flex: 4, justifyContent: 'space-around'}}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 20,
              color: '#000',
              marginRight: 15,
            }}
            numberOfLines={1}>
            {name}
          </Text>
        </View>
        <FadeInImage
          uri={images[0].url}
          style={{flex: 2, width: '100%', height: 100, alignSelf: 'flex-end'}}
        />
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'red',
            right: 0,
            top: 0 /* 
            borderBottomColor: 'red',
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderLeftColor: 'red', */,
            borderBottomLeftRadius: 20,
            paddingLeft: 7,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              marginLeft: 3,
              marginRight: 3,
            }}>
            {discount.toFixed(0)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
