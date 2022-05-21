import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {FadeInImage} from './FadeInImage';
import {formatToCurrency} from '../utils/formatToCurrency';
import {SetItemCar} from './SetItemCar';
import {Subcategory} from '../interfaces/Subcategory.interface';
import {ShopContext} from '../context/shop/ShopContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatWeight} from '../utils/formatWeight';

interface Props {
  cantidad: number;
  totalPaqReCalc: number;
  subcategory: Subcategory;
  navigateSubcategory: (id: string) => void;
}
export const ProductShop = ({
  subcategory,
  cantidad,
  navigateSubcategory,

  totalPaqReCalc,
}: Props) => {
  const {price, priceGalore, images, name, weight, aviableSizes} = subcategory;

  const {setItem, unsetItem} = useContext(ShopContext);

  const updateCantidad = (subcategoryRef: Subcategory, cantidadRef: number) => {
    setItem({subcategory: subcategoryRef, cantidad: cantidadRef});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          right: 10,
          zIndex: 1,
          padding: 20,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
        onPress={() => unsetItem(subcategory)}>
        <Icon
          name="close-circle-outline"
          size={26}
          color="red"
          style={{position: 'absolute', top: 5, right: 5}}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigateSubcategory(subcategory.id)}>
        <FadeInImage uri={images[0].url} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.subContainer2}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigateSubcategory(subcategory.id)}>
          <Text numberOfLines={1} style={styles.name}>
            {name}
          </Text>
          <Text>
            {cantidad > 5 || totalPaqReCalc > 4
              ? formatToCurrency(priceGalore)
              : formatToCurrency(price)}
          </Text>
          {aviableSizes && aviableSizes.length > 0 ? (
            <Text>
              {formatWeight(
                aviableSizes[aviableSizes.length - 1].peso * cantidad,
              )}
            </Text>
          ) : (
            <Text>{formatWeight(weight * cantidad)}</Text>
          )}
        </TouchableOpacity>
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
  image: {height: 100, width: 90, flex: 2, alignSelf: 'flex-start'},
  subContainer2: {flex: 6, paddingLeft: 5},
  name: {fontSize: 18, marginRight: 50},
  buttonContainer: {
    zIndex: 999999999,
    flex: 1,
    alignSelf: 'flex-end',
    marginTop: -10,
    marginEnd: 5,
  },
});
