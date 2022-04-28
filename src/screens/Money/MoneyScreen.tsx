import React, {useContext, useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Linking,
  Image,
} from 'react-native';
import {formatToCurrency} from '../../utils/formatToCurrency';
import CountryPicker from 'react-native-country-picker-modal';
import {AuthContext} from '../../context/auth/AuthContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMoney} from '../../hooks/useMoney';
import {ModalComponentMoney} from '../../components/ModalComponentMoney';
import api from '../../api/api';

export const MoneyScreen = () => {
  const {prices, user, countryCode} = useContext(AuthContext);
  const {top} = useSafeAreaInsets();
  const {
    setSenderFunction,
    setReciberFunction,
    setCUPFunc,
    setMLCFunc,
    sender,
    reciber,
    currency,
  } = useMoney();

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('Contáctanos vía WhatsApp');
  const [body, setBody] = useState(
    'Para realizar su remesa contáctenos vía WhatsApp',
  );

  const redirectWhatsapp = () => {
    setOpenModal(false);
    Linking.openURL(
      'http://api.whatsapp.com/send?text=Hola 💵 *enCargaRemesas*, solicito su servicio&phone=+593962914922',
    );
  };

  const handleButton = () => {
    try {
      const bodyPost = {
        name: user?.name,
        phone: user?.phone,
        sender: sender,
        reciber: reciber,
        currency: currency,
        countryCode: countryCode,
      };

      api.post('/orders/newSendMoney', bodyPost);
    } catch (error) {
      console.log(error);
    }
    setTitle('Contáctanos vía WhatsApp');
    setBody('Para realizar su remesa, contáctenos vía WhatsApp');
    setOpenModal(true);
  };

  const handleButtonHelp = () => {
    setTitle('¿Necesitas ayuda?');
    setBody('Contáctanos vía WhatsApp');
    setOpenModal(true);
  };
  return (
    <>
      <ScrollView>
        <View style={{backgroundColor: '#5096ff', padding: 20}}>
          <Text style={{...styles.info, marginTop: top + 10}}>
            Estimado cliente, realizamos remesas desde Ecuador. Si está enviando
            desde otro país contáctenos vía WhatsApp.
          </Text>
        </View>
        <View style={styles.inputsContainer}>
          <Text style={{color: 'black', alignSelf: 'flex-start', fontSize: 16}}>
            Envías
          </Text>
          <View style={styles.inputBox}>
            <View style={{flex: 1, alignItems: 'center', marginRight: -10}}>
              <CountryPicker
                {...{
                  countryCode: 'EC',
                  theme: {flagSizeButton: 25},
                }}
              />
            </View>
            <TextInput
              autoFocus={true}
              keyboardType="decimal-pad"
              value={sender}
              onChangeText={setSenderFunction}
              placeholder="0"
              style={styles.input}
            />
            <Text style={styles.textUSD}>USD</Text>
          </View>

          <Text
            style={{
              color: 'black',
              alignSelf: 'flex-start',
              fontSize: 16,
              marginTop: 30,
            }}>
            Reciben
          </Text>

          <View style={styles.inputBox}>
            <View style={{flex: 1, alignItems: 'center', marginRight: -10}}>
              <CountryPicker
                {...{
                  countryCode: 'CU',
                  theme: {flagSizeButton: 25},
                }}
              />
            </View>
            <TextInput
              keyboardType="decimal-pad"
              value={reciber}
              onChangeText={setReciberFunction}
              placeholder="0"
              style={{
                height: 50,
                fontSize: 20,
                color: 'black',
                backgroundColor: 'white',
                flex: 4,
              }}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={setCUPFunc}
              style={{
                backgroundColor: currency === 'CUP' ? '#5096ff' : '#ffffff',
                borderRadius: 4,
                flex: 1,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: currency === 'CUP' ? 'white' : '#d6d2d2',
                  fontSize: currency === 'CUP' ? 16 : 10,
                  fontWeight: '700',
                }}>
                CUP
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={setMLCFunc}
              style={{
                backgroundColor: currency === 'MLC' ? '#5096ff' : '#ffffff',
                borderRadius: 4,
                flex: 1,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: currency === 'MLC' ? 'white' : '#d6d2d2',
                  fontSize: currency === 'MLC' ? 16 : 10,
                  fontWeight: '700',
                }}>
                MLC
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{backgroundColor: 'white', width: '100%', padding: 20}}>
          <Text style={{fontSize: 14, fontWeight: '500', marginBottom: 5}}>
            Tipo de cambio actual
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 14, fontWeight: '700'}}>
              1.00 USD - {formatToCurrency(prices.mn).slice(1)} CUP
            </Text>
            <Text style={{fontSize: 14, fontWeight: '700'}}>
              1.00 USD - {formatToCurrency(100 / prices.mlc).slice(1)} MLC
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text style={{fontSize: 16, fontWeight: '400'}}>Envías</Text>
            <Text style={{fontSize: 16, fontWeight: '400'}}>Recibes</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 16, fontWeight: '400'}}>100 USD</Text>
            <Text style={{fontSize: 16, fontWeight: '400', color: '#0cb415'}}>
              {prices.mn * 100} CUP
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 16, fontWeight: '400'}}>
              {prices.mlc} USD
            </Text>
            <Text style={{fontSize: 16, fontWeight: '400', color: '#0cb415'}}>
              100 MLC
            </Text>
          </View>
        </View>
        <View style={{backgroundColor: '#f8f7f7', marginTop: 10, padding: 10}}>
          <Text style={{fontSize: 12, fontWeight: '400', marginLeft: 7}}>
            (USD) Dolar Estadounidense
          </Text>
          <Text style={{fontSize: 12, fontWeight: '400', marginLeft: 7}}>
            (CUP) Peso Nacional Cubano
          </Text>
          <Text style={{fontSize: 12, fontWeight: '400', marginLeft: 7}}>
            (MLC) Moneda Libremente Convertible
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleButtonHelp}
          style={styles.buttonHelp}>
          <Image
            source={require(`../../assets/whatsapp.png`)}
            style={{height: 60, width: 60}}
          />
          <Text style={{alignSelf: 'center', color: 'rgb(16,141,9)'}}>
            Ayuda
          </Text>
        </TouchableOpacity>
        <ModalComponentMoney
          isLoading={false}
          title={title}
          body={body}
          openModal={openModal}
          setOpenModal={setOpenModal}
          onConfirmModal={redirectWhatsapp}
        />
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleButton}
        style={styles.button}>
        <Text style={{color: '#ffffff', fontSize: 22, fontWeight: '700'}}>
          Enviar
        </Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  info: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  inputsContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f7f7',
  },
  inputBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 4,
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 50,
    fontSize: 20,
    color: 'black',
    backgroundColor: 'white',
    flex: 5,
  },
  textUSD: {
    borderRadius: 4,
    flex: 1,
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#5096ff',
    borderRadius: 4,
    margin: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonHelp: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    margin: 5,
    alignSelf: 'flex-end',
  },
  icon: {},
});
