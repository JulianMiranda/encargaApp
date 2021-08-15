import {useRef} from 'react';
import {Animated} from 'react-native';

export const useAnimationXY = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.ValueXY()).current;

  const fadeIn = (duration: number = 700) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const startMovingPosition = (
    initPosition: {x: number, y: number},
    x: number = 25,
    y: number = 25,
    duration: number = 100,
  ) => {
    position.setValue(initPosition);

    Animated.timing(position, {
      toValue: { x, y },
      duration,
      useNativeDriver: true,
      // easing: Easing.bounce
    }).start();
  };
 
  return {
    opacity,
    position,
    fadeIn,
    fadeOut,
    startMovingPosition,
  };
};
