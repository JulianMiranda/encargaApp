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
      {/* <View style={styles.firstInfo}>
        <Text style={styles.textFirstInfo}>
          *Para su envío, la compra se embalará en paquetes de 1.5 kg con un
          costo de ${prices.oneandhalfkgPrice} por paquete.
        </Text>
      </View> */}
      <View style={styles.secContainer}>
        <Text style={styles.txtPaq}>
          Paquetes aproximados 1.5 Kg:{'  '}
          <Text style={styles.txtPaq}> {totalPaqReCalc}</Text>
        </Text>
      </View>
      {cantPaqOS.oneandhalfkgPrice !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>1.5 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.oneandhalfkgPrice}</Text>
        </View>
      )}
      {cantPaqOS.twokgPrice !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>2 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.twokgPrice}</Text>
        </View>
      )}
      {cantPaqOS.threekgPrice !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>3 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.threekgPrice}</Text>
        </View>
      )}
      {cantPaqOS.fourkgPrice !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>4 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.fourkgPrice}</Text>
        </View>
      )}
      {cantPaqOS.fivekgPrice !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>5 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.fivekgPrice}</Text>
        </View>
      )}
      {cantPaqOS.sixkgPrice !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>6 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.sixkgPrice}</Text>
        </View>
      )}
      {cantPaqOS.sevenkgPrice !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>7 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.sevenkgPrice}</Text>
        </View>
      )}
      {cantPaqOS.eigthkgPrice !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>8 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.eigthkgPrice}</Text>
        </View>
      )}
      {cantPaqOS.ninekgPrice !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>9 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.ninekgPrice}</Text>
        </View>
      )}
      {cantPaqOS.tenkgPrice !== 0 && (
        <View style={styles.boxCant}>
          <Text style={styles.txtPaq}>10 Kg</Text>
          <Text style={styles.txtPaq}>{cantPaqOS.tenkgPrice}</Text>
        </View>
      )}

      <View style={styles.threeCont}>
        <Text style={styles.txtThreeCont}>
          *La cantidad de paquetes de 1.5 Kg es aproximada, podrá variar al
          efectuarse la compra.
        </Text>
      </View>
      {/*  <View style={{}}>
        <Text style={styles.factContainer}>Factura:</Text>
      </View>
      <View style={styles.priceCont}>
        <Text style={styles.priceProd}>Precio productos:</Text>
        <Text style={styles.txtTotal}>{formatToCurrency(total)}</Text>
      </View> */}
      {/*  <Factura totalPaqReCalc={totalPaqReCalc} /> */}
      {/* <View style={styles.sendPrice}>
        <Text style={styles.sendPriceTxt}>Precio envío:</Text>
        <Text style={styles.sendPriceTxtCalc}>
          {formatToCurrency(totalMoneyReCalc)}
        </Text>
      </View>
      <View style={styles.total}>
        <Text style={styles.totalTitle}>Total:</Text>
        <Text style={styles.totalTxt}>
          {formatToCurrency(total + totalMoneyReCalc)}
        </Text>
      </View> */}
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
