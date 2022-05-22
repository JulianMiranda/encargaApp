import React, {useContext, useState} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../context/auth/AuthContext';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {loginStyles} from '../../styles/loginTheme';

export default function CodeScreen(params: any) {
  const {onSubmit, phone, wrongCode} = params;
  const {} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const CELL_COUNT = 6;
  const [verificationCode, setVerificationCode] = useState('');
  const codeRef = useBlurOnFulfill({
    value: verificationCode,
    cellCount: CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: verificationCode,
    setValue: setVerificationCode,
  });

  return (
    <>
      <View style={loginStyles.codeContainer}>
        <Text style={loginStyles.title}>
          Ingresa el código enviado al {phone}
        </Text>
        <CodeField
          ref={codeRef}
          {...props}
          value={verificationCode}
          autoFocus
          onChangeText={setVerificationCode}
          cellCount={CELL_COUNT}
          rootStyle={loginStyles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[loginStyles.cell, isFocused && loginStyles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        {wrongCode && (
          <Text style={loginStyles.wrongCode}>Código incorrecto.</Text>
        )}
        {false ? (
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={{marginTop: 40}}>
            <ActivityIndicator size={26} color={'black'} />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={verificationCode.length === 6 ? 0.8 : 1}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              ...loginStyles.buttonConfirm,
              backgroundColor:
                verificationCode.length === 6 ? colors.primary : '#f1b2b3',
            }}
            onPress={
              verificationCode.length === 6
                ? () => onSubmit(verificationCode)
                : () => console.log('No Code valid')
            }>
            <Text style={loginStyles.textButton}>Confirmar</Text>
            <Icon
              name="arrow-right"
              color="white"
              size={20}
              style={{...loginStyles.icon}}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}
