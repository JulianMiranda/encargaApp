/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {ShopContext} from '../context/shop/ShopContext';
import {formatToCurrency} from '../utils/formatToCurrency';
interface Props {
  cantPaq: number;
}
export const Factura = ({cantPaq}: Props) => {
  const {car} = useContext(ShopContext);
  return (
    <>
      <View style={{backgroundColor: '#E8E8E8', padding: 5}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{flex: 1, fontWeight: 'bold'}}>Cant</Text>
          <Text style={{flex: 6, marginLeft: 5, fontWeight: 'bold'}}>
            Producto
          </Text>
          <Text style={{flex: 2, fontWeight: 'bold'}}>Precio</Text>
          <Text
            style={{
              flex: 2,
              fontWeight: 'bold',
            }}>
            Total
          </Text>
        </View>
        {car.map(({cantidad, subcategory}, index) => (
          <View
            key={index}
            style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={{flex: 1, marginLeft: 5}}>{cantidad}</Text>
            <Text style={{flex: 6}}>{subcategory.name}</Text>
            <Text style={{flex: 2}}>
              {cantPaq < 5
                ? formatToCurrency(subcategory.price)
                : formatToCurrency(subcategory.priceGalore)}
            </Text>
            <Text
              style={{
                flex: 2,
              }}>
              {cantPaq < 5
                ? formatToCurrency(subcategory.price * cantidad)
                : formatToCurrency(subcategory.priceGalore * cantidad)}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
};
