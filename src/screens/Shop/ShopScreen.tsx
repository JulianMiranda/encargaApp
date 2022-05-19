import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import {ModalComponent} from '../../components/ModalComponent';
import {useShop} from '../../hooks/useShop';
import {AnimatedProgress} from '../../components/AnimatedProgress';
import {ShopStepOne} from '../../components/ShopStepOne';
import {ShopStepTwo} from '../../components/ShopStepTwo';
import {ShopStepThree} from '../../components/ShopStepThree';

const HEADER_MAX_HEIGHT = 170;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MIN_HEIGHT = 40;
const {width} = Dimensions.get('window');
export const ShopScreen = () => {
  const {isLoading, openModal, title, body, setOpenModal, confirmModal} =
    useShop();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(2);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const headerZindex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 170],
    outputRange: [0, 0, 1000],
    extrapolate: 'clamp',
  });

  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 26,
    ],
    outputRange: [-30, -30, -30, 5],
    extrapolate: 'clamp',
  });

  const barWidth = useRef(new Animated.Value(0)).current;

  const handleButton = () => {
    console.log('handleButton', progress);
    if (progress >= 1) {
      const newBarWith =
        progress === 2
          ? (width * 0.8) / progress - 20
          : (width * 0.8) / progress - 50;
      Animated.spring(barWidth, {
        toValue: newBarWith,
        bounciness: 0,
        speed: 2,
        useNativeDriver: false,
      }).start();
      setProgress(progress - 1);
    } else {
      setProgress(2);
      const newBarWith =
        progress === 2
          ? (width * 0.8) / progress - 20
          : (width * 0.8) / progress - 50;
      Animated.spring(barWidth, {
        toValue: newBarWith,
        bounciness: 0,
        speed: 2,
        useNativeDriver: false,
      }).reset();
    }
  };

  return (
    <>
      <Animated.View
        style={{
          ...styles.animatedHeader,
          height: headerHeight,
          zIndex: headerZindex,
          elevation: headerZindex, //required for android
        }}>
        <Animated.View
          style={{
            bottom: headerTitleBottom,
            ...styles.headerTitle,
          }}>
          <Text style={styles.textTitle}>Mi Compra</Text>
        </Animated.View>
      </Animated.View>
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1}}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <View
          style={{
            ...styles.headerContainer,
          }}>
          <Text
            style={{
              ...styles.titleList,
            }}>
            Mi Compra
          </Text>
        </View>
        <View style={{marginTop: 50}}>
          <AnimatedProgress progress={progress} barWidth={barWidth} />
        </View>
        {progress === 2 && <ShopStepOne handleButton={handleButton} />}
        {progress === 1 && <ShopStepTwo handleButton={handleButton} />}
        {progress === 0 && <ShopStepThree handleButton={handleButton} />}
        <View style={{height: 80}} />
      </ScrollView>

      <ModalComponent
        title={title}
        body={body}
        openModal={openModal}
        isLoading={isLoading}
        setOpenModal={setOpenModal}
        onConfirmModal={confirmModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFB0A5',
    alignItems: 'center',
  },
  headerContainer: {
    height: 150,
    overflow: 'hidden',
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: Platform.OS === 'ios' ? 1000 : 100,
    borderBottomLeftRadius: 0,
  },
  titleList: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 60,
    fontSize: 40,
  },
  headerTitle: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
