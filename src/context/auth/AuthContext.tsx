import React, {createContext, useEffect, useReducer} from 'react';

import api from '../../api/api';
import {User} from '../../interfaces/User.interface';
import {CountryCode} from '../../utils/countryTypes';

import {authReducer, AuthState} from './authReducer';
import {Login} from '../../interfaces/Login.interface';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceCountry from 'react-native-device-country';
import {Prices, PricesResponse} from '../../interfaces/Prices.interface';

type AuthContextProps = {
  status: 'checking' | 'authenticated' | 'not-authenticated' | 'not-internet';
  utility: 'choose' | 'shop' | 'money';
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
  refreshApp: () => void;
  updateReciveNotifications: (user: User) => void;
  prices: Prices;
  countryCode: CountryCode;
  countryCallCode: string;
};

const authInicialState: AuthState = {
  status: 'checking',
  utility: 'choose',
  wait: false,
  user: null,
  errorMessage: '',
  countryCode: 'CU',
  countryCallCode: '+53',
  prices: {
    mlc: 125,
    mn: 100,
    oneandhalfkgPrice: 21,
    twokgPrice: 25,
    threekgPrice: 30,
    fourkgPrice: 37,
    fivekgPrice: 46,
    sixkgPrice: 52,
    sevenkgPrice: 58,
    eigthkgPrice: 61,
    ninekgPrice: 70,
    tenkgPrice: 80,
  },
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  useEffect(() => {
    DeviceCountry.getCountryCode()
      .then((result: any) => {
        if (result && result.code) {
          const country = result.code.toUpperCase();
          dispatch({type: 'setCountryCode', payload: country});
        }
        //
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async (isLogin = false) => {
    /*  const headers = await getHeaders(); */
    try {
      const prices = await api.get<PricesResponse>('/prices/getPrices');
      console.log(prices.data.prices);

      dispatch({type: 'setPrices', payload: prices.data.prices});
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

      dispatch({
        type: 'signUp',
        payload: {
          user: resp.data.user,
        },
      });
    } catch (error) {
      console.log(error.message);
      if (error.message === 'Network Error') {
        dispatch({type: 'notInternet'});
      }

      // return dispatch({type: 'notAuthenticated'});
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
      api.put<Login>('users/update/' + user.id, {name}).then(async resp => {
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
    await AsyncStorage.removeItem('token');
    dispatch({type: 'utilityChoose'});
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
    if (state.user) {
      const newCodes = state.user.codes.filter(code => code !== deletecode);
      try {
        const resp = await api.put<Boolean>('/users/update/' + state.user?.id, {
          codes: newCodes,
        });
        const newUser = {
          ...state.user,
          codes: newCodes,
        };
        dispatch({type: 'deleteCode', payload: {user: newUser}});
      } catch (error) {
        console.log(error);
      }
    }
  };
  const setCode = async (setcode: string) => {
    if (state.user) {
      const newCodes = [setcode, ...state.user.codes];
      try {
        const resp = await api.put<Boolean>('/users/update/' + state.user?.id, {
          codes: newCodes,
        });

        const newUser = {
          ...state.user,
          codes: newCodes,
        };
        dispatch({type: 'setCode', payload: {user: newUser}});
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setShop = () => {
    dispatch({type: 'utilityShop'});
  };

  const refreshApp = () => {
    checkToken();
  };

  const setMoney = () => {
    dispatch({type: 'utilityMoney'});
  };

  const updateReciveNotifications = (user: User) => {
    dispatch({type: 'updateReciveNotifications', payload: user});
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
        setMoney,
        refreshApp,
        updateReciveNotifications,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
