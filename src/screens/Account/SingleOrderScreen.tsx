import React, {useContext, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {RootStackParams} from '../../navigation/AccountStack';
import moment from 'moment';
import {TopScreen} from '../../components/TopScreen';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {FacturaShop} from '../../components/FacturaShop';
import {ProductosShop} from '../../components/ProductosShop';
import {CantPaqOS} from '../../interfaces/CantPaq.interface';
import {discountGalore} from '../../utils/discountGalore';
import {discount} from '../../utils/discount';

interface Props
  extends StackScreenProps<RootStackParams, 'SingleOrderScreen'> {}

export const SingleOrderScreen = (props: Props) => {
  const {navigation, route} = props;
  const {order} = route.params;

  const colorsTop = ['#2684FD', '#bae6f7'];
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [totalEnvio, setTotalEnvio] = useState<number>(0);

  useEffect(() => {
    let totalProd = 0;
    let totalEnvioSum = 0;
    const catnPaq = order.cantPaqOS;
    console.log('order', order.selectedCarnet);
    for (const cant in catnPaq) {
      if (catnPaq[cant] !== 0) {
        totalEnvioSum += catnPaq[cant] * order.prices[cant];
      }
    }
    setTotalEnvio(totalEnvioSum);

    order.car.forEach(product => {
      if (order.totalPaqReCalc > 4 || product.cantidad > 5) {
        totalProd +=
          discountGalore(
            product.subcategory.priceGalore,
            product.subcategory.priceGaloreDiscount,
          ) * product.cantidad;
      } else {
        totalProd +=
          discount(
            product.subcategory.price,
            product.subcategory.priceDiscount,
          ) * product.cantidad;
      }
    });
    setTotalProduct(totalProd);
  }, [order]);

  return (
    <>
      <TopScreen
        colors={colorsTop}
        text="Factura"
        backButton={true}
        height={170}
      />
      <ScrollView
        style={{
          flex: 1,
          margin: 10,
        }}>
        <FacturaShop car={order.car} totalPaqReCalc={order.totalPaqReCalc} />
        <View
          style={{
            padding: 10,
            marginRight: 15,
            width: '60%',
            alignSelf: 'flex-end',
          }}>
          <View style={styles.priceCont}>
            <Text style={styles.priceProd}>Productos:</Text>
            <Text style={styles.txtTotal}>
              {formatToCurrency(totalProduct)}
            </Text>
          </View>
        </View>
        <ProductosShop cantPaqOS={order.cantPaqOS} />

        <View
          style={{
            padding: 10,
            marginRight: 15,
            width: '60%',
            alignSelf: 'flex-end',
            marginBottom: 10,
          }}>
          <View style={styles.sendPrice}>
            <Text style={styles.sendPriceTxt}>Envío:</Text>
            <Text style={styles.sendPriceTxtCalc}>
              {formatToCurrency(totalEnvio)}
            </Text>
          </View>

          <View
            style={{
              ...styles.total,
              borderColor: colors.primary,
              borderWidth: 1,
              borderRadius: 4,
              marginBottom: 30,
              /* backgroundColor: colors.primary */
            }}>
            <Text style={styles.totalTitle}>Total:</Text>
            <Text style={styles.totalTxt}>{formatToCurrency(order.cost)}</Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 22,
            fontWeight: '300',
          }}>
          Información de la compra:
        </Text>

        <Text
          style={{
            fontSize: 18,
          }}>
          - Enviada a:
        </Text>
        {order.selectedCarnet.map(carnet => (
          <View
            key={carnet.carnet}
            style={{
              padding: 5,
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 1,
            }}>
            <Text>
              {carnet.name} {carnet.firstLastName} {carnet.secondLastName}
            </Text>
            <Text>{carnet.carnet}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>
                {carnet.municipio} {carnet.provincia}
              </Text>
            </View>
          </View>
        ))}

        <View style={{height: 100}} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 25},
  firstInfo: {
    borderRadius: 8,
    backgroundColor: '#FCB1B1',
    padding: 10,
  },
  textFirstInfo: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '400',
  },
  secContainer: {
    marginTop: 10,
    justifyContent: 'center',
  },
  txtPaq: {
    fontSize: 18,
  },
  txtPaqInside: {
    fontSize: 26,
  },
  threeCont: {
    borderRadius: 8,
    backgroundColor: '#FFB0A5',
    padding: 10,
  },
  txtThreeCont: {
    color: '#000000',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '400',
  },
  factContainer: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  priceCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
  },
  priceProd: {
    marginLeft: 5,
    fontSize: 22,
    fontWeight: '500',
  },
  txtTotal: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  sendPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 30,
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
  },
  sendPriceTxt: {
    marginLeft: 5,
    fontSize: 22,
    fontWeight: '500',
  },
  sendPriceTxtCalc: {
    fontSize: 22,
    fontWeight: '600',
  },
  total: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  totalTxt: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  boxCant: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 5,
  },
  divider: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
});
