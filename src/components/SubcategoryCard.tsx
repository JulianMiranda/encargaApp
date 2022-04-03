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
export const SubcategoryCard = ({item}: Props) => {
  const {price, images} = item;

  const navigation = useNavigation<PropsNavigation>();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
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
        <FadeInImage uri={images[0].url} style={styles.productImage} />
        <Text style={{...styles.name}}>{formatToCurrency(price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 5,
    height: width * 0.31,
    width: width * 0.31,
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
  name: {
    fontSize: 18,
    top: 4,
    left: 10,
    color: 'black',
    fontWeight: '500',
  },
  productImage: {
    height: width * 0.31,
    width: width * 0.31,
    borderRadius: 10,
  },
});
