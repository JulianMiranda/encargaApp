import React, {useRef, useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ModalComponent} from '../../components/ModalComponent';
import {useShop} from '../../hooks/useShop';
import {AnimatedProgress} from '../../components/AnimatedProgress';
import {ShopStepOne} from '../../components/ShopStepOne';
import {ShopStepTwo} from '../../components/ShopStepTwo';
import {ShopStepThree} from '../../components/ShopStepThree';
import {ShopContext} from '../../context/shop/ShopContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useToast} from 'react-native-toast-notifications';

const HEADER_MAX_HEIGHT = 170;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MIN_HEIGHT = 40;
const {width} = Dimensions.get('window');
export const ShopScreen = () => {
  const {
    isLoading,
    openModal,
    title,
    body,
    weigth,
    cantPaqOS,
    setOpenModal,
    confirmModal,
  } = useShop();

  const scrollY = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(2);
  const {car} = useContext(ShopContext);
  const {top} = useSafeAreaInsets();
  const toast = useToast();

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
    if (progress === 2) {
      const paquete = 1440 + (weigth - 1 - cantPaqOS.oneandhalfkgPrice * 1440);
      if (paquete < 1300) {
        toast.show('Completa el último paquete', {
          type: 'normal',
          placement: 'bottom',
          duration: 3000,
          style: {
            justifyContent: 'center',
            marginBottom: 150,
            borderRadius: 50,
            paddingHorizontal: 20,
            backgroundColor: 'rgba(0,0,0,0.8)',
          },
          textStyle: {fontSize: 16},
          animationType: 'zoom-in',
        });

        return;
      }
    }
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
      {/* <Animated.View
        style={{
          ...styles.animatedHeader,
          height: headerHeight,
          zIndex: headerZindex,
          elevation: headerZindex,
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
        {car.length > 0 && (
          <>
            <View style={{marginTop: 50}}>
              <AnimatedProgress progress={progress} barWidth={barWidth} />
            </View>
          </>
        )}
        {progress === 2 && <ShopStepOne handleButton={handleButton} />}
        {progress === 1 && <ShopStepTwo handleButton={handleButton} />}
        {progress === 0 && <ShopStepThree handleButton={handleButton} />}
        <View style={{height: 80}} />
      </ScrollView> */}

      <View
        style={{
          ...styles.headerContainer,
        }}>
        {progress === 2 && (
          <Text
            style={{
              ...styles.titleList,
            }}>
            Mi Compra
          </Text>
        )}
        {progress === 1 && (
          <Text
            style={{
              ...styles.titleList,
            }}>
            Factura{' '}
          </Text>
        )}
        {progress === 0 && (
          <Text
            style={{
              ...styles.titleList,
            }}>
            Datos
          </Text>
        )}
      </View>
      {progress < 2 && (
        <TouchableOpacity
          onPress={() => setProgress(progress + 1)}
          activeOpacity={0.8}
          style={{
            top: top + 20,
            marginLeft: 10,
            padding: 6,
            backgroundColor: 'white',
            borderRadius: 50,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,

            position: 'absolute',
            zIndex: 999999999,
            left: 10,
          }}>
          <Icon name="arrow-back-outline" color={'black'} size={26} />
        </TouchableOpacity>
      )}

      {car.length > 0 && (
        <>
          <View
            style={{
              marginTop: 30,
              marginBottom: 30,
            }}>
            <AnimatedProgress progress={progress} barWidth={barWidth} />
          </View>
        </>
      )}
      <ScrollView
        style={{flex: 1}}

        /*  scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )} */
      >
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
    backgroundColor: '#FFB0A5',
    height: 130,
    overflow: 'hidden',
    zIndex: 999,
    alignItems: 'center',
  },
  titleList: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 50,
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
