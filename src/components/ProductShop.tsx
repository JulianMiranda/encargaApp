import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {FadeInImage} from './FadeInImage';
import {formatToCurrency} from '../utils/formatToCurrency';
import {ShopContext} from '../context/shop/ShopContext';
import {CarItemProps} from '../interfaces/Shop.Interface';

type Operation = 'add' | 'remove';
export const ProductShop = ({subcategory, cantidad}: CarItemProps) => {
  const {price, images, name, weight} = subcategory;
  const {setItem} = useContext(ShopContext);

  const setCarItem = (action: Operation) => {
    if (action === 'add') {
      setItem({subcategory: subcategory, cantidad: cantidad + 1});
    } else {
      setItem({subcategory: subcategory, cantidad: cantidad - 1});
    }
    /*  if (cantidad < 1) {
      console.log('Sacar aviso mayor q cero');
    } else {
      setItem({subcategory: subcategory, cantidad: cantidad + 1});
    } */
  };

  return (
    <View style={styles.container}>
      <FadeInImage uri={images[0].url} style={styles.image} />
      <View style={styles.subContainer2}>
        <Text style={styles.name}>{name}</Text>
        <Text>{formatToCurrency(price)}</Text>
        <Text>{weight} g</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            {cantidad > 0 && (
              <TouchableOpacity
                style={styles.leftContainer}
                activeOpacity={0.8}
                onPress={() => setCarItem('remove')}>
                <Text style={styles.left}>-</Text>
              </TouchableOpacity>
            )}

            <View style={styles.numberContainer}>
              <Text style={styles.number}>{cantidad}</Text>
            </View>
            <TouchableOpacity
              style={styles.addContainer}
              activeOpacity={0.8}
              onPress={() => setCarItem('add')}>
              <Text style={styles.add}>+</Text>
            </TouchableOpacity>
          </View>
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
  buttonRow: {flexDirection: 'row', marginRight: 5},
  leftContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginRight: -1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  left: {fontSize: 18, fontWeight: '600'},
  numberContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  number: {fontSize: 16, fontWeight: '600'},
  addContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  add: {fontSize: 18, fontWeight: '600'},
});
