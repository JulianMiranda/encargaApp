/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Animated,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCarnets} from '../hooks/useCarnets';
import {ThemeContext} from '../context/theme/ThemeContext';
import {Carnet} from '../interfaces/CarnetResponse.interface';
import {CarnetComponent} from './CarnetComponent';
import {Fab} from './Fab';
import {ModalAddCarnet} from './ModalAddCarnet';
import {ModalEditCarnet} from './ModalEditCarnet';
import {useShop} from '../hooks/useShop';

interface Props {
  setSelectedCarnet: (carnet: string[]) => void;
  selectedCarnet: string[];
}
export const GetInputCarnet = ({selectedCarnet, setSelectedCarnet}: Props) => {
  const {cantPaqOS} = useShop();
  const cantCarnets = Math.ceil(cantPaqOS.oneandhalfkgPrice / 10);
  const {carnets, loadCarnets, deleteCarnet, isLoading} = useCarnets();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const navigation = useNavigation();

  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [carnetEdit, setCarnetEdit] = useState<Partial<Carnet>>({});

  const addCarnet = () => {
    setTitle('Datos');
    setBody('');

    setOpenModal(true);
  };
  const editCarnet = () => {
    setOpenModalEdit(true);
  };
  const handleCheck = (carnet: any) => {
    if (selectedCarnet.includes(carnet)) {
      setSelectedCarnet(selectedCarnet.filter(c => c !== carnet));
    } else {
      setSelectedCarnet([...selectedCarnet, carnet]);
    }
  };

  const confirmModal = () => {
    setOpenModal(false);
    setOpenModalEdit(false);
    setCarnetEdit({});
  };

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 60,
        }}>
        <Text style={{fontSize: 18}}>
          Necesitamos datos de{' '}
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              backgroundColor: 'black',
              color: 'white',
            }}>
            {' '}
            {cantCarnets}{' '}
          </Text>{' '}
          {cantCarnets === 1 ? 'persona' : 'personas'}
        </Text>
        <View
          style={{
            height: 1,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#f1f1f1',
          }}
        />
        {carnets.map((carnet, index) => (
          <>
            <View
              style={{
                width: '100%',
                padding: 10,
                paddingLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{padding: 10}}
                onPress={() => handleCheck(carnet.id)}>
                <Icon
                  name={
                    selectedCarnet.includes(carnet.id)
                      ? 'check-circle-outline'
                      : 'circle-outline'
                  }
                  size={22}
                  color={
                    selectedCarnet.includes(carnet.id) ? colors.card : '#e0e0e0'
                  }
                  style={{
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
              <View style={{flex: 1}}>
                <CarnetComponent carnet={carnet} />
              </View>
            </View>

            <View
              style={{
                height: 1,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#f1f1f1',
              }}
            />
          </>
        ))}
      </View>
      {isLoading && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
          }}>
          <ActivityIndicator size={32} color={colors.card} />
        </View>
      )}
      {/*  <Fab
        iconName={'add-outline'}
        onPress={addCarnet}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      /> */}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={addCarnet}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#fb2331',
            marginRight: -10,
            height: 30,
            paddingRight: 20,
            paddingLeft: 10,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
            }}>
            Añadir
          </Text>
        </View>
        <Fab iconName={'add-outline'} onPress={addCarnet} style={{}} />
      </TouchableOpacity>

      <ModalAddCarnet
        title={title}
        body={body}
        setBody={setBody}
        openModal={openModal}
        setOpenModal={setOpenModal}
        onConfirmModal={confirmModal}
        loadCarnets={loadCarnets}
      />

      <ModalEditCarnet
        carnetEdit={carnetEdit}
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        loadCarnets={loadCarnets}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 170,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: Platform.OS === 'ios' ? 1000 : 100,
    borderBottomLeftRadius: 0,
  },
  title: {
    fontSize: 24,
  },
  card: {
    margin: 5,
    backgroundColor: '#f8f7f7',
    borderRadius: 3,
    padding: 5,
  },
  subcategory: {
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  firstText: {
    fontSize: 16,
  },
  titleList: {
    color: 'white',
    fontSize: 40,
  },
  button: {
    position: 'absolute',
    bottom: 10,
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
