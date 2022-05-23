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

  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <>
      <BackButton navigation={navigation} color="black" />
      <ScrollView>
        <Text style={styles.title}>Precios de envíos</Text>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.leftText}>1.5 Kg</Text>
          <Text style={styles.rigthText}>
            {formatToCurrency(prices.oneandhalfkgPrice)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.leftText}>2 Kg</Text>
          <Text style={styles.rigthText}>
            {formatToCurrency(prices.twokgPrice)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.leftText}>3 Kg</Text>
          <Text style={styles.rigthText}>
            {formatToCurrency(prices.threekgPrice)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.leftText}>4 Kg</Text>
          <Text style={styles.rigthText}>
            {formatToCurrency(prices.fourkgPrice)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.leftText}>5 Kg</Text>
          <Text style={styles.rigthText}>
            {formatToCurrency(prices.fivekgPrice)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.leftText}>6 Kg</Text>
          <Text style={styles.rigthText}>
            {formatToCurrency(prices.sixkgPrice)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.leftText}>7 Kg</Text>
          <Text style={styles.rigthText}>
            {formatToCurrency(prices.sevenkgPrice)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.leftText}>8 Kg</Text>
          <Text style={styles.rigthText}>
            {formatToCurrency(prices.eigthkgPrice)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.leftText}>9 Kg</Text>
          <Text style={styles.rigthText}>
            {formatToCurrency(prices.ninekgPrice)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.leftText}>10 Kg</Text>
          <Text style={styles.rigthText}>
            {formatToCurrency(prices.tenkgPrice)}
          </Text>
        </View>
        <View style={styles.divider} />
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
    width: '90%',
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
});
