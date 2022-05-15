import React from 'react';
import {Text, View} from 'react-native';
import {Carnet} from '../interfaces/CarnetResponse.interface';

interface Props {
  carnet: Carnet;
}
export const CarnetComponent = ({carnet}: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#fAfAfA',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 18}}>{carnet.name}</Text>
        <Text style={{marginLeft: 3, fontSize: 18}}>
          {carnet.firstLastName}
        </Text>
        <Text style={{marginLeft: 3, fontSize: 18}}>
          {carnet.secondLastName}
        </Text>
      </View>
      <Text style={{marginLeft: 3, fontSize: 18}}>CI: {carnet.carnet}</Text>
    </View>
  );
};
