import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/core';
import { View,  StyleSheet, Dimensions, Image} from 'react-native';

import {ThemeContext} from '../context/theme/ThemeContext';


const {height, width} = Dimensions.get('window');
export const ChooseCard2 = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
   
      <View
        style={{
          ...styles.cardContainer,
        }}>
        <Image
          source={require(`../assets/dinero2.png`)}
          style={styles.productImage} />
       
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
