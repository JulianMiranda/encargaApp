import React, {useContext} from 'react';
import {Image, Text, View} from 'react-native';
import {ThemeContext} from '../context/theme/ThemeContext';

interface Props {
  i: number;
  cantPaq: number;
  weigth: number;
}
export const JabaComponent = ({i, cantPaq, weigth}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  if (weigth < 2) {
    return null;
  }
  return (
    <View
      key={i}
      style={{
        margin: 15,
        overflow: 'hidden',
      }}>
      <Image
        source={require('../assets/bag2.png')}
        style={{
          height: 70,
          width: 60,
        }}
      />
      <Text
        style={{
          alignSelf: 'center',
        }}>
        {cantPaq !== i + 1 ? '1.5 Kg' : weigth - 1 - i * 1440 + 'g'}
      </Text>
      <Text
        style={{
          alignSelf: 'center',
        }}>
        {cantPaq !== i + 1
          ? '100%'
          : (((weigth - 1 - i * 1440) * 100) / 1440).toFixed(2) + '%'}
      </Text>
    </View>
  );
};
