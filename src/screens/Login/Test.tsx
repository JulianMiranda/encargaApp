import React, {useEffect, useState} from 'react';
import Auth from '@aws-amplify/auth';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

const NOTSIGNIN = 'You are NOT logged in';
const SIGNEDIN = 'You have logged in successfully';
const SIGNEDOUT = 'You have logged out successfully';
const WAITINGFOROTP = 'Enter OTP number';
const VERIFYNUMBER = 'Verifying number (Country code +XX needed)';
export const Test = () => {
  const [message, setMessage] = useState('Welcome to Demo');
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [otp, setOtp] = useState('');
  const [number, setNumber] = useState('');
  const password = Math.random().toString(10) + 'Abc#';

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setUser(user);
        setMessage(SIGNEDIN);
        setSession(null);
      })
      .catch(err => {
        console.error(err);
        setMessage(NOTSIGNIN);
      });
  };
  const signOut = () => {
    if (user) {
      Auth.signOut();
      setUser(null);
      setOtp('');
      setMessage(SIGNEDOUT);
    } else {
      setMessage(NOTSIGNIN);
    }
  };
  const signIn = () => {
    setMessage(VERIFYNUMBER);
    Auth.signIn(number)
      .then(result => {
        setSession(result);
        setMessage(WAITINGFOROTP);
      })
      .catch(e => {
        if (e.code === 'UserNotFoundException') {
          signUp();
        } else if (e.code === 'UsernameExistsException') {
          setMessage(WAITINGFOROTP);
          signIn();
        } else {
          console.log(e.code);
          console.error(e);
        }
      });
  };
  const signUp = async () => {
    const result = await Auth.signUp({
      username: number,
      password,
      attributes: {
        phone_number: number,
      },
    }).then(() => signIn());
    return result;
  };
  const verifyOtp = () => {
    Auth.sendCustomChallengeAnswer(session, otp)
      .then(user => {
        setUser(user);
        setMessage(SIGNEDIN);
        setSession(null);
      })
      .catch(err => {
        setMessage(err.message);
        setOtp('');
        console.log(err);
      });
  };
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{message}</Text>
        {user && <Text>Has User</Text>}
        <Text>Numero:</Text>
        <TextInput value={number} onChangeText={setNumber} />
        <Text>OTP</Text>
        <TextInput value={otp} onChangeText={setOtp} />

        <TouchableOpacity style={{}} onPress={signIn}>
          <Text>Enviar Numero</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{}} onPress={verifyOtp}>
          <Text>Verificar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{}} onPress={signOut}>
          <Text>Salir</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
