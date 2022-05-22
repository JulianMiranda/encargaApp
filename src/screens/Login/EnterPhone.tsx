import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {AuthContext} from '../../context/auth/AuthContext';
import PhoneNumber from './Phone';
import Name from './Name';
import api from '../../api/api';
import {Login} from '../../interfaces/Login.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';

import {Auth} from 'aws-amplify';
import {Test} from './Test';
import CodeScreen from './CodeScreen';

export const EnterPhoneScreen = () => {
  const {signInPhone} = useContext(AuthContext);

  const [name, setName] = useState(false); /* 
  const [user, setUser] = useState<any>(); */
  const [isLoading, setIsLoading] = useState(false); /* 
  const [number, setNumber] = useState(''); */
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [otp, setOtp] = useState('');
  const [number, setNumber] = useState('');
  const password = Math.random().toString(10) + 'Abc#';

  const [wrongCode, setWrongCode] = useState(false);

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user.attributes.phone_number);
        signInOld(user.attributes.phone_number);
        setUser(user);
        setSession(null);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const signIn = () => {
    console.log('signIn', number.replace(/\s/g, ''));
    Auth.signIn(number.replace(/\s/g, ''))
      .then(result => {
        setSession(result);
      })
      .catch(e => {
        if (e.code === 'UserNotFoundException') {
          console.log('UserNotFoundException Do Sing Up');
          signUp();
        } else if (e.code === 'UsernameExistsException') {
          console.log('UserNotFoundException Do Sing Up');
          signIn();
        } else {
          console.log(e.code);
          console.error(e);
        }
      });
  };
  const signUp = async () => {
    console.log('signUp');
    const result = await Auth.signUp({
      username: number,
      password,
      attributes: {
        phone_number: number,
      },
    }).then(() => signIn());
    return result;
  };
  const verifyOtp = (otpNumber: string) => {
    console.log('verifyOtp', otpNumber);
    Auth.sendCustomChallengeAnswer(session, otpNumber)
      .then(user => {
        setUser(user);
        signInOld(user.attributes.phone_number);
        setSession(null);
      })
      .catch(err => {
        setOtp('');
        console.log(err);

        setWrongCode(true);
      });
  };

  async function signInOld(phoneNumber: any) {
    try {
      setIsLoading(true);
      api
        .get<Login>('generateToken/' + phoneNumber)
        .then(async resp => {
          try {
            if (resp.status === 200) {
              if (!resp.data.user.status) {
                ShowAlert();
              }
              setUser(resp.data.user);
              await AsyncStorage.setItem('token', resp.data.token);
            }
            if (resp.data.state === 'Login') {
              signInPhone(resp.data);
            } else {
              setName(true);
            }
          } catch (error) {
            console.log(error);
          }
        })
        .catch(err => {
          setIsLoading(false);
          Alert.alert(err.toString(), '', [
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        });

      setIsLoading(false);
    } catch (error) {
      console.log('dio este eroor', error);

      //console.log(error);
      setIsLoading(false);
      Alert.alert('Debe ingresar un número válido');
    }
  }

  const ShowAlert = () =>
    Alert.alert(
      'Usuario no permitido',
      'Por favor comunicarse con los Administradores de enCarga',
      [
        {
          text: 'Cancel',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigation.goBack()},
      ],
    );

  if (name) {
    return <Name user={user} />;
  }
  if (session) {
    return (
      <CodeScreen
        onSubmit={verifyOtp}
        phone={number}
        wrongCode={wrongCode}
        isLoading={isLoading}
      />
    );
  }

  return (
    <PhoneNumber
      onSubmit={signIn}
      setNumber={setNumber}
      isLoading={isLoading}
    />
  );
};
