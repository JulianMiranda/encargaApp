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
  setTerms: (term: boolean) => void;
  terms: boolean;
  selectedCarnet: string[];
}
export const GetInputCarnet = ({
  selectedCarnet,
  setSelectedCarnet,
  terms,
  setTerms,
}: Props) => {
  const {cantPaqOS, totalPaqReCalc} = useShop();
  const cantCarnets = Math.ceil(cantPaqOS.oneandhalfkgPrice / 10);
  const {carnets, loadCarnets, isLoading} = useCarnets();
  const {
    theme: {colors},
  } = useContext(ThemeContext);

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
            {totalPaqReCalc - cantPaqOS.oneandhalfkgPrice + cantCarnets}{' '}
          </Text>{' '}
          {totalPaqReCalc - cantPaqOS.oneandhalfkgPrice + cantCarnets === 1
            ? 'persona'
            : 'personas'}
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
          <View
            key={index}
            style={{
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 1,
            }}>
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

            {/* <View
              style={{
                height: 1,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#f1f1f1',
              }}
            /> */}
          </View>
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
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 80,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          onPress={() => setTerms(!terms)}>
          <Icon
            name={terms ? 'check-circle-outline' : 'circle-outline'}
            size={22}
            color={terms ? colors.card : '#e0e0e0'}
            style={{
              marginRight: 10,
            }}
          />
          <Text>Acepto las condiciones de envío</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={addCarnet}
        style={{
          position: 'absolute',
          bottom: 50,
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
