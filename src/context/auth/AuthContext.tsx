import React, {createContext, useEffect, useReducer} from 'react';

import axios from 'axios';
import api from '../../api/api';
import {User, LoginData, RegisterData} from '../../interfaces/User.interface';
import {CountryCode, Country} from '../../utils/countryTypes';

import {authReducer, AuthState} from './authReducer';
import messaging from '@react-native-firebase/messaging';
import { Login } from '../../interfaces/Login.interface';

import AsyncStorage from '@react-native-async-storage/async-storage';

/* 
import {registerForPushNotifications} from '../../utils/notificationPermissions'; */

type AuthContextProps = {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  wait: boolean;
  user: User | null;
  errorMessage: string;
  signUpPhone: (name: string, user: any) => void;
  setCountryCode: (countryCode: CountryCode) => void;
  setCountryCallCode: (countryCallCode: string) => void;
  signInPhone: (resp: Login) => void;
  logOut: () => void;
  removeError: () => void;
  loginB: () => void;
  sendPrice: number;
  countryCode: CountryCode;
  countryCallCode: string;
};

const authInicialState: AuthState = {
  status: 'checking',
  wait: false,
  user: null,
  errorMessage: '',
  sendPrice: 0,
  countryCode: 'CU',
  countryCallCode: '+53'
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  useEffect(() => {
    checkToken();
  }, []);


   async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM', fcmToken);
    }

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const checkToken = async (isLogin = false) => {
   /*  const headers = await getHeaders(); */
    try {
      //const sendPrice = await api.get<number>('/orders/getPrice');

      
      const [sendPrice, country] = await Promise.all([
				api.get<number>('/orders/getPrice'),
				axios.get('https://ipapi.co/json/')
			]);
      if(country.data.country_calling_code){
        console.log(country.data.country_calling_code, country.data.country_code);
        
        dispatch({type: 'setCountryCallCode', payload: country.data.country_calling_code});
        dispatch({type: 'setCountryCode', payload: country.data.country_code});
      }
    
     
      dispatch({type: 'setPrice', payload: sendPrice.data});
    } catch (error) {
      await AsyncStorage.removeItem('token');
      dispatch({type: 'notAuthenticated'})
     
    }
 
  
   const token = await AsyncStorage.getItem('token');
    // No token, no autenticado
    if (!token) return dispatch({type: 'notAuthenticated'});
  
    // Hay token
    try {

      const resp = await api.get<Login>('/tokenRenew');
        
      if (!resp.data.user.status) {
        return dispatch({type: 'notAuthenticated'});
      }
      if (resp.status !== 200) {
        return dispatch({type: 'notAuthenticated'});
      }
 
      await AsyncStorage.setItem('token', resp.data.token);
      if (resp.data.user.role === 'JUN') {
        requestUserPermission();
      }

      dispatch({
        type: 'signUp',
        payload: {
          user: resp.data.user,
        },
      });
    } catch (error) {
      return dispatch({type: 'notAuthenticated'});
    }
  };

  const signInPhone = async (resp: Login) => {
    try {
      dispatch({type: 'initCheck'});
     
      checkToken(true);
    } catch (error) {
      dispatch({
        type: 'addError',
        payload: 'Error Catch',
      });
    }
  };

  const signUpPhone = async (name: string, user: any) => {
    dispatch({type: 'initCheck'});
    try {
      api.put<Login>(
        'users/update/'+user.id,
        {name}
      ).then(async(resp)=> {
        checkToken(true);
      });
    
    } catch (error) {
      dispatch({
        type: 'addError',
        payload: 'Error al actualizar nombre',
      });
    }
  };

  const loginB = async () => {
    dispatch({type: 'loginB'});
  };

  const logOut = async () => {
    AsyncStorage.removeItem('token');
    dispatch({type: 'logout'});
  };

  const setCountryCode = async (country_code: CountryCode) => {
    dispatch({type: 'setCountryCode', payload: country_code});
  };

  const setCountryCallCode = async (country_call_code: string) => {
    dispatch({type: 'setCountryCallCode', payload: country_call_code});
  };

  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setCountryCode,
        setCountryCallCode,
        logOut,
        removeError,
        signInPhone,
        signUpPhone,
        loginB,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
