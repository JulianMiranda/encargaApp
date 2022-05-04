/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {ModalComponent} from '../../components/ModalComponent';
import {ProductShop} from '../../components/ProductShop';
import {CircularSliderComponent} from '../../components/CircularSlider';
import {useShop} from '../../hooks/useShop';
import {ShopContext} from '../../context/shop/ShopContext';
import {EmptyCar} from '../../components/EmptyCar';
import {DetailsShop} from '../../components/DetailsShop';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

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

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const headerZindex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
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

  const sliders = [];
  for (let i = 0; i < cantPaq; i++) {
    sliders.push(
      <CircularSliderComponent i={i} cantPaq={cantPaq} weigth={weigth} />,
    );
  }

  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'lightskyblue',
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
        style={{flex: 1, marginBottom: 120}}
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
              marginTop: 40,
            }}>
            Mi Compra
          </Text>
        </View>

        <View style={{marginLeft: 7}}>
          {car.map((carItem, index) => (
            <ProductShop
              key={index}
              subcategory={carItem.subcategory}
              cantidad={carItem.cantidad}
            />
          ))}

          {car.length < 1 && <EmptyCar />}
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
      </ScrollView>

      {car.length > 0 && (
        <>
          <View style={styles.emptyButton}>
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
              onPress={car.length < 1 ? () => {} : makeShopFunction}>
              <Text style={{color: 'white', fontSize: 14}}>Comprar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    position: 'absolute',
    zIndex: 99999,
    bottom: 75,
    right: 50,
    alignContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  emptyButton: {
    width: 115,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 75,
    zIndex: 99999,
    left: 50,
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
});
