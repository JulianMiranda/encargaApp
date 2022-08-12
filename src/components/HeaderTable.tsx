import React from 'react';
import {View, Text} from 'react-native';
interface Props {
  editHeader: string;
}
export const HeaderTable = ({editHeader}: Props) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 5,
          backgroundColor: '#f1f1f1',
          borderRadius: 10,
          padding: 10,
        }}>
        <View style={{flex: 6}}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 14,
            }}>
            Producto
          </Text>
        </View>
        <View style={{flex: 2}}>
          <Text
            style={{
              textAlign: 'right',
              marginRight: -5,
              fontSize: 14,
            }}>
            Precio
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            marginLeft: 1,
          }}>
          <Text
            style={{
              textAlign: 'center',
              marginLeft: 7,
              fontSize: 14,
            }}>
            Cantidad
          </Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={{textAlign: 'center'}}>{editHeader}</Text>
        </View>
      </View>
    </>
  );
};
