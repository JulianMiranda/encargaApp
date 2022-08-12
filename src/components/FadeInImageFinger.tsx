import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageErrorEventData,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  View,
} from 'react-native';
import {useAnimation} from '../hooks/useAnimation';

interface Props {
  style?: StyleProp<ImageStyle>;
  show: boolean;
  setShowFinger: (term: boolean) => void;
}

export const FadeInImageFinger = ({show, setShowFinger, style = {}}: Props) => {
  const {opacity, fadeInFinger} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    setIsLoading(false);
    /*     fadeIn(); */
  };
  useEffect(() => {
    if (show) {
      fadeInFinger();
      setShowFinger(false);
    }
  }, [show, fadeInFinger]);

  const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
    setIsLoading(false);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...(style as any),
      }}>
      {isLoading && (
        <ActivityIndicator
          style={{position: 'absolute'}}
          color="grey"
          size={30}
        />
      )}

      <Animated.Image
        source={require('../assets/dedo_nofound.png')}
        onError={onError}
        onLoad={finishLoading}
        style={{
          ...(style as any),
          opacity,
        }}
      />
    </View>
  );
};
