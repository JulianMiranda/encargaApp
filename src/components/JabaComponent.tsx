import React, {useContext} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {ThemeContext} from '../context/theme/ThemeContext';

interface Props {
  i: number;
  cantPaq: number;
  weigth: number;
}

const {width, height} = Dimensions.get('window');
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
      }}>
      <Image
        source={require('../assets/zipbag.jpg')}
        style={{
          height: 70,
          width: width * 0.16,
        }}
      />
      <Text
        style={{
          alignSelf: 'center',
        }}>
        {cantPaq !== i + 1 ? '1.5 Kg' : weigth - 1 - i * 1440 + 'g'}
      </Text>
      <View
        style={{
          backgroundColor: 'black',
          alignSelf: 'center',
          paddingHorizontal: 2,
          borderRadius: 5,
        }}>
        <Text
          style={{
            alignSelf: 'center',
            color: 'white',
          }}>
          {cantPaq !== i + 1
            ? '100%'
            : (((weigth - 1 - i * 1440) * 100) / 1440).toFixed(2) + '%'}
        </Text>
      </View>
    </View>
  );
};
