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
  utility: 'choose' |'shop' | 'money';
  wait: boolean;
  user: User | null;
  errorMessage: string;
  signUpPhone: (name: string, user: any) => void;
  deleteCode: (code: string) => void;
  setCode: (code: string) => void;
  setCountryCode: (countryCode: CountryCode) => void;
  setCountryCallCode: (countryCallCode: string) => void;
  signInPhone: (resp: Login) => void;
  logOut: () => void;
  removeError: () => void;
  loginB: () => void;
  setShop: () => void;
  setMoney: () => void;
  sendPrice: number;
  countryCode: CountryCode;
  countryCallCode: string;
  mn: number;
  mlc: number;
};

const authInicialState: AuthState = {
  status: 'checking',
  utility: 'choose',
  wait: false,
  user: null,
  errorMessage: '',
  sendPrice: 0,
  countryCode: 'CU',
  countryCallCode: '+53',
  mn: 60,
  mlc: 130
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  useEffect(() => {
    axios.get('https://ipapi.co/json/').then((response) => {
      console.log('response',response)
      if(response.data.country_calling_code){
        console.log(response.data.country_calling_code, response.data.country_code);
        
        dispatch({type: 'setCountryCallCode', payload: response.data.country_calling_code});
        dispatch({type: 'setCountryCode', payload: response.data.country_code});
      }
    
    }).catch((err)=> console.log(err))
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
   
      const [sendPrice, mn,mlc] = await Promise.all([
        api.get<number>('/orders/getPrice'),
        api.get<number>('/orders/getMN'),
        api.get<number>('/orders/getMLC')

      ])
     /*  const  sendPrice = await api.get<number>('/orders/getPrice'); */
    
     
      dispatch({type: 'setPrice', payload: sendPrice.data});
      dispatch({type: 'setMN', payload: mn.data});
      dispatch({type: 'setMLC', payload: mlc.data});
    } catch (error) {
      console.log('dio err el ip');  
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

  const deleteCode = async (deletecode: string) => {

    if(state.user){
      const newCodes = state.user.codes.filter((code)=> code !== deletecode );     
      try{
        const resp = await api.put<Boolean>('/users/update/'+state.user?.id, {codes: newCodes}  );
        const newUser = {
          ...state.user,
          codes: newCodes
        };
        dispatch({type: 'deleteCode',payload: {user: newUser} });
      }catch(error){
        console.log(error)
      }
     
    }
    
  };
  const setCode = async (setcode: string) => {

    if(state.user){
      const newCodes = [setcode ,...state.user.codes ]   
      try{
        const resp = await api.put<Boolean>('/users/update/'+state.user?.id, {codes: newCodes}  );
        
        const newUser = {
          ...state.user,
          codes: newCodes
        };
        dispatch({type: 'setCode',payload: {user: newUser} });
      }catch(error){
        console.log(error)
      }
     
    }

    
  };
  
  const setShop = () => {
    dispatch({type: 'utilityShop'});
  };

  const setMoney = () => {
    dispatch({type: 'utilityMoney'});
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
        deleteCode,
        setCode,
        setShop,
        setMoney
      }}>
      {children}
    </AuthContext.Provider>
  );
};
