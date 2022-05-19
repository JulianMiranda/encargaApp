/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {ShopContext} from '../context/shop/ShopContext';
import {formatToCurrency} from '../utils/formatToCurrency';
interface Props {
  totalPaqReCalc: number;
}
export const Factura = ({totalPaqReCalc}: Props) => {
  const {car} = useContext(ShopContext);
  return (
    <>
      <View
        style={{backgroundColor: '#f9f9f9', padding: 5, marginHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Text style={{flex: 1, fontWeight: 'bold'}}>Cant</Text>
          <Text style={{flex: 5, marginLeft: 5, fontWeight: 'bold'}}>
            Producto
          </Text>
          <Text style={{flex: 2, fontWeight: 'bold'}}>Precio</Text>
          <View
            style={{
              flex: 2,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Total
            </Text>
          </View>
        </View>
        {car.map(({cantidad, subcategory}, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={{flex: 1, marginLeft: 5}}>{cantidad}</Text>
            <Text style={{flex: 5, marginRight: 3}}>{subcategory.name}</Text>
            <Text style={{flex: 2}}>
              {totalPaqReCalc > 4 || cantidad > 5
                ? formatToCurrency(subcategory.priceGalore)
                : formatToCurrency(subcategory.price)}
            </Text>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
              }}>
              <Text>
                {totalPaqReCalc > 4 || cantidad > 5
                  ? formatToCurrency(subcategory.priceGalore * cantidad)
                  : formatToCurrency(subcategory.price * cantidad)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};
