/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  Linking,
  Image,
  Animated,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ShopContext} from '../../context/shop/ShopContext';
import {ThemeContext} from '../../context/theme/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {ModalComponent} from '../../components/ModalComponent';
import {AuthContext} from '../../context/auth/AuthContext';
import {ProductShop} from '../../components/ProductShop';
import {Factura} from '../../components/Factura';
import CircularSlider from 'react-native-circular-slider';
import {G, Path} from 'react-native-svg';

const HEADER_MAX_HEIGHT = 75;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

export const ShopScreen = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {top} = useSafeAreaInsets();

  const {car, message, emptyCar, makeShop, removeAlert} =
    useContext(ShopContext);
  const {sendPrice} = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const [cantPaq, setCantPaq] = useState(1);
  const [weigth, setWeigth] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [handleOpt, setHandleOpt] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [description, setDescription] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const WAKE_ICON = (
    <G>
      <Path
        d="M2,12.9h1.7h3h2.7h3H14c0.4,0,0.7-0.3,0.7-0.7c0-0.4-0.3-0.7-0.7-0.7c-0.9,0-1.7-0.7-1.7-1.7v-4
        c0-2.1-1.5-3.8-3.4-4.2C9,1.6,9,1.4,9,1.3c0-0.5-0.4-1-1-1c-0.5,0-1,0.4-1,1c0,0.2,0,0.3,0.1,0.4c-2,0.4-3.4,2.1-3.4,4.2v4
        c0,0.9-0.7,1.7-1.7,1.7c-0.4,0-0.7,0.3-0.7,0.7C1.3,12.6,1.6,12.9,2,12.9z"
      />
      <Path d="M8,15.7c1.1,0,2.1-0.9,2.1-2.1H5.9C5.9,14.8,6.9,15.7,8,15.7z" />
    </G>
  );

  const BEDTIME_ICON = (
    <G>
      <Path
        d="M11.7,10.5c-3.6,0-6.4-2.9-6.4-6.4c0-0.7,0.1-1.4,0.4-2.1C3.1,2.9,1.2,5.3,1.2,8.1c0,3.6,2.9,6.4,6.4,6.4
        c2.8,0,5.2-1.8,6.1-4.4C13.1,10.4,12.4,10.5,11.7,10.5z"
      />
      <Path d="M8,7.6l2-2.5H8V4.4H11v0.6L9,7.6h2v0.7H8V7.6z" />
      <Path d="M11.7,5.4l1.5-1.9h-1.4V3h2.2v0.5l-1.5,1.9h1.5v0.5h-2.2V5.4z" />
      <Path d="M9.4,3l1.1-1.4h-1V1.3H11v0.4L9.9,3H11v0.4H9.4V3z" />
    </G>
  );

  useEffect(() => {
    let totalCalc = 0;
    let totalWeight = 1;
    car.forEach(function (item) {
      if (cantPaq < 5) {
        const valor = item.cantidad * item.subcategory.price;
        totalCalc += valor;
      } else {
        const valor = item.cantidad * item.subcategory.priceGalore;
        totalCalc += valor;
      }
      totalWeight += item.cantidad * item.subcategory.weight;
    });
    setTotal(totalCalc);
    for (let i = weigth; i <= totalWeight; i++) {
      setWeigth(i);
    }

    if (totalWeight > 0) {
      const cant = totalWeight / 1440;
      if (totalWeight < 1400) {
        setCantPaq(1);
      } else if (cant < 2) {
        setCantPaq(2);
      } else {
        setCantPaq(Math.ceil(cant));
      }
    }
  }, [cantPaq, car]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const headerZindex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 75],
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

  const confirmModal = () => {
    switch (handleOpt) {
      case 0:
        emptyCarConfirmed();
        break;
      case 1:
        makeShopConfirmed();
        break;

      default:
        break;
    }
  };
  const emptyCarConfirmed = () => {
    emptyCar();
    setOpenModal(false);
  };

  const makeShopConfirmed = async () => {
    setisLoading(true);
    await makeShop(total, description);
    setisLoading(false);
    setOpenModal(false);
    /* navigation.navigate('HomeScreen'); */
    Linking.openURL(
      'http://api.whatsapp.com/send?text=Hola 📦 *enCarga*, he realizado una compra!&phone=+593962914922',
    );
  };

  const makeShopFunction = () => {
    setHandleOpt(1);
    setTitle('¡¡¡Gracias por su compra!!!');
    setBody('Para confirmar contactaremos con un administrador');
    setOpenModal(true);
  };

  const emptyCarConfirm = () => {
    setHandleOpt(0);
    setTitle('Vaciar carrito');
    setBody('¿Está seguro que desea vaciar el carrito?');
    setOpenModal(true);
  };

  useEffect(() => {
    if (message.length === 0) {
      return;
    }

    Alert.alert('Paso obligatorio', message, [
      {
        text: 'No',
        onPress: removeAlert,
        style: 'destructive',
      },
      {
        text: 'Sí',
        onPress: () => {
          removeAlert();
          Linking.openURL(
            'http://api.whatsapp.com/send?text=Este es un mensaje predetermidado&phone=+593995687985',
          );
        },
      },
    ]);
  }, [message, removeAlert]);
  const sliders = [];
  for (let i = 0; i < cantPaq; i++) {
    sliders.push(
      <View
        key={i}
        style={{
          margin: 10,
        }}>
        <Text
          style={{
            position: 'absolute',
            top: 25,
            alignSelf: 'center',
          }}>
          {i + 1}
        </Text>
        <CircularSlider
          startAngle={0}
          angleLength={
            cantPaq !== i + 1
              ? 2 * Math.PI - 0.1
              : (Math.PI * 2 * (weigth - i * 1440)) / 1440
          }
          segments={4}
          strokeWidth={15}
          radius={30}
          gradientColorFrom="#DAFCF4"
          gradientColorTo="#2684FD"
          clockFaceColor="green"
          bgCircleColor="#EFFFFB"
          startIcon={
            <G scale="1.1" transform={{translate: '-8, -8'}}>
              {BEDTIME_ICON}
            </G>
          }
          stopIcon={
            <G scale="1.1" transform={{translate: '-8, -8'}}>
              {WAKE_ICON}
            </G>
          }
        />

        {/*  <Slider
          value={weigth - i * 1440}
          disabled
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={1440}
          minimumTrackTintColor="skyblue"
          maximumTrackTintColor="#2684FD"
        /> */}
      </View>,
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
        {/* <View
          style={{
            ...styles.headerContainer,
            overflow: 'hidden',
          }}>
          <LinearGradient
            style={{
              flex: 1,
              width: '100%',
            }}
            colors={[color, '#f7baba']}>
            <Text
              style={{
                ...styles.titleList,
                top: top + 40,
              }}>
              Mi Compra
            </Text>
          </LinearGradient>
        </View> */}

        {/* <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 32,
              paddingLeft: 10,
              marginTop: 50,
              marginBottom: 25,
            }}>
            Mi Compra
          </Text>
        </View> */}

        <View
          style={{
            ...styles.headerContainer,
            overflow: 'hidden',
          }}>
          <LinearGradient
            style={{
              flex: 1,
              width: '100%',
            }}
            colors={['#2684FD', 'lightskyblue']}>
            <Text
              style={{
                ...styles.titleList,
                top: top + 40,
                alignSelf: 'center',
              }}>
              Mi Compra
            </Text>
          </LinearGradient>
        </View>

        <View style={{marginLeft: 7}}>
          {car.map((carItem, index) => (
            <ProductShop
              key={index}
              subcategory={carItem.subcategory}
              cantidad={carItem.cantidad}
            />
          ))}

          {car.length < 1 && (
            <>
              <Text
                style={{
                  marginTop: 30,
                  marginBottom: 100,
                  marginLeft: 10,
                  fontSize: 22,
                  fontWeight: '400',
                  alignSelf: 'center',
                }}>
                Carrito vacío 😦
              </Text>
              <Image
                source={require('../../assets/emtyCar.jpg')}
                style={{height: 250, width: 250, alignSelf: 'center'}}
              />
            </>
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
          <>
            <View
              style={{
                margin: 15,
                marginBottom: 10,
                padding: 10,
                backgroundColor: '#FEFEFE',
              }}>
              <View
                style={{
                  borderRadius: 8,
                  backgroundColor: '#FCB1B1',
                  padding: 10,
                }}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 14,
                    fontWeight: '400',
                  }}>
                  *Para su envío, la compra se embalará en paquetes de 1.5 kg
                  con un costo de ${sendPrice} por paquete.
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                  }}>
                  Cantidad aproximada de paquetes:{'  '}
                  <Text
                    style={{
                      fontSize: 26,
                    }}>
                    {cantPaq}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 8,
                  backgroundColor: '#FCB1B1',
                  padding: 10,
                }}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 14,
                    fontWeight: '400',
                  }}>
                  *La cantidad aproximada de paquetes para el envío es calculada
                  a partir del peso aproximado de los productos, por lo que
                  puede ser diferente al realizar su compra.
                </Text>
              </View>
              <View style={{}}>
                <Text
                  style={{
                    marginTop: 30,
                    marginLeft: 10,
                    fontSize: 24,
                    fontWeight: '400',
                  }}>
                  Valor de compra:
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 22,
                    fontWeight: '600',
                  }}>
                  Precio productos:
                </Text>
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: '600',
                  }}>
                  {formatToCurrency(total)}
                </Text>
              </View>
              <Factura cantPaq={cantPaq} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 22,
                    fontWeight: '600',
                  }}>
                  Precio envío:
                </Text>
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: '600',
                  }}>
                  {formatToCurrency(cantPaq * sendPrice)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 26,
                    fontWeight: '600',
                  }}>
                  Total:
                </Text>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: '600',
                  }}>
                  {formatToCurrency(total + cantPaq * sendPrice)}
                </Text>
              </View>
            </View>
          </>
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
