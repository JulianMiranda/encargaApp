import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
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
import {ProductShop} from './ProductShop';
import {Productos} from './Productos';
import {Relleno} from './Relleno';
interface Props {
  handleButton: () => void;
}

const {width, height} = Dimensions.get('window');
export const ShopStepOne = ({handleButton}: Props) => {
  const navigation = useNavigation();
  const toast = useToast();
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {car} = useContext(ShopContext);
  const {weigth, totalPaqReCalc, cantPaqOS} = useShop();

  const [relleno, setRelleno] = useState({
    noone: false,
    refresco: false,
    maquina: false,
    golosina: false,
    plantilla: false,
    lapicero: false,
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
    console.log('cant1.5', cantPaqOS.oneandhalfkgPrice);
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
      let kg = 2.0;
      if (paq === 'twokgPrice') {
        kg = 2.0;
      } else if (paq === 'threekgPrice') {
        kg = 3.0;
      } else if (paq === 'fourkgPrice') {
        kg = 4.0;
      } else if (paq === 'fivekgPrice') {
        kg = 5.0;
      } else if (paq === 'sixkgPrice') {
        kg = 6.0;
      } else if (paq === 'sevenkgPrice') {
        kg = 7.0;
      } else if (paq === 'eigthkgPrice') {
        kg = 8.0;
      } else if (paq === 'ninekgPrice') {
        kg = 9.0;
      } else {
        kg = 10;
      }
      for (let i = 0; i < cantPaqOS[paq]; i++) {
        sliders.push(
          <View
            key={i + paq}
            style={{
              margin: 15,
              borderBottomStartRadius: 10,
              borderBottomEndRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/cajabaria.png')}
              style={{height: 70, width: width * 0.16}}
            />
            <Text
              style={{
                alignSelf: 'center',
                zIndex: 1000,
                marginBottom: 3,
              }}>
              {kg}.0 Kg
            </Text>
            <View
              style={{
                backgroundColor: 'black',
                alignSelf: 'center',
                paddingHorizontal: 2,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'white',
                }}>
                100%
              </Text>
            </View>
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

            <Productos />
            <View
              style={{
                marginHorizontal: 10,
                marginVertical: 20,
                borderRadius: 8,
                backgroundColor: '#FFB0A5',
                padding: 10,
              }}>
              <Text
                style={{
                  color: '#000000',
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: '400',
                }}>
                *La cantidad de paquetes de 1.5 Kg es aproximada, podrá variar
                ligeramente al embalarse tu compra.
              </Text>
            </View>
          </View>
        )}
        {cantPaqOS.oneandhalfkgPrice > 0 && (
          <Relleno relleno={relleno} setRelleno={setRelleno} />
        )}
      </View>
      {car.length > 0 && (
        <>
          <TouchableOpacity
            style={{...styles.button, backgroundColor: colors.card}}
            activeOpacity={0.8}
            onPress={() => {
              console.log('Paq 1.5', cantPaqOS.oneandhalfkgPrice);
              if (
                !relleno.golosina &&
                !relleno.lapicero &&
                !relleno.maquina &&
                !relleno.noone &&
                !relleno.plantilla &&
                !relleno.refresco &&
                cantPaqOS.oneandhalfkgPrice > 0
              ) {
                toast.show('Debe seleccionar un relleno', {
                  type: 'normal',
                  placement: 'bottom',
                  duration: 1500,
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
              } else {
                handleButton();
              }
              //handleButton();
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
