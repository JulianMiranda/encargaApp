import React from 'react';
import {Image, Text} from 'react-native';

export const EmptyCar = () => {
  return (
    <>
      <Text
        style={{
          marginTop: 30,
          marginBottom: 100,
          marginLeft: 10,
          fontSize: 22,
          fontWeight: '400',
          alignSelf: 'center',
        }}>
        Carrito vacío 😦
      </Text>
      <Image
        source={require('../assets/emtyCar.jpg')}
        style={{height: 250, width: 250, alignSelf: 'center'}}
      />
    </>
  );
};
