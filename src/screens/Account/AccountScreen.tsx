import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {TopScreen} from '../../components/TopScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const AccountScreen = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <>
      <TopScreen text="Mi Perfil" backButton={false} height={170} />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            marginLeft: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderScreen')}
            style={{
              width: '80%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '500',
                color: '#615e5e',
              }}>
              Compras
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('OrderScreen')}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon name={'chevron-right'} color="#ccc" size={26} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#f1f1f1',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            marginLeft: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CarnetScreen')}
            style={{
              width: '80%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '500',
                color: '#615e5e',
              }}>
              Datos de Envío
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('CarnetScreen')}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon name={'chevron-right'} color="#ccc" size={26} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#f1f1f1',
          }}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});
