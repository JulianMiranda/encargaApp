import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';

import {FadeInImage} from './FadeInImage';
import {RootStackParams} from '../navigation/SearchStack';
import {Subcategory} from '../interfaces/Subcategory.interface';
import {formatToCurrency} from '../utils/formatToCurrency';
import {discountGalore} from '../utils/discountGalore';

interface Props {
  item: Subcategory;
}
interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'SubcategorySearchScreen'> {}

const {width} = Dimensions.get('window');
export const SubcategoryCardSearch = ({item}: Props) => {
  const {priceGalore, priceGaloreDiscount, images, name, soldOut, createdAt} =
    item;

  const navigation = useNavigation<PropsNavigation>();

  const fechaInicio = new Date(createdAt).getTime();
  const fechaFin = new Date().getTime();
  const diff = fechaFin - fechaInicio;
  const days = diff / (1000 * 60 * 60 * 14);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{marginBottom: 40}}
      onPress={() => {
        navigation.navigate('SubcategorySearchScreen', {
          subcategory: item,
        });
      }}>
      <View
        style={{
          ...styles.cardContainer,
          /* justifyContent: 'flex-end', */
          /* width: windowWidth * 0.6, */
          /* backgroundColor: 'red' */
        }}>
        <View style={{borderRadius: 10}}>
          {days < 24 && (
            <Image
              source={require('../assets/nuevo2.png')}
              style={styles.newImageProduct}
            />
          )}
          {soldOut && (
            <Image
              source={require('../assets/agotado.png')}
              style={styles.soldOut}
            />
          )}
          <FadeInImage uri={images[0].url} style={styles.productImage} />

          <Text
            style={{
              ...styles.name,
              textDecorationLine: soldOut ? 'line-through' : 'none',
            }}
            numberOfLines={1}>
            {name}
          </Text>
          <Text
            style={{
              ...styles.price,
              backgroundColor: 'rgba(0,0,0,0.9)',
              alignSelf: 'flex-start',
              paddingHorizontal: 5,
              color: 'white',
              borderRadius: 2,
            }}>
            {formatToCurrency(discountGalore(priceGalore, priceGaloreDiscount))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
    borderRadius: 10,
  },
  soldOut: {
    zIndex: 9999999,
    position: 'absolute',
    top: 0,
    right: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: width * 0.47,
    width: width * 0.47,
    borderRadius: 10,
  },
  newImageProduct: {
    position: 'absolute',
    zIndex: 999999,
    top: 0,
    left: 0,
    height: 80,
    width: 80,
  },
});
