/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {ShopContext} from '../context/shop/ShopContext';
import {ThemeContext} from '../context/theme/ThemeContext';
import {discount} from '../utils/discount';
import {discountGalore} from '../utils/discountGalore';
import {formatToCurrency} from '../utils/formatToCurrency';
interface Props {
  totalPaqReCalc: number;
}
export const Factura = ({totalPaqReCalc}: Props) => {
  const {car} = useContext(ShopContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <>
      <View
        style={{
          padding: 5,
          marginHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: colors.card /* 
            borderBottomColor: '#f9f9f9',
            borderBottomWidth: 2, */,
          }}>
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              color: 'white',
              marginLeft: 5,
              borderRightColor: 'white',
              borderRightWidth: 1,
            }}>
            Cant
          </Text>
          <Text
            style={{
              flex: 5,
              marginLeft: 5,
              fontWeight: 'bold',
              color: 'white',

              borderRightColor: 'white',
              borderRightWidth: 1,
            }}>
            Producto
          </Text>
          <Text
            style={{
              flex: 2,
              fontWeight: 'bold',
              color: 'white',
              borderRightColor: 'white',
              borderRightWidth: 1,
              marginLeft: 5,
            }}>
            Precio
          </Text>
          <View
            style={{
              flex: 2,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
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
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 1,
            }}>
            <Text style={{flex: 1, marginLeft: 5}}>{cantidad}</Text>
            <Text style={{flex: 5, marginRight: 3, marginLeft: 3}}>
              {subcategory.name}
            </Text>
            <Text style={{flex: 2}}>
              {totalPaqReCalc > 4 || cantidad > 5
                ? formatToCurrency(
                    discountGalore(
                      subcategory.priceGalore,
                      subcategory.priceGaloreDiscount,
                    ),
                  )
                : formatToCurrency(
                    discount(subcategory.price, subcategory.priceDiscount),
                  )}
            </Text>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
              }}>
              <Text>
                {totalPaqReCalc > 4 || cantidad > 5
                  ? formatToCurrency(
                      discountGalore(
                        subcategory.priceGalore,
                        subcategory.priceGaloreDiscount,
                      ) * cantidad,
                    )
                  : formatToCurrency(
                      discount(subcategory.price, subcategory.priceDiscount) *
                        cantidad,
                    )}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};
