import React, {useContext} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {BackButton} from '../../components/BackButton';
import {AuthContext} from '../../context/auth/AuthContext';
import {formatToCurrency} from '../../utils/formatToCurrency';

export const AduanaScreen = () => {
  const {prices} = useContext(AuthContext);
  const navigation = useNavigation();

  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <>
      <BackButton navigation={navigation} color="black" />
      <ScrollView>
        <Text style={styles.title}>Valor de pago Aduanal </Text>
        <View style={styles.divider} />
        <Image
          style={{
            height: 400,
            width: '90%',
            justifyContent: 'center',
            alignSelf: 'center',
            resizeMode: 'contain',
          }}
          source={require('../../assets/precios_aduana.png')}
        />

        <View style={styles.space} />
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  title: {
    color: 'black',
    alignSelf: 'center',
    marginTop: 120,
    fontSize: 18,
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
    justifyContent: 'center',
    width: '100%',
    marginHorizontal: 20,
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
