import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ShopSuccess = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../../assets/successShop2.png')}
          style={{width: 150, height: 150}}
        />
        <Text style={{fontWeight: 'bold', fontSize: 28, marginBottom: 50}}>
          Gracias por tu Compra!!
        </Text>

        <Text style={{fontSize: 16, marginBottom: 50}}>
          enCarga te contactará lo antes posible
        </Text>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: 1,
            padding: 10,
            paddingHorizontal: 50,
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            marginBottom: 15,
            width: '80%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: colors.card,
          }}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('ShopScreen');
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontSize: 20,
              marginHorizontal: 15,
            }}>
            Ir a la tienda
          </Text>

          <Icon
            name="arrow-right"
            color="white"
            size={24}
            style={{position: 'absolute', right: 14, top: 10}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
