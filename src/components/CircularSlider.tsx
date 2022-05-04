import React from 'react';
import {Text, View} from 'react-native';
import CircularSlider from 'react-native-circular-slider';
import Svg, {G, Use, Image, Circle} from 'react-native-svg';
import {WAKE_ICON, BEDTIME_ICON} from '../utils/iconsSVG';

interface Props {
  i: number;
  cantPaq: number;
  weigth: number;
}
export const CircularSliderComponent = ({i, cantPaq, weigth}: Props) => {
  return (
    <View
      key={i}
      style={{
        margin: 15,
      }}>
      <Text
        style={{
          position: 'absolute',
          top: 25,
          alignSelf: 'center',
        }}>
        {cantPaq !== i + 1 ? '1.5 Kg' : weigth - 1 - i * 1440 + 'g'}
      </Text>
      <CircularSlider
        startAngle={0}
        angleLength={
          cantPaq !== i + 1
            ? 2 * Math.PI - 0.1
            : (Math.PI * 2 * (weigth - i * 1440)) / 1440
        }
        segments={2}
        strokeWidth={4}
        radius={30}
        gradientColorFrom="#DAFCF4"
        gradientColorTo="#2684FD"
        clockFaceColor="green"
        bgCircleColor="#EFFFFB"
        stopIcon={
          <G scale="1.1" transform={{translate: '-8, -8'}}>
            {WAKE_ICON}
          </G>
        }
      />
    </View>
  );
};
