import React, {Dispatch, SetStateAction} from 'react';
import {TouchableOpacity} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Image, Image as PImage} from '../interfaces/Image.interface';
import {FadeInImage} from './FadeInImage';

interface Props {
  images: PImage[];
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  setImageIndex: Dispatch<SetStateAction<Image>>;
}

interface Item {
  item: {
    key: string;
    image: string;
  };
}

export const Slider = ({images, setIsVisible, setImageIndex}: Props) => {
  const slides = images.map(image => {
    return {
      key: image.id,
      image: image.url,
    };
  });

  const _renderItem = ({item}: Item) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setIsVisible(true);
          setImageIndex({url: item.image, id: item.key});
        }}>
        <FadeInImage uri={item.image} style={{width: '100%', height: 400}} />
      </TouchableOpacity>
    );
  };

  return (
    <AppIntroSlider
      showPrevButton={false}
      showNextButton={false}
      activeDotStyle={{backgroundColor: 'black'}}
      dotStyle={{backgroundColor: '#E5E5E5'}}
      renderItem={_renderItem}
      data={slides}
      onDone={undefined}
      doneLabel={''}
      showDoneButton={false}
      renderNextButton={undefined}
      renderPrevButton={undefined}
    />
  );
};
