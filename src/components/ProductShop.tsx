import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FadeInImage} from './FadeInImage';
import {formatToCurrency} from '../utils/formatToCurrency';
import {CarItemProps} from '../interfaces/Shop.Interface';
import {SetItemCar} from './SetItemCar';
import {Subcategory} from '../interfaces/Subcategory.interface';
import {ShopContext} from '../context/shop/ShopContext';

export const ProductShop = ({subcategory, cantidad}: CarItemProps) => {
  const {price, priceGalore, images, name, weight} = subcategory;

  const {setItem} = useContext(ShopContext);

  const updateCantidad = (subcategoryRef: Subcategory, cantidadRef: number) => {
    setItem({subcategory: subcategoryRef, cantidad: cantidadRef});
  };

  return (
    <View style={styles.container}>
      <FadeInImage uri={images[0].url} style={styles.image} />
      <View style={styles.subContainer2}>
        <Text style={styles.name}>{name}</Text>
        <Text>
          {cantidad < 6
            ? formatToCurrency(price)
            : formatToCurrency(priceGalore)}
        </Text>
        <Text>{weight} g</Text>
        <View style={styles.buttonContainer}>
          <SetItemCar
            subcategory={subcategory}
            cantidad={cantidad}
            updateCantidad={updateCantidad}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FCFCFC',
    width: '98%',
    alignSelf: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  image: {height: 120, width: 90, flex: 2},
  subContainer2: {flex: 4},
  name: {fontSize: 18},
  buttonContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 5,
    marginEnd: 5,
  },
});
