/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
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
import JDtest from '../../components/DropShop';

export const ShopScreen = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const color = colors.primary;
  const {top} = useSafeAreaInsets();

  const {car, message, emptyCar, makeShop, removeAlert} =
    useContext(ShopContext);
  const {sendPrice} = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const [cantPaq, setCantPaq] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [handleOpt, setHandleOpt] = useState(0);
  const [description, setDescription] = useState('');
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    let totalCalc = 0;
    let totalWeight = 1;
    car.forEach(function (item) {
      if (item.cantidad < 6) {
        const valor = item.cantidad * item.subcategory.price;
        totalCalc += valor;
      } else {
        const valor = item.cantidad * item.subcategory.priceGalore;
        totalCalc += valor;
      }
      totalWeight += item.cantidad * item.subcategory.weight;
    });
    setTotal(totalCalc);
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
  }, [car]);

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

  return (
    <>
      <ScrollView style={{flex: 1, marginBottom: 120}}>
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
            colors={[color, '#f7baba']}>
            <Text
              style={{
                ...styles.titleList,
                top: top + 40,
              }}>
              Mi Compra
            </Text>
          </LinearGradient>
        </View>

        <View style={{marginLeft: 7, marginTop: 20}}>
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
              <Factura />
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
    alignSelf: 'flex-start',
    left: 70,
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
