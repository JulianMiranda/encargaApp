/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../context/auth/AuthContext';
import {ThemeContext} from '../context/theme/ThemeContext';
import {useShop} from '../hooks/useShop';
import {convertPeso} from '../utils/convertPeso';
import {formatToCurrency} from '../utils/formatToCurrency';

interface Element {
  cantidad: number;
  price: number;
  peso: string;
}
export const ProductosTest = () => {
  const {prices} = useContext(AuthContext);
  const {cantPaqOS, weigth} = useShop();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [body, setBody] = useState<Element[]>([]);

  useEffect(() => {
    const bodyPush: Element[] = [];
    for (const paq in cantPaqOS) {
      if (cantPaqOS[paq] !== 0) {
        console.log('Element se Hace');
        console.log('Element', paq, cantPaqOS[paq]);
        console.log('Precio', prices[paq]);
        bodyPush.push({
          cantidad: cantPaqOS[paq],
          price: prices[paq],
          peso: convertPeso(paq),
        });
        /*  prices.push({
          ...prices[0],
          currency: formatToCurrency(cantPaqOS[paq]),
        }); */
      }
    }
    setBody(bodyPush);
  }, [cantPaqOS]);

  return (
    <>
      <View style={styles.container}>
        <View style={{...styles.headerTable, backgroundColor: colors.card}}>
          <Text style={styles.headerText}>Peso Kg</Text>
          <Text style={styles.headerText}>Paquetes</Text>
          <Text style={styles.headerText}>Envío</Text>
          <View style={styles.headerContainerTotal}>
            <Text style={styles.headerTextTotal}>Total</Text>
          </View>
        </View>
        {body.map((element, index) => (
          <View key={index} style={styles.containerBody}>
            <Text style={{flex: 2, marginLeft: 5}}>{element.peso}</Text>
            <Text style={{flex: 2, marginRight: 3, marginLeft: 3}}>
              {element.cantidad}
            </Text>
            <Text style={{flex: 2}}>{formatToCurrency(element.price)}</Text>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
              }}>
              <Text>{formatToCurrency(element.price * element.cantidad)}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginHorizontal: 10,
  },
  headerTable: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerText: {
    flex: 2,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
    borderRightColor: 'white',
    borderRightWidth: 1,
  },
  headerTextTotal: {
    fontWeight: 'bold',
    color: 'white',
  },
  headerContainerTotal: {
    flex: 2,
    alignItems: 'center',
  },
  containerBody: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
  },
});
