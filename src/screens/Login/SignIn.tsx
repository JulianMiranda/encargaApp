import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/auth/AuthContext';

export default function Authenticated() {
  const {loginB} = useContext(AuthContext);
  useEffect(() => {
    loginB();
  }, []);
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>You're Logged in</Text>
      <Text style={styles.phoneNumber}>{auth().currentUser!.phoneNumber}</Text>
      <View style={{marginTop: 30}}>
        <Button title="Signout" onPress={() => auth().signOut()} />
      </View>
      <View style={{marginTop: 30}}>
        <Button title="Log" onPress={() => loginB()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: 'lightblue',
    width: 300,
    marginVertical: 30,
    fontSize: 25,
    padding: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 25,
  },
  phoneNumber: {
    fontSize: 21,
    marginTop: 20,
  },
});
