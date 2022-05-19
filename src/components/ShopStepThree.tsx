import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemeContext} from '../context/theme/ThemeContext';
import {GetInputCarnet} from './GetInputCarnet';

interface Props {
  handleButton: () => void;
}

export const ShopStepThree = ({handleButton}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <>
      <View style={{flex: 6, minHeight: 480, marginTop: 50}}>
        <GetInputCarnet />
      </View>

      <TouchableOpacity
        style={{...styles.button, backgroundColor: colors.card}}
        activeOpacity={0.8}
        onPress={() => handleButton()}>
        <Text style={styles.buttonText}>Continuar</Text>

        <Icon name="arrow-right" color="white" size={24} style={styles.icon} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {position: 'absolute', right: 14, top: 10},
  button: {
    flexDirection: 'row',
    marginTop: 1,
    padding: 10,
    paddingHorizontal: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 15,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
  },
});
