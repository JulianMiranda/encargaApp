import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Subcategory} from '../interfaces/Subcategory.interface';
import {FadeInImage} from './FadeInImage';

interface Props {
  offer: Subcategory;
}
export const OfferCard = ({offer}: Props) => {
  const {name, images, priceDiscount, price, priceGaloreDiscount} = offer;
  const navigation = useNavigation();
  const discount =
    priceDiscount && priceDiscount !== 0
      ? (100 * (price - priceDiscount)) / price
      : (100 * (price - priceGaloreDiscount)) / price;
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
          backgroundColor: '#C8C8C8',
          marginVertical: 2,
        }}>
        <View style={{flex: 4, justifyContent: 'space-around'}}>
          <Text
            style={{
              fontSize: 22,
              marginLeft: 20,
              color: '#fff',
            }}>
            {name}
          </Text>
          <Text style={{fontSize: 20, color: '#fff', marginLeft: 20}}>
            Ahorra un {discount.toFixed(0)} %
          </Text>
        </View>
        <FadeInImage
          uri={images[0].url}
          style={{flex: 2, width: '100%', height: 100, alignSelf: 'flex-end'}}
        />
      </View>
    </TouchableOpacity>
  );
};
