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
  const color = (((weigth - i * 1440) * 100) / 1440).toFixed(2);
  const colorBack = (color / 100).toFixed(1);

  if (weigth < 2) {
    return null;
  }
  return (
    <View
      key={i}
      style={{
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/bolsabaria.png')}
        style={{
          height: 70,
          width: width * 0.16,
        }}
      />
      <Text
        style={{
          alignSelf: 'center',
          color: '#000',
        }}>
        {cantPaq !== i + 1 ? '1.5 Kg' : (weigth - i * 1440).toFixed(0) + ' g'}
      </Text>

      <View
        style={{
          backgroundColor: 'rgba(0,0,0,' + colorBack + ')',
          alignSelf: 'center',
          paddingHorizontal: 2,
          borderRadius: 5,
        }}>
        <Text
          style={{
            alignSelf: 'center',

            color: colorBack > 0.2 ? 'white' : 'black',
          }}>
          {cantPaq !== i + 1
            ? '100%'
            : (((weigth - i * 1440) * 100) / 1440).toFixed(1) + '%'}
        </Text>
      </View>
    </View>
  );
};
