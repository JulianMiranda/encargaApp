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

interface Props {
  item: Subcategory;
}
interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'SubcategoryScreen'> {}

const {width} = Dimensions.get('window');
export const SubcategoryCardHome = ({item}: Props) => {
  const {priceGalore, images, name} = item;

  const navigation = useNavigation<PropsNavigation>();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{marginBottom: 40, marginLeft: 5}}
      onPress={() => {
        console.log('subcat');

        navigation.navigate('SubcategoryScreen', {
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
        <View style={{backgroundColor: '#f1f1f1', borderRadius: 10}}>
          <FadeInImage uri={images[0].url} style={styles.productImage} />

          <Text style={{...styles.name}} numberOfLines={1}>
            {name}
          </Text>
          <Text style={{...styles.price}}>{formatToCurrency(priceGalore)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 5,
    height: width * 0.37,
    width: width * 0.37,
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
    height: width * 0.37,
    width: width * 0.37,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
