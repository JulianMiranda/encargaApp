import React, {useContext, useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {loginStyles} from '../../styles/loginTheme';
import CountryPicker from 'react-native-country-picker-modal';

import {CountryCode, Country} from '../../utils/countryTypes';
import {AuthContext} from '../../context/auth/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TopScreen} from '../../components/TopScreen';

export default function PhoneNumber(props: any) {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {countryCode, countryCallCode, setCountryCode} =
    useContext(AuthContext);
  const inputRef = useRef<any>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangePhone = (number: string) => {
    if (inputRef.current.isValidNumber()) {
      inputRef.current.blur();
      setPhoneNumber(number);
      props.setNumber(number);
    }
  };

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    inputRef.current.setValue(country.callingCode[0]);
  };

  return (
    <>
      <TopScreen
        text={`Ingresa tu número\n `}
        backButton={false}
        height={190}
      />

      <View style={loginStyles.screen}>
        <View style={{marginLeft: 20, marginRight: 35}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: 'transparent',
                width: '10%',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <CountryPicker
                {...{
                  countryCode,
                  onSelect,
                  theme: {flagSizeButton: 25},
                }}
                withFilter
                /* renderCountryFilter={placeholder='Buscar'} */
              />
            </View>
            <Icon
              name="sort-down"
              color="black"
              size={16}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                marginHorizontal: 3,
              }}
            />
            <View
              style={{
                width: '100%',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <PhoneInput
                ref={inputRef}
                onChangePhoneNumber={onChangePhone}
                initialCountry={countryCode.toLocaleLowerCase()}
                textProps={{
                  placeholder: '0962914922',
                  autoFocus: true,
                }}
                autoFormat
                flagStyle={loginStyles.flagStyle}
                textStyle={loginStyles.flagInputText}
                style={{height: 45}}
              />
            </View>
          </View>
        </View>
        {loading ? (
          <View style={{marginTop: 33}}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={phoneNumber ? 0.8 : 1}
            style={{
              padding: 1,
              paddingHorizontal: 10,
              borderRadius: 50,
              backgroundColor: phoneNumber ? '#b80204' : '#f1b2b3',
              alignSelf: 'center',
              marginTop: 30,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
            onPress={
              phoneNumber
                ? () => {
                    setLoading(true);
                    props.onSubmit(phoneNumber);
                  }
                : () => {}
            }>
            <Text style={loginStyles.textButton}>Continuar</Text>
          </TouchableOpacity>
        )}

        <Text style={loginStyles.text}>
          Si continúas, es posible que recibas un SMS de verificación. Pueden
          aplicarse las tarifas de mensajes y datos
        </Text>
      </View>
    </>
  );
}
