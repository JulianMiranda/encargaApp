import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/core';
import {Text, View, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native';

import {ThemeContext} from '../context/theme/ThemeContext';

import {Category} from '../interfaces/Category.interface';
import {FadeInImage} from './FadeInImage';

interface Props {
    icon: String;
  }

const {height, width} = Dimensions.get('window');
export const ChooseCard = ({icon}:Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
console.log(icon)
  const navigation = useNavigation();
  return (
   
      <View
        style={{
          ...styles.cardContainer,
          /* justifyContent: 'flex-end', */
          /* width: windowWidth * 0.6, */
          /* backgroundColor: 'red' */
        }}>
        <Image
          source={require(`../assets/caja2.jpg`)}
          style={styles.productImage} />
       
        {/* <FadeInImage uri={category.image.url} style={styles.productImage} /> */}
        {/* <Text style={{...styles.name, color: '#3f3e3d'}}>{category.name}</Text> */}
      </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    height: width*0.5,
    width: width*0.5,
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
    fontFamily: 'Merienda-Regular',
    fontSize: 22,
    top: 4,
    left: 10,
  },
  productImage: {
    height: width*0.5,
    width: width*0.5,
    borderRadius: 10,
  },
});
