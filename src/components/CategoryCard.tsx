import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {ThemeContext} from '../context/theme/ThemeContext';

import {Category} from '../interfaces/Category.interface';
import {FadeInImage} from './FadeInImage';

interface Props {
  category: Category;
}

const {height, width} = Dimensions.get('window');
export const CategoryCard = ({category}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('CategoryScreen', {
          category: category,
          color: colors.card,
        })
      }>
      <View
        style={{
          ...styles.cardContainer,

          /* justifyContent: 'flex-end', */
          /* width: windowWidth * 0.6, */
          /* backgroundColor: 'red' */
        }}>
        <View style={{backgroundColor: '#f1f1f1', borderRadius: 10}}>
          <FadeInImage uri={category.image.url} style={styles.productImage} />
          <Text style={{...styles.name, color: 'black', marginBottom: 10}}>
            {category.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: width * 0.7,
    width: width * 0.7,
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
    fontSize: 22,
    top: 4,
    left: 10,
  },
  productImage: {
    height: width * 0.7,
    width: width * 0.7,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    resizeMode: 'cover',
  },
});
