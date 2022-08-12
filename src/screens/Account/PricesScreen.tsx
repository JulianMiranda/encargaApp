import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {BackButton} from '../../components/BackButton';
import {AuthContext} from '../../context/auth/AuthContext';
import {formatToCurrency} from '../../utils/formatToCurrency';

export const PricesScreen = () => {
  const {prices} = useContext(AuthContext);
  const navigation = useNavigation();
  const body = [
    {
      peso: '1.5 Kg',
      price: formatToCurrency(prices.oneandhalfkgPrice),
    },
    {
      peso: '2.0 Kg',
      price: formatToCurrency(prices.twokgPrice),
    },
    {
      peso: '3.0 Kg',
      price: formatToCurrency(prices.threekgPrice),
    },
    {
      peso: '4.0 Kg',
      price: formatToCurrency(prices.fourkgPrice),
    },
    {
      peso: '5.0 Kg',
      price: formatToCurrency(prices.fivekgPrice),
    },
    {
      peso: '6.0 Kg',
      price: formatToCurrency(prices.sixkgPrice),
    },
    {
      peso: '7.0 Kg',
      price: formatToCurrency(prices.sevenkgPrice),
    },
    {
      peso: '8.0 Kg',
      price: formatToCurrency(prices.eightkgPrice),
    },
    {
      peso: '9.0 Kg',
      price: formatToCurrency(prices.ninekgPrice),
    },
    {
      peso: '10.0 Kg',
      price: formatToCurrency(prices.tenkgPrice),
    },
    {
      peso: '11.0 Kg',
      price: formatToCurrency(prices.elevenkgPrice),
    },
    {
      peso: '12.0 Kg',
      price: formatToCurrency(prices.twelvekgPrice),
    },
    {
      peso: '13.0 Kg',
      price: formatToCurrency(prices.thirteenkgPrice),
    },
    {
      peso: '14.0 Kg',
      price: formatToCurrency(prices.fourteenkgPrice),
    },
    {
      peso: '15.0 Kg',
      price: formatToCurrency(prices.fifteenkgPrice),
    },
    {
      peso: '16.0 Kg',
      price: formatToCurrency(prices.sixteenkgPrice),
    },
    {
      peso: '17.0 Kg',
      price: formatToCurrency(prices.seventeenkgPrice),
    },
    {
      peso: '18.0 Kg',
      price: formatToCurrency(prices.eighteenkgPrice),
    },
    {
      peso: '19.0 Kg',
      price: formatToCurrency(prices.nineteenkgPrice),
    },
    {
      peso: '20.0 Kg',
      price: formatToCurrency(prices.twentykgPrice),
    },
  ];

  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <>
      <BackButton navigation={navigation} color="black" />
      <ScrollView>
        <Text style={styles.title}>Precios de envíos</Text>
        {/* <View style={styles.divider} /> */}
        {body.map((element, index) => (
          <View key={index}>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.leftText}>{element.peso}</Text>
              <Text style={styles.rigthText}>{element.price}</Text>
            </View>
          </View>
        ))}
        <View style={styles.space} />
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  title: {
    color: 'black',
    alignSelf: 'center',
    marginTop: 80,
    fontSize: 26,
    marginRight: 10,
    marginLeft: 15,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  leftText: {
    color: 'black',
    fontSize: 20,
  },
  rigthText: {
    fontSize: 20,
  },
  space: {height: 100},
});
