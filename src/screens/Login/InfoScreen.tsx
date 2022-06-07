import React, {useContext, useEffect} from 'react';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

export const InfoScreen = () => {
  const navigation = useNavigation();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <Image
        source={require('../../assets/encargaInfo.png')}
        style={{width: '100%', height: '100%'}}
      />
      <TouchableOpacity
        style={{...styles.button, backgroundColor: colors.primary}}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('EnterPhoneScreen')}>
        <Text style={styles.buttonText}>Comenzar</Text>

        <Icon name="arrow-right" color="white" size={24} style={styles.icon} />
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 10,
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
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
  },
  icon: {position: 'absolute', right: 14, top: 10},
});
