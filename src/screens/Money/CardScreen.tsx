import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParams} from '../../navigation/MoneyStack';
import {useToast} from 'react-native-toast-notifications';
import {stripePublicKey} from '../../../src/utils/stripe_public';

const stripe = require('stripe-client')(stripePublicKey);

interface Props extends StackScreenProps<RootStackParams, 'CardScreen'> {}
export const CardScreen = (props: Props) => {
  const {route} = props;
  const {phone, sender, reciber, currency, countryCode} = route.params;
  const toast = useToast();
  const [name, setNameCard] = useState('');
  const [number, setNumber] = useState('');
  const [exp_year, setYearCard] = useState('');
  const [exp_month, setMonthCard] = useState('');
  const [cvc, setCvvCard] = useState('');
  const handleButton = async () => {
    var information = {
      card: {
        number,
        exp_month,
        exp_year,
        cvc,
        name,
      },
    };
    var card = await stripe.createToken(information);
    var token = card.id;
    console.log(token);
  };
  return (
    <View style={{flex: 1, marginTop: 100, padding: 20}}>
      <Text style={{fontSize: 24}}>Pago</Text>
      <Text style={{fontSize: 18}}>Nombre en la tarjeta</Text>
      <TextInput
        value={name}
        onChangeText={setNameCard}
        style={styles.input}
        autoCapitalize="words"
        placeholder="Ejemplo: Juan Pérez"
      />
      <Text style={{fontSize: 18}}>Número la tarjeta</Text>
      <TextInput
        value={number}
        onChangeText={setNumber}
        style={styles.input}
        autoCapitalize="words"
        placeholder="Ejemplo: 4242 0000 0000 0000"
      />
      <View style={styles.viewRow}>
        <View style={styles.expiration}>
          <Text>Fecha de expiración:</Text>
          <View style={styles.viewMonthYear}>
            <TextInput
              value={exp_month}
              onChangeText={setMonthCard}
              style={styles.inputDate}
              autoCapitalize="words"
              placeholder="25"
            />
            <TextInput
              value={exp_year}
              onChangeText={setYearCard}
              style={styles.inputDate}
              autoCapitalize="words"
              placeholder="06"
            />
          </View>
        </View>
        <View style={styles.expiration}>
          <Text>CVV</Text>
          <TextInput
            value={cvc}
            onChangeText={setCvvCard}
            style={styles.inputDate}
            autoCapitalize="words"
            placeholder="25"
          />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleButton}
        style={styles.button}>
        <Text style={{color: '#ffffff', fontSize: 22, fontWeight: '700'}}>
          Pagar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 50,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#f1f1f1',
    height: 50,
    fontSize: 22,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  expiration: {
    flexDirection: 'column',
  },
  viewMonthYear: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  inputDate: {
    width: 100,
    marginRight: 10,
    backgroundColor: '#f1f1f1',
  },

  button: {
    backgroundColor: '#5096ff',
    borderRadius: 4,
    margin: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
});
