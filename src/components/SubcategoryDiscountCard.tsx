import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';

import {FadeInImage} from './FadeInImage';
import {RootStackParams} from '../navigation/HomeStack';
import {Subcategory} from '../interfaces/Subcategory.interface';
import {formatToCurrency} from '../utils/formatToCurrency';
import {discountGalore} from '../utils/discountGalore';

interface Props {
  item: Subcategory;
}
interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'SubcategoryScreen'> {}

const {width} = Dimensions.get('window');
export const SubcategoryDiscountCard = ({item}: Props) => {
  const {priceGalore, priceGaloreDiscount, price, priceDiscount, images, name} =
    item;

  const navigation = useNavigation<PropsNavigation>();

  const discount =
    priceGaloreDiscount && priceGaloreDiscount !== 0
      ? (100 * (priceGalore - priceGaloreDiscount)) / priceGalore
      : (100 * (price - priceDiscount)) / price;
  return (
    <>
      <View
        style={{
          height: 1,
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#f1f1f1',
        }}
      />

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('SubcategoryScreen', {
            subcategory: item,
          });
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 2,
          }}>
          <FadeInImage
            uri={images[0].url}
            style={{
              flex: 2,
              width: '100%',
              height: 100,
              alignSelf: 'flex-start',
            }}
          />

          <View style={{flex: 4, justifyContent: 'space-between'}}>
            <View
              style={{
                backgroundColor: 'red',
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
                width: '20%',
                marginLeft: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                }}>
                {discount.toFixed(0)}%
              </Text>
            </View>

            {priceGaloreDiscount && priceGaloreDiscount !== 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#c0c0c0',
                    }}>
                    Antes {''}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      textDecorationLine: 'line-through',
                      color: '#c0c0c0',
                    }}>
                    {formatToCurrency(priceGalore)}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    flexDirection: 'row',
                    marginLeft: 20,
                    borderRadius: 4,
                    paddingHorizontal: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#ffffff',
                    }}>
                    Ahora {''}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#fff',
                    }}
                    numberOfLines={1}>
                    {formatToCurrency(priceGaloreDiscount)}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#c0c0c0',
                    }}>
                    Antes {''}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      textDecorationLine: 'line-through',
                      color: '#c0c0c0',
                    }}>
                    {formatToCurrency(price)}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    flexDirection: 'row',
                    marginLeft: 20,
                    borderRadius: 4,
                    paddingHorizontal: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#ffffff',
                    }}>
                    Ahora {''}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#fff',
                    }}
                    numberOfLines={1}>
                    {formatToCurrency(priceDiscount)}
                  </Text>
                </View>
              </View>
            )}

            <View>
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 10,
                  color: '#000',
                  marginRight: 15,
                  marginBottom: 5,
                }}
                numberOfLines={1}>
                {name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 5,
    height: width * 0.47,
    width: width * 0.47,
    marginBottom: 60,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textContainer: {},
  name: {
    fontSize: 16,
    top: 4,
    left: 10,
    color: 'black',
    fontWeight: '500',
    maxWidth: '75%',
  },
  price: {
    fontSize: 12,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    color: 'black',
    fontWeight: '500',
  },
  productImage: {
    height: width * 0.47,
    width: width * 0.47,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
