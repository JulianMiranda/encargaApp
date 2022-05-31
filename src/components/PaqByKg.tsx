import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useShop} from '../hooks/useShop';

export const PaqByKg = () => {
  const {totalPaqReCalc, cantPaqOS} = useShop();
  console.log('totalPaqReCalc', totalPaqReCalc);
  console.log('cantPaqOS', cantPaqOS);
  return (
    <>
      <View style={styles.secContainer}>
        <Text style={styles.txtPaq}>
          Paquetes aproximados:
          {/* <Text style={styles.txtPaq}> {totalPaqReCalc}</Text> */}
        </Text>
      </View>
      <View style={{alignItems: 'stretch', justifyContent: 'center'}}>
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
      </View>

      <View
        style={{
          height: 1,
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#f1f1f1',
        }}
      />

      <View style={styles.threeCont}>
        <Text style={styles.txtThreeCont}>
          *La cantidad de paquetes de 1.5 Kg es aproximada, podrá variar al
          efectuarse la compra.
        </Text>
      </View>
    </>
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
    marginLeft: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtPaq: {
    fontSize: 18,
    marginHorizontal: 30,
  },
  txtPaqInside: {
    fontSize: 26,
  },
  threeCont: {
    marginHorizontal: 10,
    marginVertical: 5,
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
    borderTopWidth: 1,
    borderColor: '#f1f1f1',
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
});
