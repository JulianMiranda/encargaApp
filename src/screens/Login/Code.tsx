import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {loginStyles} from '../../styles/loginTheme';

export default function OTP({onSubmit, showInputPhone}: any) {
  const CELL_COUNT = 4;
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [verificationCode, setVerificationCode] = useState('');

  const {top} = useSafeAreaInsets();

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
      <TouchableOpacity
        onPress={() => showInputPhone()}
        activeOpacity={0.8}
        style={{
          ...loginStyles.backButton,
          top: top + 15,
        }}>
        <Icon name="arrow-back-outline" color="black" size={35} />
      </TouchableOpacity>
      <View style={{...styles.screen, marginHorizontal: 30}}>
        <Text style={loginStyles.title}>Ingresa el código enviado</Text>
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

        <TouchableOpacity
          activeOpacity={verificationCode.length === 4 ? 0.8 : 1}
          style={{
            backgroundColor:
              verificationCode.length === 4 ? colors.card : '#abcffa',
            alignSelf: 'center',
            borderRadius: 16,
            marginTop: 30,
          }}
          onPress={
            verificationCode.length === 4
              ? () => onSubmit(verificationCode)
              : () => console.log('No Code valid')
          }>
          <Text style={loginStyles.textButton}>Confirmar código</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 10,
    marginTop: 50,
    marginVertical: 15,
  },
  input: {
    borderWidth: 2,
    borderColor: 'lightblue',
    width: 300,
    marginVertical: 30,
    fontSize: 25,
    padding: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 25,
  },
});
