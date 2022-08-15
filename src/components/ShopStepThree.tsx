import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Platform,
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
  selectedCarnet: string[];
  setSelectedCarnet: (selectedCarnet: string[]) => void;
}

const {height} = Dimensions.get('window');
export const ShopStepThree = ({
  handleButton,
  selectedCarnet,
  setSelectedCarnet,
}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const toast = useToast();
  const {cantPaqOS, totalPaqReCalc} = useShop();
  const cantCarnets = Math.ceil(cantPaqOS.oneandhalfkgPrice / 10);

  const [terms, setTerms] = useState(true);
  const [showFinger, setShowFinger] = useState(false);

  const noCarnetSelected = () => {
    setShowFinger(true);
    toast.show(`Seleccione 1 destinatario`, {
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
  const handleGuardar = () => {
    if (selectedCarnet.length < 1) {
      noCarnetSelected();
    } else if (!terms) {
      toast.show('Debe aceptar las condiciones de envío', {
        type: 'normal',
        placement: 'bottom',
        duration: 1000,
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
    } else {
      handleButton();
    }
  };
  const almostOneNoSelected = (): boolean => {
    if (
      selectedCarnet.length <
        totalPaqReCalc - cantPaqOS.oneandhalfkgPrice + cantCarnets ||
      !terms
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <View style={{minHeight: height * 0.65}}>
        <GetInputCarnet
          selectedCarnet={selectedCarnet}
          setSelectedCarnet={setSelectedCarnet}
          terms={terms}
          setTerms={setTerms}
          showFinger={showFinger}
          setShowFinger={setShowFinger}
        />
      </View>

      <TouchableOpacity
        style={{
          ...styles.button,
          marginBottom: Platform.OS === 'ios' ? 30 : 15,
          backgroundColor: colors.card,
        }}
        activeOpacity={terms ? 0.8 : 1}
        onPress={handleGuardar}>
        <Text style={styles.buttonText}>Comprar</Text>

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
