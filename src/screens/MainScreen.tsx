import React, {useContext, useEffect} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {AuthContext} from '../context/auth/AuthContext';
import SplashScreen from 'react-native-splash-screen';
import {ChooseCard} from '../components/ChooseCard';
import {ChooseCard2} from '../components/ChooseCard2';
import {TopScreen} from '../components/TopScreen';

export const MainScreen = () => {
  const {setMoney, setShop} = useContext(AuthContext);
  const colorsBG = ['#2684FD', '#bae6f7'];
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <TopScreen
        colors={colorsBG}
        text={`Elija un servicio`}
        backButton={false}
        height={210}
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setMoney()}>
          <ChooseCard2 />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => setShop()}>
          <ChooseCard />
        </TouchableOpacity>
      </View>
      <Image
        source={require('../assets/encarga4.png')}
        style={{height: 50, width: 80, alignSelf: 'center', marginTop: -50}}
      />
    </>
  );
};
