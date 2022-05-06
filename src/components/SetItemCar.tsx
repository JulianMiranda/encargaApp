import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from '../context/theme/ThemeContext';
import {CarItemProps} from '../interfaces/Shop.Interface';
import {Subcategory} from '../interfaces/Subcategory.interface';

type Operation = 'add' | 'remove';
interface Prop extends CarItemProps {
  updateCantidad: (subcategory: Subcategory, cantidad: number) => void;
}

export const SetItemCar = ({subcategory, cantidad, updateCantidad}: Prop) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
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
            style={{...styles.leftContainer, backgroundColor: colors.card}}
            activeOpacity={0.8}
            onPress={() => setCarItem('remove')}>
            <Text style={styles.left}> -</Text>
          </TouchableOpacity>
        )}

        <View
          style={{
            ...styles.numberContainer,
            borderColor: colors.card,
            backgroundColor: colors.card,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 100,
              height: 30,
              borderColor: colors.card,
              borderWidth: 1,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <Text style={{...styles.number, color: colors.card}}>
              {cantidad}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{...styles.addContainer, backgroundColor: colors.card}}
          activeOpacity={0.8}
          onPress={() => setCarItem('add')}>
          <Text style={styles.add}>+</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    marginRight: 5,
  },
  leftContainer: {
    backgroundColor: 'white',
    borderColor: 'gray',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  left: {fontSize: 22, fontWeight: 'bold', color: 'white'},
  numberContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    /*  marginRight: 1, */
  },
  number: {fontSize: 18, fontWeight: '600'},
  addContainer: {
    backgroundColor: 'white',
    borderColor: 'gray',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  add: {fontSize: 22, fontWeight: '600', color: 'white'},
});
