import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const LogoColors = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={{...styles.text, color: '#2684FD'}}>PA</Text>
      <Text style={{...styles.text, color: '#FF5605'}}>C</Text>
      <Text style={{...styles.text, color: '#2684FD'}}>K</Text>
      <Text style={{...styles.text, color: '#FF5605'}}>UBA</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Berlin Sans FB Demi',
    fontSize: 36,
  },
});
