/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {ModalComponent} from '../../components/ModalComponent';
import {ProductShop} from '../../components/ProductShop';
import {CircularSliderComponent} from '../../components/CircularSlider';
import {useShop} from '../../hooks/useShop';
import {ShopContext} from '../../context/shop/ShopContext';
import {DetailsShop} from '../../components/DetailsShop';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FadeInImage} from '../../components/FadeInImage';
import api from '../../api/api';
import {useToast} from 'react-native-toast-notifications';

const HEADER_MAX_HEIGHT = 170;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MIN_HEIGHT = 40;
const {height} = Dimensions.get('window');
export const ShopScreen = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {car} = useContext(ShopContext);
  const {
    isLoading,
    total,
    totalPaqReCalc,
    totalMoneyReCalc,
    cantPaqOS,
    weigth,
    openModal,
    title,
    body,
    prices,
    emptyCarConfirm,
    makeShopFunction,
    setOpenModal,
    confirmModal,
  } = useShop();
  const navigation = useNavigation();
  const toast = useToast();
  const scrollY = useRef(new Animated.Value(0)).current;

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
  const navigateSubcategory = async (id: string) => {
    try {
      const subcategory = await api.get(`/subcategories/getOne/${id}`);
      navigation.navigate('SubcategoryScreen', {
        subcategory: subcategory.data,
      });
    } catch (error) {
      toast.show('Error al navegar al Producto', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        style: {width: '100%', justifyContent: 'center', marginTop: 30},
        textStyle: {fontSize: 16},
        animationType: 'slide-in',
      });
    }
  };
  const sliders = [];
  for (let i = 0; i < cantPaqOS.oneandhalfkgPrice; i++) {
    sliders.push(
      <View
        key={i}
        style={{
          margin: 15,
        }}>
        <Image
          source={require('../../assets/jaba.png')}
          style={{height: 60, width: 60}}
        />
        <Text
          style={{
            alignSelf: 'center',
            zIndex: 1000,
            marginBottom: 3,

            backgroundColor: '#f1f1f1',
            borderBottomStartRadius: 10,
            borderBottomEndRadius: 10,
          }}>
          1.5 Kg
        </Text>
      </View>,
    );
    /* sliders.push(
      <CircularSliderComponent
        key={i + 'oneandhalfkgPrice'}
        i={i}
        cantPaq={cantPaqOS.oneandhalfkgPrice}
        weigth={weigth}
      />,
    ); */
  }

  for (const paq in cantPaqOS) {
    if (paq !== 'oneandhalfkgPrice') {
      let kg = 2;
      if (paq === 'twoandhalfkgPrice') {
        kg = 2;
      } else if (paq === 'threekgPrice') {
        kg = 3;
      } else if (paq === 'fourkgPrice') {
        kg = 4;
      } else if (paq === 'fivekgPrice') {
        kg = 5;
      } else if (paq === 'sixkgPrice') {
        kg = 6;
      } else if (paq === 'sevenkgPrice') {
        kg = 7;
      } else if (paq === 'eightkgPrice') {
        kg = 8;
      } else if (paq === 'ninekgPrice') {
        kg = 9;
      } else {
        kg = 10;
      }

      for (let i = 0; i < cantPaqOS[paq]; i++) {
        sliders.push(
          <View
            key={i + paq}
            style={{
              margin: 15,
              backgroundColor: '#f1f1f1',
              borderBottomStartRadius: 10,
              borderBottomEndRadius: 10,
            }}>
            <Image
              source={require('../../assets/boxclose.jpg')}
              style={{height: 60, width: 60}}
            />
            <Text
              style={{
                alignSelf: 'center',
                zIndex: 1000,
                marginBottom: 3,
              }}>
              {kg} Kg
            </Text>
          </View>,
        );
      }
    }
  }

  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFB0A5',
          height: headerHeight,
          zIndex: headerZindex,
          elevation: headerZindex, //required for android
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: headerTitleBottom,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            Mi Compra
          </Text>
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
            height: 150,
            overflow: 'hidden',
          }}>
          <Text
            style={{
              ...styles.titleList,
              color: 'white',
              alignSelf: 'center',
              marginTop: 80,
            }}>
            Mi Compra
          </Text>
        </View>

        <View style={{marginLeft: 7, marginTop: 30}}>
          {car.map((carItem, index) => (
            <ProductShop
              key={index}
              subcategory={carItem.subcategory}
              cantidad={carItem.cantidad}
              navigateSubcategory={navigateSubcategory}
              totalPaqReCalc={totalPaqReCalc}
            />
          ))}

          {car.length < 1 && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                alignSelf: 'center',
                height: height - 250,
              }}>
              <Image
                source={require('../../assets/cart.png')}
                style={{height: 90, width: 110}}
              />
              <Text style={{marginTop: 10, fontSize: 16}}>
                Tu carrito de compras está vacío
              </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('HomeScreen')}
                style={{
                  backgroundColor: colors.card,
                  position: 'absolute',
                  bottom: 10,
                  flexDirection: 'row',
                  marginTop: 1,
                  padding: 10,
                  paddingHorizontal: 50,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  marginBottom: 15,
                  width: '80%',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 20,
                    marginHorizontal: 15,
                  }}>
                  Ir a la tienda
                </Text>
                <Icon
                  name="arrow-right"
                  color="white"
                  size={24}
                  style={{position: 'absolute', right: 14, top: 10}}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            padding: 10,
          }}>
          {sliders}
        </View>

        {car.length > 0 && (
          <DetailsShop
            cantPaqOS={cantPaqOS}
            prices={prices}
            total={total}
            totalPaqReCalc={totalPaqReCalc}
            totalMoneyReCalc={totalMoneyReCalc}
          />
        )}
        {car.length > 0 && (
          <>
            <TouchableOpacity
              style={{...styles.button, backgroundColor: colors.card}}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('EnterPhoneScreen')}>
              <Text style={styles.buttonText}>Continuar</Text>

              <Icon
                name="arrow-right"
                color="white"
                size={24}
                style={styles.icon}
              />
            </TouchableOpacity>
            {/* <View style={styles.emptyButton}>
              <TouchableOpacity onPress={emptyCarConfirm}>
                <Text style={{color: colors.card, fontSize: 14}}>Vaciar</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                ...styles.shopButton,
                backgroundColor: colors.card,
                marginLeft: 50,
              }}>
              <TouchableOpacity
                activeOpacity={car.length < 1 ? 1 : 0.8}
                onPress={
                  car.length < 1
                    ? () => {}
                    : () =>
                        navigation.navigate('InputCarnetScreen', {
                          paquetes: cantPaqOS.oneandhalfkgPrice,
                        })
                }>
                <Text style={{color: 'white', fontSize: 14}}>Comprar</Text>
              </TouchableOpacity>
            </View> */}
          </>
        )}
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
  headerContainer: {
    height: 170,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: Platform.OS === 'ios' ? 1000 : 100,
    borderBottomLeftRadius: 0,
  },

  titleList: {
    color: 'white',
    fontSize: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '300',
    marginVertical: 3,
  },
  shopButton: {
    width: 115,
    justifyContent: 'center',
    alignContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  emptyButton: {
    width: 115,
    justifyContent: 'center',
    zIndex: 99999,
    alignContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eeebeb',
    padding: 10,
    borderRadius: 8,
  },
  tableTitle: {
    marginTop: 30,
    marginBottom: 15,
    marginLeft: 10,
    fontSize: 26,
    fontWeight: '600',
  },
  icon: {position: 'absolute', right: 14, top: 10},
  button: {
    flexDirection: 'row',
    marginTop: 1,
    padding: 10,
    paddingHorizontal: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 15,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
  },
});
