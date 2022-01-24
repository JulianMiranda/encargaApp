import React, {useContext, useState} from 'react';
import {Alert} from 'react-native';
import {AuthContext} from '../../context/auth/AuthContext';
import PhoneNumber from './Phone';
import Name from './Name';
import api from '../../api/api';
import { Login } from '../../interfaces/Login.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

export const EnterPhoneScreen = () => {
  const {signInPhone} = useContext(AuthContext);
  const [name, setName] = useState(false);
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState('');
  const navigation = useNavigation();
  

  async function signIn(phoneNumber: any) {
    try {
      setIsLoading(true);
      api.get<Login>(
        'generateToken/'+phoneNumber
      ).then(async(resp)=> {
        try {
         if(resp.status === 200){
           if(!resp.data.user.status) {
             ShowAlert();
           }
          setUser(resp.data.user) 
          await AsyncStorage.setItem('token', resp.data.token)}
          if(resp.data.state=== 'Login'){
            signInPhone(resp.data);
          } else{           
            setName(true);
          }
        } catch (error) {
          console.log(error);
          
        }
       
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Alert.alert('Debe ingresar un número válido');
    }
  }

  const ShowAlert = () =>  Alert.alert(
    "Usuario no permitido",
    "Por favor comunicarse con los Administradores de enCarga",
    [
      {
        text: "Cancel",
        onPress: () => navigation.goBack(),
        style: "cancel"
      },
      { text: "OK", onPress: () => navigation.goBack() }
    ]
  );
  if (name) return <Name user={user}/>;

  return <PhoneNumber onSubmit={signIn} setNumber={setNumber} isLoading={isLoading} />;
};
