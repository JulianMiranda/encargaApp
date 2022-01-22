import React, { useContext, useEffect} from 'react';
import {Text, StyleSheet,TouchableOpacity, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../context/auth/AuthContext';
import SplashScreen from 'react-native-splash-screen';
import { ChooseCard } from '../components/ChooseCard';
import { ChooseCard2 } from '../components/ChooseCard2';
import { TopScreen } from '../components/TopScreen';




export const MainScreen = () => {
  const navigation = useNavigation();
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
   {/*  <Text style={{fontSize:32,alignSelf: 'center', marginTop: 70, marginBottom: -20}}>Elija un servicio</Text> */}
     <View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
  
   
    <TouchableOpacity
     activeOpacity={ 0.8 }
     onPress={ ()=>setMoney() }
    >
     <ChooseCard2 icon='caja.png' />
    </TouchableOpacity>

    <TouchableOpacity 
     activeOpacity={ 0.8 }
     onPress={ ()=> setShop()}
   >
  
   <ChooseCard icon='caja.png' />
    </TouchableOpacity>
     </View>
     <Image
				source={require('../assets/encarga4.png')}
				style={{height: 50, width: 80, alignSelf: 'center', marginTop: -50}}
			/>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
    marginRight: 10,
  }
});
