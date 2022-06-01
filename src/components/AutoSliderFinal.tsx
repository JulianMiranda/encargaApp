import React from 'react';
import {StyleSheet} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
interface Props {
  imagesPromoFinal: string[];
}
export const AutoSliderFinal = ({imagesPromoFinal}: Props) => {
  return (
    <SliderBox
      images={imagesPromoFinal}
      sliderBoxHeight={500}
      onCurrentImagePressed={(index: any) =>
        console.warn(`image ${index} pressed`)
      }
      dotColor="transparent"
      imageLoadingColor="#fb2331"
      inactiveDotColor="transparent"
      paginationBoxVerticalPadding={20}
      autoplay
      circleLoop
      autoplayInterval={10000}
      resizeMethod={'resize'}
      resizeMode={'cover'}
      paginationBoxStyle={styles.paginationBox}
      dotStyle={styles.dot}
      ImageComponentStyle={styles.image}
    />
  );
};
const styles = StyleSheet.create({
  paginationBox: {
    position: 'absolute',
    bottom: -15,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.92)',
  },
  image: {
    width: '100%',
  },
});
