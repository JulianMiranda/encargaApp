import React, {useContext, useEffect} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {AuthContext} from '../context/auth/AuthContext';
import SplashScreen from 'react-native-splash-screen';
import {ChooseCard} from '../components/ChooseCard';
import {ChooseCard2} from '../components/ChooseCard2';
import {TopScreen} from '../components/TopScreen';
import {ThemeContext} from '../context/theme/ThemeContext';

export const MainScreen = () => {
  const {setMoney, setShop} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const colorsBG = ['#2684FD', '#bae6f7'];
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <TopScreen
        colors={colorsBG}
        text={'Servicios'}
        backButton={false}
        height={170}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setMoney()}>
          <ChooseCard2 />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => setShop()}>
          <ChooseCard />
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: 90,
          width: '100%',
          backgroundColor: 'lightskyblue',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/encarga4.png')}
          style={{height: 50, width: 80, alignSelf: 'center'}}
        />
      </View>
    </>
  );
};
