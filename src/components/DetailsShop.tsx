import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Prices} from '../interfaces/Prices.interface';
import {CantPaq} from '../interfaces/Shop.Interface';
import {formatToCurrency} from '../utils/formatToCurrency';
import {Factura} from './Factura';

interface Props {
  total: number;
  totalPaqReCalc: number;
  totalMoneyReCalc: number;
  prices: Prices;
  cantPaqOS: CantPaq;
}
export const DetailsShop = ({
  total,
  prices,
  cantPaqOS,
  totalPaqReCalc,
  totalMoneyReCalc,
}: Props) => {
  return (
    <View style={styles.container}>
      <View
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
      <View style={styles.divider} />

      <Factura totalPaqReCalc={totalPaqReCalc} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginTop: 10,
        }}>
        <Text style={{...styles.factContainer, fontSize: 20}}>Subtotal:</Text>
      </View>
      <View style={styles.divider} />
      <View
        style={{
          padding: 10,
          alignItems: 'stretch',
          justifyContent: 'space-between',
        }}>
        <View style={styles.priceCont}>
          <Text style={styles.priceProd}>Precio productos:</Text>
          <Text style={styles.txtTotal}>{formatToCurrency(total)}</Text>
        </View>
        <View style={styles.sendPrice}>
          <Text style={styles.sendPriceTxt}>Precio envío:</Text>
          <Text style={styles.sendPriceTxtCalc}>
            {formatToCurrency(totalMoneyReCalc)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.total}>
          <Text style={styles.totalTitle}>Total:</Text>
          <Text style={styles.totalTxt}>
            {formatToCurrency(total + totalMoneyReCalc)}
          </Text>
        </View>
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
  },
  priceProd: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: '500',
  },
  txtTotal: {
    fontSize: 20,
    fontWeight: '600',
  },
  sendPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sendPriceTxt: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: '500',
  },
  sendPriceTxtCalc: {
    fontSize: 20,
    fontWeight: '600',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalTitle: {
    fontSize: 26,
    fontWeight: '600',
  },
  totalTxt: {
    fontSize: 28,
    fontWeight: '600',
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
