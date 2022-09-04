/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useContext} from 'react';
import {AuthContext} from '../context/auth/AuthContext';

export const NoPropsInvited = () => {
  const {invitedLogin} = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        source={require('../assets/account.png')}
        style={{height: 150, width: 150, alignSelf: 'center'}}
      />
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          marginBottom: 10,
          alignSelf: 'center',
        }}>
        Inicia sesión para obtener mejor experiencia
      </Text>
      <TouchableOpacity
        onPress={invitedLogin}
        style={{
          height: 45,
          width: 220,
          marginTop: 15,
          backgroundColor: '#fb2331',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          elevation: 6,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '500',
            color: 'white',
          }}>
          Iniciar Sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
};
