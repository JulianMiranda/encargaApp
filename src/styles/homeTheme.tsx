import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const homeStyles = StyleSheet.create({
  globalMargin: {
    marginHorizontal: 20,
  },
  imageBG: {
    position: 'absolute',
    width: 300,
    height: 200,
    top: height / 2 - 60,
    right: width / 2 - 150,
    opacity: 0.2,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  carouselTitles: {
    marginLeft: 5,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loading: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 9999999999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
});
