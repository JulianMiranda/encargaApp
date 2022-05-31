import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../api/api';
import {ShopContext} from '../context/shop/ShopContext';
import {ThemeContext} from '../context/theme/ThemeContext';
import {useShop} from '../hooks/useShop';
import {JabaComponent} from './JabaComponent';
import ScreenLoading from './LoadingSafe';
import {PaqByKg} from './PaqByKg';
import {ProductShop} from './ProductShop';
interface Props {
  handleButton: () => void;
}

const {height} = Dimensions.get('window');
export const ShopStepOne = ({handleButton}: Props) => {
  const navigation = useNavigation();
  const toast = useToast();
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {car} = useContext(ShopContext);
  const {weigth, totalPaqReCalc, cantPaqOS} = useShop();

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
      <JabaComponent
        key={i + 'oneandhalfkgPrice'}
        i={i}
        cantPaq={cantPaqOS.oneandhalfkgPrice}
        weigth={weigth}
      />,
    );
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
      } else if (paq === 'eigthkgPrice') {
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
              source={require('../assets/boxclose.jpg')}
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
      <View style={{minHeight: height * 0.66}}>
        <View style={{marginLeft: 7}}>
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
                source={require('../assets/cart.png')}
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
        {car.length > 0 && (
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                padding: 10,
              }}>
              {sliders}
            </View>

            <PaqByKg />
          </View>
        )}
      </View>
      {car.length > 0 && (
        <>
          <TouchableOpacity
            style={{...styles.button, backgroundColor: colors.card}}
            activeOpacity={0.8}
            onPress={() => {
              handleButton();
              /* navigation.navigate('EnterPhoneScreen') */
            }}>
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
    </>
  );
};

const styles = StyleSheet.create({
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
