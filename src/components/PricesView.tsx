/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from '../context/theme/ThemeContext';
import {AviableSize} from '../interfaces/Subcategory.interface';
import {formatToCurrency} from '../utils/formatToCurrency';
import {formatWeight} from '../utils/formatWeight';
interface Props {
  price: number;
  priceGalore: number;
  priceGaloreDiscount: number;
  priceDiscount: number;
  weight: number;
  sizeSelected: AviableSize | undefined;
}
export const PricesView = ({
  price,
  priceGalore,
  priceGaloreDiscount,
  priceDiscount,
  weight,
  sizeSelected,
}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <>
      {price === priceGalore ? (
        <>
          <View style={styles.divider} />
          <View style={styles.rowView}>
            <Text
              style={{
                ...styles.price,
                fontSize: priceGaloreDiscount !== 0 ? 18 : 26,
                textDecorationLine:
                  priceGaloreDiscount !== 0 &&
                  typeof priceGaloreDiscount === 'number'
                    ? 'line-through'
                    : 'none',
                color:
                  priceGaloreDiscount !== 0 &&
                  typeof priceGaloreDiscount === 'number'
                    ? '#c0c0c0'
                    : colors.primary,
              }}>
              {formatToCurrency(priceGalore)}
            </Text>
            {priceGaloreDiscount !== 0 &&
              typeof priceGaloreDiscount === 'number' && (
                <Text
                  style={{
                    marginLeft: 10,
                    ...styles.price,
                    color: colors.primary,
                  }}>
                  {formatToCurrency(priceGaloreDiscount)}
                </Text>
              )}
            <View
              style={{
                position: 'absolute',
                right: 10,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  ...styles.aviableSizes,
                  fontWeight: 'bold',
                }}>
                Peso: {''}
              </Text>
              <Text style={styles.gramos}>
                {sizeSelected
                  ? formatWeight(sizeSelected.peso)
                  : formatWeight(weight)}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
        </>
      ) : (
        <>
          <View style={styles.divider} />
          <View style={styles.rowView}>
            <Text
              style={{
                ...styles.price,
                fontSize: priceGaloreDiscount !== 0 ? 18 : 26,
                textDecorationLine:
                  priceGaloreDiscount !== 0 &&
                  typeof priceGaloreDiscount === 'number'
                    ? 'line-through'
                    : 'none',
                color:
                  priceGaloreDiscount !== 0 &&
                  typeof priceGaloreDiscount === 'number'
                    ? '#c0c0c0'
                    : colors.primary,
              }}>
              {formatToCurrency(priceGalore)}
            </Text>
            {priceGaloreDiscount !== 0 &&
              typeof priceGaloreDiscount === 'number' && (
                <Text
                  style={{
                    marginLeft: 10,
                    ...styles.price,
                    color: colors.primary,
                  }}>
                  {formatToCurrency(priceGaloreDiscount)}
                </Text>
              )}
          </View>

          <View style={styles.viewGalorePrice}>
            <Text style={{color: 'black'}}>Precio por mayor</Text>
            {/* <Text
              style={{
                ...styles.aviableSizes,
                marginRight: 25,
                fontWeight: 'bold',
              }}>
              Peso
            </Text>
            <Text
              style={{
                ...styles.aviableSizes,
              }}>
              <Text style={styles.gramos}>
                {sizeSelected
                  ? formatWeight(sizeSelected.peso)
                  : formatWeight(weight)}
              </Text>
            </Text> */}
            <View
              style={{
                position: 'absolute',
                right: 10,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  ...styles.aviableSizes,
                  fontWeight: 'bold',
                }}>
                Peso: {''}
              </Text>
              <Text style={styles.gramos}>
                {sizeSelected
                  ? formatWeight(sizeSelected.peso)
                  : formatWeight(weight)}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />
          <View style={{...styles.rowView}}>
            <Text
              style={{
                ...styles.price,
                fontSize: 18,
                color:
                  priceDiscount !== 0 && typeof priceDiscount === 'number'
                    ? '#c0c0c0'
                    : 'black',
                textDecorationLine:
                  priceDiscount !== 0 && typeof priceDiscount === 'number'
                    ? 'line-through'
                    : 'none',
              }}>
              {formatToCurrency(price)}
            </Text>

            {priceDiscount !== 0 && typeof priceDiscount === 'number' && (
              <Text
                style={{
                  ...styles.price,
                  color: 'black',
                  fontSize: 18,
                  marginLeft: 10,
                }}>
                {formatToCurrency(priceDiscount)}
              </Text>
            )}
            {/* <Text
              style={{
                ...styles.aviableSizes,
                alignSelf: 'flex-end',
                position: 'absolute',
                right: 10,
              }}>
              <Text style={styles.gramos}>
                {sizeSelected
                  ? formatWeight(sizeSelected.peso)
                  : formatWeight(weight)}
              </Text>
            </Text> */}
          </View>

          <View style={styles.viewUnitPrice}>
            <Text style={{}}>Precio por unidad</Text>
          </View>

          <View style={styles.divider} />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rowView: {flexDirection: 'row', alignItems: 'center', marginLeft: 10},
  price: {fontWeight: 'bold', fontSize: 24},
  viewGalorePrice: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 3,
  },
  viewUnitPrice: {
    backgroundColor: 'white',
    padding: 3,
    marginBottom: 3,
  },
  divider: {
    height: 2,
    width: '99%',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
  aviableSizes: {fontSize: 18},
  gramos: {fontSize: 16},
});
