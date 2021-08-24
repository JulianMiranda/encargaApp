import React, {createContext, useEffect, useReducer} from 'react';

import auth from '@react-native-firebase/auth';
/* import firebase from 'firebase'; */

import {getHeaders, getToken} from '../../api/getHeaders';

import api from '../../api/api';
import {User, LoginData, RegisterData} from '../../interfaces/User.interface';

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
  signInPhone: (resp: Login) => void;
  logOut: () => void;
  removeError: () => void;
  loginB: () => void;
  sendPrice: number;
};

const authInicialState: AuthState = {
  status: 'checking',
  wait: false,
  user: null,
  errorMessage: '',
  sendPrice: 0,
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  useEffect(() => {
    //auth().signOut();
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
   const sendPrice = await api.get<number>('/orders/getPrice')
   dispatch({type: 'setPrice', payload: sendPrice.data});
   const token = await AsyncStorage.getItem('token');
    // No token, no autenticado
    if (!token) return dispatch({type: 'notAuthenticated'});

    // Hay token
    try {
      const resp = await api.get<Login>('/tokenRenew');

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

  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
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
