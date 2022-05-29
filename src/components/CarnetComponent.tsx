import React from 'react';
import {Image, Text, View} from 'react-native';
import {Carnet} from '../interfaces/CarnetResponse.interface';

interface Props {
  carnet: Carnet;
}
export const CarnetComponent = ({carnet}: Props) => {
  return (
    <View
      style={{
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/no_id.png')}
        style={{
          height: 40,
          width: 50,
          marginRight: 10,
        }}
      />
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{carnet.name}</Text>
          <Text style={{marginLeft: 3, fontSize: 18, fontWeight: 'bold'}}>
            {carnet.firstLastName}
          </Text>
          <Text style={{marginLeft: 3, fontSize: 18, fontWeight: 'bold'}}>
            {carnet.secondLastName}
          </Text>
        </View>
        <Text style={{fontSize: 16, color: '#000'}}>CI: {carnet.carnet}</Text>
        <Text style={{fontSize: 16, color: '#000'}}>
          {carnet.municipio} - {carnet.provincia}
        </Text>
      </View>
    </View>
  );
};
