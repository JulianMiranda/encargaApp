/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {AuthContext} from '../context/auth/AuthContext';
import {ThemeContext} from '../context/theme/ThemeContext';
import {formatToCurrency} from '../utils/formatToCurrency';

interface Props {
  cantPaqOS: any;
}
export const ProductosShop = ({cantPaqOS}: Props) => {
  const {prices} = useContext(AuthContext);
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
              flex: 2,
              fontWeight: 'bold',
              color: 'white',
              marginLeft: 5,
              borderRightColor: 'white',
              borderRightWidth: 1,
            }}>
            Peso Kg
          </Text>
          <Text
            style={{
              flex: 2,
              marginLeft: 5,
              fontWeight: 'bold',
              color: 'white',

              borderRightColor: 'white',
              borderRightWidth: 1,
            }}>
            Paquetes
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
            Envío
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
        {cantPaqOS.oneandhalfkgPrice !== 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 1,
            }}>
            <Text style={{flex: 2, marginLeft: 5}}>1.5</Text>
            <Text style={{flex: 2, marginRight: 3, marginLeft: 3}}>
              {cantPaqOS.oneandhalfkgPrice}
            </Text>
            <Text style={{flex: 2}}>
              {formatToCurrency(prices.oneandhalfkgPrice)}
            </Text>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
              }}>
              <Text>
                {formatToCurrency(
                  prices.oneandhalfkgPrice * cantPaqOS.oneandhalfkgPrice,
                )}
              </Text>
            </View>
          </View>
        )}

        {cantPaqOS.twokgPrice !== 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 1,
            }}>
            <Text style={{flex: 2, marginLeft: 5}}>2.0</Text>
            <Text style={{flex: 2, marginRight: 3, marginLeft: 3}}>
              {cantPaqOS.twokgPrice}
            </Text>
            <Text style={{flex: 2}}>{formatToCurrency(prices.twokgPrice)}</Text>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
              }}>
              <Text>
                {formatToCurrency(prices.twokgPrice * cantPaqOS.twokgPrice)}
              </Text>
            </View>
          </View>
        )}
        {cantPaqOS.threekgPrice !== 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 1,
            }}>
            <Text style={{flex: 2, marginLeft: 5}}>3.0</Text>
            <Text style={{flex: 2, marginRight: 3, marginLeft: 3}}>
              {cantPaqOS.threekgPrice}
            </Text>
            <Text style={{flex: 2}}>
              {formatToCurrency(prices.threekgPrice)}
            </Text>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
              }}>
              <Text>
                {formatToCurrency(prices.threekgPrice * cantPaqOS.threekgPrice)}
              </Text>
            </View>
          </View>
        )}
        {cantPaqOS.fourkgPrice !== 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 1,
            }}>
            <Text style={{flex: 2, marginLeft: 5}}>4.0</Text>
            <Text style={{flex: 2, marginRight: 3, marginLeft: 3}}>
              {cantPaqOS.fourkgPrice}
            </Text>
            <Text style={{flex: 2}}>
              {formatToCurrency(prices.fourkgPrice)}
            </Text>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
              }}>
              <Text>
                {formatToCurrency(prices.fourkgPrice * cantPaqOS.fourkgPrice)}
              </Text>
            </View>
          </View>
        )}
        {cantPaqOS.fivekgPrice !== 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 1,
            }}>
            <Text style={{flex: 2, marginLeft: 5}}>5.0</Text>
            <Text style={{flex: 2, marginRight: 3, marginLeft: 3}}>
              {cantPaqOS.fivekgPrice}
            </Text>
            <Text style={{flex: 2}}>
              {formatToCurrency(prices.fivekgPrice)}
            </Text>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
              }}>
              <Text>
                {formatToCurrency(prices.fivekgPrice * cantPaqOS.fivekgPrice)}
              </Text>
            </View>
          </View>
        )}
        {cantPaqOS.sixkgPrice !== 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 1,
            }}>
            <Text style={{flex: 2, marginLeft: 5}}>6.0</Text>
            <Text style={{flex: 2, marginRight: 3, marginLeft: 3}}>
              {cantPaqOS.sixkgPrice}
            </Text>
            <Text style={{flex: 2}}>{formatToCurrency(prices.sixkgPrice)}</Text>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
              }}>
              <Text>
                {formatToCurrency(prices.sixkgPrice * cantPaqOS.sixkgPrice)}
              </Text>
            </View>
          </View>
        )}
        {cantPaqOS.sevenkgPrice !== 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 1,
            }}>
            <Text style={{flex: 2, marginLeft: 5}}>7.0</Text>
            <Text style={{flex: 2, marginRight: 3, marginLeft: 3}}>
              {cantPaqOS.sevenkgPrice}
            </Text>
            <Text style={{flex: 2}}>
              {formatToCurrency(prices.sevenkgPrice)}
            </Text>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
              }}>
              <Text>
                {formatToCurrency(prices.sevenkgPrice * cantPaqOS.sevenkgPrice)}
              </Text>
            </View>
          </View>
        )}
        {cantPaqOS.eigthkgPrice !== 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 1,
            }}>
            <Text style={{flex: 2, marginLeft: 5}}>8.0</Text>
            <Text style={{flex: 2, marginRight: 3, marginLeft: 3}}>
              {cantPaqOS.eigthkgPrice}
            </Text>
            <Text style={{flex: 2}}>
              {formatToCurrency(prices.eigthkgPrice)}
            </Text>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
              }}>
              <Text>
                {formatToCurrency(prices.eigthkgPrice * cantPaqOS.eigthkgPrice)}
              </Text>
            </View>
          </View>
        )}
        {cantPaqOS.ninekgPrice !== 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 1,
            }}>
            <Text style={{flex: 2, marginLeft: 5}}>9.0</Text>
            <Text style={{flex: 2, marginRight: 3, marginLeft: 3}}>
              {cantPaqOS.ninekgPrice}
            </Text>
            <Text style={{flex: 2}}>
              {formatToCurrency(prices.ninekgPrice)}
            </Text>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
              }}>
              <Text>
                {formatToCurrency(prices.ninekgPrice * cantPaqOS.ninekgPrice)}
              </Text>
            </View>
          </View>
        )}
        {cantPaqOS.tenkgPrice !== 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 1,
            }}>
            <Text style={{flex: 2, marginLeft: 5}}>10</Text>
            <Text style={{flex: 2, marginRight: 3, marginLeft: 3}}>
              {cantPaqOS.tenkgPrice}
            </Text>
            <Text style={{flex: 2}}>{formatToCurrency(prices.tenkgPrice)}</Text>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
              }}>
              <Text>
                {formatToCurrency(prices.tenkgPrice * cantPaqOS.tenkgPrice)}
              </Text>
            </View>
          </View>
        )}
      </View>
    </>
  );
};
