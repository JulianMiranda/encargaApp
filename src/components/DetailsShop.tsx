import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Prices} from '../interfaces/Prices.interface';
import {CantPaq} from '../interfaces/Shop.Interface';
import {formatToCurrency} from '../utils/formatToCurrency';
import {Factura} from './Factura';

interface Props {
  total: number;
  cantPaq: number;
  totalReCalc: number;
  prices: Prices;
  cantPaqOS: CantPaq;
}
export const DetailsShop = ({
  cantPaq,
  total,
  prices,
  cantPaqOS,
  totalReCalc,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.firstInfo}>
        <Text style={styles.textFirstInfo}>
          *Para su envío, la compra se embalará en paquetes de 1.5 kg con un
          costo de ${prices.oneandhalfkgPrice} por paquete.
        </Text>
      </View>
      <View style={styles.secContainer}>
        <Text style={styles.txtPaq}>
          Cantidad aproximada de paquetes:{'  '}
          <Text style={styles.txtPaq}> {totalReCalc}</Text>
        </Text>
      </View>
      {cantPaqOS.oneandhalf !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>1.5 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.oneandhalf}</Text>
        </View>
      )}
      {cantPaqOS.twoKg !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>2 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.twoKg}</Text>
        </View>
      )}
      {cantPaqOS.threeKg !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>3 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.threeKg}</Text>
        </View>
      )}
      {cantPaqOS.fourKg !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>4 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.fourKg}</Text>
        </View>
      )}
      {cantPaqOS.fiveKg !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>5 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.fiveKg}</Text>
        </View>
      )}
      {cantPaqOS.sixKg !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>6 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.sixKg}</Text>
        </View>
      )}
      {cantPaqOS.sevenKg !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>7 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.sevenKg}</Text>
        </View>
      )}
      {cantPaqOS.eightKg !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>8 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.eightKg}</Text>
        </View>
      )}
      {cantPaqOS.nineKg !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>9 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.nineKg}</Text>
        </View>
      )}
      {cantPaqOS.tenKg !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>10 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.tenKg}</Text>
        </View>
      )}

      <View style={styles.threeCont}>
        <Text style={styles.txtThreeCont}>
          *La cantidad aproximada de paquetes para el envío es calculada a
          partir del peso aproximado de los productos, por lo que puede ser
          diferente al realizar su compra.
        </Text>
      </View>
      <View style={{}}>
        <Text style={styles.factContainer}>Factura:</Text>
      </View>
      <View style={styles.priceCont}>
        <Text style={styles.priceProd}>Precio productos:</Text>
        <Text style={styles.txtTotal}>{formatToCurrency(total)}</Text>
      </View>
      <Factura cantPaq={cantPaq} />
      <View style={styles.sendPrice}>
        <Text style={styles.sendPriceTxt}>Precio envío:</Text>
        <Text style={styles.sendPriceTxtCalc}>
          {formatToCurrency(cantPaq * prices.oneandhalfkgPrice)}
        </Text>
      </View>
      <View style={styles.total}>
        <Text style={styles.totalTitle}>Total:</Text>
        <Text style={styles.totalTxt}>
          {formatToCurrency(total + cantPaq * prices.oneandhalfkgPrice)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FEFEFE',
  },
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
    backgroundColor: '#FCB1B1',
    padding: 10,
  },
  txtThreeCont: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '400',
  },
  factContainer: {
    marginTop: 30,
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
    fontSize: 20,
    fontWeight: '600',
  },
  txtTotal: {
    fontSize: 24,
    fontWeight: '600',
  },
  sendPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sendPriceTxt: {
    marginLeft: 10,
    fontSize: 22,
    fontWeight: '600',
  },
  sendPriceTxtCalc: {
    fontSize: 26,
    fontWeight: '600',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalTitle: {
    marginLeft: 10,
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
});
