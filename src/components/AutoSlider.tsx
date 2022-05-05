import React from 'react';
import {StyleSheet} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
interface Props {
  imagesPromo: string[];
}
export const AutoSlider = ({imagesPromo}: Props) => {
  return (
    <SliderBox
      images={imagesPromo}
      sliderBoxHeight={70}
      onCurrentImagePressed={(index: any) =>
        console.warn(`image ${index} pressed`)
      }
      dotColor="white"
      imageLoadingColor="#fb2331"
      inactiveDotColor="#f1f1f1"
      paginationBoxVerticalPadding={20}
      autoplay
      circleLoop
      autoplayInterval={7000}
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
    bottom: 0,
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
    marginTop: 90,
    marginBottom: 10,
  },
});
