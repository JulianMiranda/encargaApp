import React, {useContext, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemeContext} from '../context/theme/ThemeContext';
import {useShop} from '../hooks/useShop';
import {GetInputCarnet} from './GetInputCarnet';

interface Props {
  handleButton: () => void;
}

const {height} = Dimensions.get('window');
export const ShopStepThree = ({handleButton}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const toast = useToast();
  const {cantPaqOS} = useShop();
  const cantCarnets = Math.ceil(cantPaqOS.oneandhalfkgPrice / 10);

  const [selectedCarnet, setSelectedCarnet] = useState<string[]>([]);
  const noCarnetSelected = () => {
    toast.show(`Necesitamos ${cantCarnets} `, {
      type: 'normal',
      placement: 'bottom',
      duration: 3000,
      style: {
        justifyContent: 'center',
        marginBottom: 150,
        borderRadius: 50,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.8)',
      },
      textStyle: {fontSize: 16},
      animationType: 'zoom-in',
    });
  };
  return (
    <>
      <View style={{minHeight: height * 0.66}}>
        <GetInputCarnet
          selectedCarnet={selectedCarnet}
          setSelectedCarnet={setSelectedCarnet}
        />
      </View>

      <TouchableOpacity
        style={{...styles.button, backgroundColor: colors.card}}
        activeOpacity={0.8}
        onPress={
          selectedCarnet.length < cantCarnets
            ? () => noCarnetSelected()
            : () => handleButton()
        }>
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
