import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CarItemProps} from '../interfaces/Shop.Interface';
import {Subcategory} from '../interfaces/Subcategory.interface';

type Operation = 'add' | 'remove';
interface Prop extends CarItemProps {
  updateCantidad: (subcategory: Subcategory, cantidad: number) => void;
}

export const SetItemCar = ({subcategory, cantidad, updateCantidad}: Prop) => {
  const setCarItem = (action: Operation) => {
    if (action === 'add') {
      updateCantidad(subcategory, cantidad + 1);
    } else {
      updateCantidad(subcategory, cantidad - 1);
    }
    /*  if (cantidad < 1) {
          console.log('Sacar aviso mayor q cero');
        } else {
          setItem({subcategory: subcategory, cantidad: cantidad + 1});
        } */
  };
  return (
    <>
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
    </>
  );
};
const styles = StyleSheet.create({
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
