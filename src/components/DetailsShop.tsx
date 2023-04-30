import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from '../context/theme/ThemeContext';
import {CantPaqOS} from '../interfaces/CantPaq.interface';
import {Prices} from '../interfaces/Prices.interface';
import {formatToCurrency} from '../utils/formatToCurrency';
import {Factura} from './Factura';
import {Productos} from './Productos';
import {ProductosTest} from './ProductosTest';

interface Props {
  total: number;
  totalPaqReCalc: number;
  totalMoneyReCalc: number;
  prices: Prices;
  cantPaqOS: CantPaqOS;
}
export const DetailsShop = ({
  total,
  prices,
  cantPaqOS,
  totalPaqReCalc,
  totalMoneyReCalc,
}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      {/*  <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <Text style={styles.factContainer}>Total:</Text>
        <Text style={styles.totalTxt}>
          {formatToCurrency(total + totalMoneyReCalc)}
        </Text>
      </View>
      <View style={styles.divider} /> */}

      <Factura totalPaqReCalc={totalPaqReCalc} />

      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginTop: 10,
        }}>
        <Text style={{...styles.factContainer, fontSize: 20}}>Subtotal:</Text>
      </View>
      <View style={styles.divider} /> */}
      <View
        style={{
          padding: 10,
          marginRight: 15,
          width: '60%',
          alignSelf: 'flex-end',
        }}>
        <View style={styles.priceCont}>
          <Text style={styles.priceProd}>Productos:</Text>
          <Text style={styles.txtTotal}>{formatToCurrency(total)}</Text>
        </View>
      </View>
      <ProductosTest />
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
            {formatToCurrency(totalMoneyReCalc)}
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
          <Text style={styles.totalTxt}>
            {formatToCurrency(total + totalMoneyReCalc)}
          </Text>
        </View>
      </View>
      <View
        style={{
          ...styles.total,
          borderRadius: 4,
          marginBottom: 30,

          /* backgroundColor: colors.primary */
        }}>
        <Text style={{...styles.totalTitle, fontSize: 16, fontWeight: '600'}}>
          MN:
        </Text>
        <Text style={{...styles.totalTxt, fontSize: 18, fontWeight: '500'}}>
          {formatToCurrency((total + totalMoneyReCalc) * prices.rate)}
        </Text>
      </View>
      <View
        style={{
          ...styles.total,
          borderRadius: 4,
          marginBottom: 30,
          /* backgroundColor: colors.primary */
        }}>
        <Text style={{...styles.totalTitle, fontSize: 16, fontWeight: '600'}}>
          MLC:
        </Text>
        <Text style={{...styles.totalTxt, fontSize: 16, fontWeight: '500'}}>
          {formatToCurrency((total + totalMoneyReCalc) / prices.ratemlc)}
        </Text>
      </View>
    </View>
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
