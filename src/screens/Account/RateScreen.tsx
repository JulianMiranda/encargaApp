import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {BackButton} from '../../components/BackButton';
import {AuthContext} from '../../context/auth/AuthContext';
import {formatToCurrency} from '../../utils/formatToCurrency';

export const RateScreen = () => {
  const {prices} = useContext(AuthContext);
  const navigation = useNavigation();

  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <>
      <BackButton navigation={navigation} color="black" />
      <ScrollView>
        <Text style={styles.title}>Tasa de Cambio</Text>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.rigthText}>1 USD</Text>
          <Text style={styles.leftText}>1 MLC</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.rigthText}>1 USD</Text>
          <Text style={styles.leftText}>{prices.rate} MN</Text>
        </View>
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
  space: {height: 60},
});
