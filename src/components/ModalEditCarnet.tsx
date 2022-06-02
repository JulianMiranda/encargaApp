import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ThemeContext} from '../context/theme/ThemeContext';
import {Carnet} from '../interfaces/CarnetResponse.interface';
import {ScrollView} from 'react-native';
import {useForm} from '../hooks/useForm';
import api from '../api/api';
import {AuthContext} from '../context/auth/AuthContext';
import {useToast} from 'react-native-toast-notifications';

interface Props {
  openModal: boolean;
  setOpenModal: (action: boolean) => void;
  loadCarnets: () => void;
  carnetEdit: Partial<Carnet>;
}

const {height, width} = Dimensions.get('window');

export const ModalEditCarnet = ({
  carnetEdit,
  openModal,
  setOpenModal,
  loadCarnets,
}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {user} = useContext(AuthContext);
  const toast = useToast();
  const [datos, setDatos] = useState<Partial<Carnet>>({
    id: carnetEdit.id || '',
    name: carnetEdit.name || '',
    firstLastName: carnetEdit.firstLastName || '',
    secondLastName: carnetEdit.secondLastName || '',
    carnet: carnetEdit.carnet || '',
    phoneNumber: carnetEdit.phoneNumber || '',
    address: carnetEdit.address || '',
    municipio: carnetEdit.municipio || '',
    number: carnetEdit.number || '',
    provincia: carnetEdit.provincia || '',
    deparment: carnetEdit.deparment || '',
    firstAccross: carnetEdit.firstAccross || '',
    secondAccross: carnetEdit.secondAccross || '',
    floor: carnetEdit.floor || '',
    reparto: carnetEdit.reparto || '',
  });
  /* 
  const {
    name,
    firstLastName,
    secondLastName,
    carnet,
    phoneNumber,
    address,
    municipio,
    number,
    provincia,
    deparment,
    firstAccross,
    secondAccross,
    floor,
    reparto,
    onChange,
  } = useForm<Partial<Carnet>>({
    name: carnetEdit.name ? carnetEdit.name : 'Algo',
    firstLastName: carnetEdit.firstLastName ? carnetEdit.firstLastName : '',
    secondLastName: carnetEdit.secondLastName ? carnetEdit.secondLastName : '',
    carnet: carnetEdit.carnet ? carnetEdit.carnet : '',
    phoneNumber: carnetEdit.phoneNumber ? carnetEdit.phoneNumber : '',
    address: carnetEdit.address ? carnetEdit.address : '',
    municipio: carnetEdit.municipio ? carnetEdit.municipio : '',
    number: carnetEdit.number ? carnetEdit.number : '',
    provincia: carnetEdit.provincia ? carnetEdit.provincia : '',
    deparment: carnetEdit.deparment ? carnetEdit.deparment : '',
    firstAccross: carnetEdit.firstAccross ? carnetEdit.firstAccross : '',
    secondAccross: carnetEdit.secondAccross ? carnetEdit.secondAccross : '',
    floor: carnetEdit.floor ? carnetEdit.floor : '',
    reparto: carnetEdit.reparto ? carnetEdit.reparto : '',
  }); */
  /* useEffect(() => {
    console.log('carnetEdit', carnetEdit);

    if (carnetEdit.name) {
      onChange(carnetEdit.name, 'name');
    }
  }, [carnetEdit]); */
  const uno = useRef<any>();
  const dos = useRef<any>();
  const tres = useRef<any>();
  const cuatro = useRef<any>();
  const cinco = useRef<any>();
  const seis = useRef<any>();
  const siete = useRef<any>();
  const ocho = useRef<any>();
  const nueve = useRef<any>();
  const diez = useRef<any>();
  const once = useRef<any>();
  const doce = useRef<any>();
  const trece = useRef<any>();
  const catorce = useRef<any>();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    name: '',
    firstLastName: '',
    secondLastName: '',
    carnet: '',
    phoneNumber: '',
    address: '',
    municipio: '',
    number: '',
    provincia: '',
    deparment: '',
    firstAccross: '',
    secondAccross: '',
    floor: '',
    reparto: '',
  });

  useEffect(() => {
    for (const key in carnetEdit) {
      if (carnetEdit[key]) {
        setDatos(prevState => ({
          ...prevState,
          [key]: carnetEdit[key],
        }));
      }
    }
    /* 
    if (carnetEdit.name) {
      setDatos({
        ...datos,
        name: carnetEdit.name,
      });
    } */
  }, [carnetEdit]);

  const onSave = async () => {
    const carnetRegex = new RegExp(/^([0-9])*$/);

    if (datos.name?.trim() === '') {
      setError({...error, name: 'El nombre es obligatorio'});
    } else if (datos.firstLastName?.trim() === '') {
      setError({...error, firstLastName: 'El apellido es obligatorio'});
    } else if (datos.secondLastName?.trim() === '') {
      setError({...error, secondLastName: 'El apellido es obligatorio'});
    } else if (datos.carnet?.trim() === '') {
      setError({...error, carnet: 'El carnet es obligatorio'});
    } else if (
      typeof datos.carnet === 'string' &&
      !carnetRegex.test(datos.carnet)
    ) {
      setError({...error, carnet: 'El carnet debe ser un número válido'});
    } else if (datos.carnet?.trim().length !== 11) {
      setError({...error, carnet: 'El carnet debe tener 11 dígitos'});
    } else if (datos.address?.trim() === '') {
      setError({...error, address: 'La dirección es obligatoria'});
    } else if (datos.number?.trim() === '') {
      setError({...error, number: 'El número de la casa es obligatorio'});
    } else if (datos.municipio?.trim() === '') {
      setError({...error, municipio: 'El municipio es obligatorio'});
    } else if (datos.provincia?.trim() === '') {
      setError({...error, provincia: 'La provincia es obligatoria'});
    } else if (datos.phoneNumber?.trim() === '') {
      setError({...error, phoneNumber: 'El teléfono es obligatorio'});
    } else if (
      datos.phoneNumber!.trim().length < 6 ||
      !carnetRegex.test(datos.phoneNumber!.trim().slice(1))
    ) {
      setError({...error, phoneNumber: 'Ingrese un teléfono válido'});
    } else {
      try {
        setIsLoading(true);
        console.log('datos', datos.carnet);

        const exist = await api.post('/carnets/getList', {
          filter: {
            user: ['=', user?.id],
            carnet: ['=', datos.carnet],
          },
        });
        console.log('exist', exist.data.data);
        if (exist.data.data.length > 0 && datos.carnet !== carnetEdit.carnet) {
          console.log('Ya tienes este carnet guardado');

          toast.show('Ya tienes guardados estos datos', {
            type: 'normal',
            placement: 'top',
            duration: 3000,
            style: {
              zIndex: 9999,
              justifyContent: 'center',
              borderRadius: 50,
              marginTop: 50,
              paddingHorizontal: 20,
              backgroundColor: 'red',
            },
            textStyle: {fontSize: 16},
            animationType: 'zoom-in',
          });
        } else {
          await api.put(`/carnets/update/${carnetEdit.id}`, {
            name: datos.name,
            firstLastName: datos.firstLastName,
            secondLastName: datos.secondLastName,
            carnet: datos.carnet,
            phoneNumber: datos.phoneNumber,
            address: datos.address,
            municipio: datos.municipio,
            number: datos.number,
            provincia: datos.provincia,
            deparment: datos.deparment,
            firstAccross: datos.firstAccross,
            secondAccross: datos.secondAccross,
            floor: datos.floor,
            reparto: datos.reparto,
            user: user?.id,
          });
        }
        /*  */
        setIsLoading(false);
        setOpenModal(false);
        loadCarnets();
      } catch (error) {
        setIsLoading(false);
        setOpenModal(false);
      }
    }
  };

  const closeModal = () => {
    setIsVisible(false);
    setOpenModal(false);
  };
  const clearError = () => {
    setError({
      name: '',
      firstLastName: '',
      secondLastName: '',
      carnet: '',
      phoneNumber: '',
      address: '',
      municipio: '',
      number: '',
      provincia: '',
      deparment: '',
      firstAccross: '',
      secondAccross: '',
      floor: '',
      reparto: '',
    });
  };
  useEffect(() => {
    if (openModal) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [openModal]);
  const onChange = (e: any, name: string) => {
    setDatos({...datos, [name]: e});
    setError({...error, [name]: ''});
  };
  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent={true}
      statusBarTranslucent={true}>
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
          style={styles.shadowContainer}>
          <ScrollView>
            {/* <View style={{flex: 1}}> */}
            <View style={{marginTop: 3}}>
              <Text style={styles.title}>Datos</Text>
              <Text style={{fontSize: 14}}>Nombre(s)*</Text>
              <TextInput
                placeholder="Jorge"
                ref={uno}
                onSubmitEditing={() => dos.current.focus()}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  fontSize: 14,
                  height: 40,
                  borderColor: '#c1c1c1',
                  borderWidth: 1,
                  borderRadius: 8,
                  top: Platform.OS === 'ios' ? 0 : 2,
                }}
                autoFocus
                autoCapitalize="words"
                autoCorrect={false}
                value={datos.name}
                onChangeText={value => onChange(value, 'name')}
              />
              {error.name !== '' && (
                <Text style={{fontSize: 10, color: 'red'}}>{error.name}</Text>
              )}
            </View>
            <View style={{flexDirection: 'row', marginTop: 3}}>
              <View style={{flex: 1, marginRight: 2}}>
                <Text style={{fontSize: 14}}>Apellido Paterno*</Text>
                <TextInput
                  placeholder="Pérez"
                  ref={dos}
                  onSubmitEditing={() => tres.current.focus()}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    fontSize: 14,
                    height: 40,
                    borderColor: '#c1c1c1',
                    borderWidth: 1,
                    borderRadius: 8,
                    top: Platform.OS === 'ios' ? 0 : 2,
                  }}
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={datos.firstLastName}
                  onChangeText={value => onChange(value, 'firstLastName')}
                />
                {error.firstLastName !== '' && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {error.firstLastName}
                  </Text>
                )}
              </View>
              <View style={{flex: 1, marginLeft: 2}}>
                <Text style={{fontSize: 14}}>Apellido Materno*</Text>
                <TextInput
                  ref={tres}
                  onSubmitEditing={() => cuatro.current.focus()}
                  placeholder="García"
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    fontSize: 14,
                    height: 40,
                    borderColor: '#c1c1c1',
                    borderWidth: 1,
                    borderRadius: 8,
                    top: Platform.OS === 'ios' ? 0 : 2,
                  }}
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={datos.secondLastName}
                  onChangeText={value => onChange(value, 'secondLastName')}
                />
                {error.secondLastName !== '' && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {error.secondLastName}
                  </Text>
                )}
              </View>
            </View>
            <View style={{marginTop: 3}}>
              <Text style={{fontSize: 14}}>Número de Carnet</Text>
              <TextInput
                ref={cuatro}
                onSubmitEditing={() => cinco.current.focus()}
                placeholder="93150714909"
                keyboardType="numeric"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  fontSize: 14,
                  height: 40,
                  borderColor: '#c1c1c1',
                  borderWidth: 1,
                  borderRadius: 8,
                  top: Platform.OS === 'ios' ? 0 : 2,
                }}
                autoCapitalize="words"
                autoCorrect={false}
                value={datos.carnet}
                onChangeText={value => onChange(value, 'carnet')}
              />
              {error.carnet !== '' && (
                <Text style={{fontSize: 10, color: 'red'}}>{error.carnet}</Text>
              )}
            </View>
            <View style={{marginTop: 3}}>
              <Text style={{fontSize: 14}}>Calle principal</Text>
              <TextInput
                ref={cinco}
                onSubmitEditing={() => seis.current.focus()}
                placeholder="Calle José Martí"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  fontSize: 14,
                  height: 40,
                  borderColor: '#c1c1c1',
                  borderWidth: 1,
                  borderRadius: 8,
                  top: Platform.OS === 'ios' ? 0 : 2,
                }}
                autoCapitalize="words"
                autoCorrect={false}
                value={datos.address}
                onChangeText={value => onChange(value, 'address')}
              />
              {error.address !== '' && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {error.address}
                </Text>
              )}
            </View>
            <View style={{marginTop: 3}}>
              <Text style={{fontSize: 14}}>Número de casa</Text>
              <TextInput
                ref={seis}
                onSubmitEditing={() => siete.current.focus()}
                placeholder="127"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  fontSize: 14,
                  height: 40,
                  borderColor: '#c1c1c1',
                  borderWidth: 1,
                  borderRadius: 8,
                  top: Platform.OS === 'ios' ? 0 : 2,
                }}
                autoCapitalize="words"
                autoCorrect={false}
                value={datos.number}
                onChangeText={value => onChange(value, 'number')}
              />
              {error.number !== '' && (
                <Text style={{fontSize: 10, color: 'red'}}>{error.number}</Text>
              )}
            </View>

            <View style={{flexDirection: 'row', marginTop: 3}}>
              <View style={{flex: 1, marginRight: 2}}>
                <Text style={{fontSize: 14}}>1 Entre Calle Opcional</Text>
                <TextInput
                  ref={siete}
                  onSubmitEditing={() => ocho.current.focus()}
                  placeholder="Calle Abel Díaz"
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    fontSize: 14,
                    height: 40,
                    borderColor: '#c1c1c1',
                    borderWidth: 1,
                    borderRadius: 8,
                    top: Platform.OS === 'ios' ? 0 : 2,
                  }}
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={datos.firstAccross}
                  onChangeText={value => onChange(value, 'firstAccross')}
                />
              </View>
              <View style={{flex: 1, marginLeft: 2}}>
                <Text style={{fontSize: 14}}>2 Entre Calle Opcional</Text>
                <TextInput
                  ref={ocho}
                  onSubmitEditing={() => nueve.current.focus()}
                  placeholder="Calle Félix Pérez"
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    fontSize: 14,
                    height: 40,
                    borderColor: '#c1c1c1',
                    borderWidth: 1,
                    borderRadius: 8,
                    top: Platform.OS === 'ios' ? 0 : 2,
                  }}
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={datos.secondAccross}
                  onChangeText={value => onChange(value, 'secondAccross')}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 3}}>
              <View style={{flex: 1, marginRight: 2}}>
                <Text style={{fontSize: 14}}>Municipio</Text>
                <TextInput
                  ref={nueve}
                  onSubmitEditing={() => diez.current.focus()}
                  placeholder="Cabaiguán"
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    fontSize: 14,
                    height: 40,
                    borderColor: '#c1c1c1',
                    borderWidth: 1,
                    borderRadius: 8,
                    top: Platform.OS === 'ios' ? 0 : 2,
                  }}
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={datos.municipio}
                  onChangeText={value => onChange(value, 'municipio')}
                />
                {error.municipio !== '' && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {error.municipio}
                  </Text>
                )}
              </View>
              <View style={{flex: 1, marginLeft: 2}}>
                <Text style={{fontSize: 14}}>Provincia</Text>
                <TextInput
                  ref={diez}
                  onSubmitEditing={() => once.current.focus()}
                  placeholder="Sancti-Spíritus"
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    fontSize: 14,
                    height: 40,
                    borderColor: '#c1c1c1',
                    borderWidth: 1,
                    borderRadius: 8,
                    top: Platform.OS === 'ios' ? 0 : 2,
                  }}
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={datos.provincia}
                  onChangeText={value => onChange(value, 'provincia')}
                />
                {error.provincia !== '' && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {error.provincia}
                  </Text>
                )}
              </View>
            </View>
            <View style={{marginTop: 3}}>
              <Text style={{fontSize: 14}}>Número de Teléfono</Text>
              <TextInput
                ref={once}
                onSubmitEditing={() => doce.current.focus()}
                keyboardType="phone-pad"
                placeholder="+53 55213165"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  fontSize: 14,
                  height: 40,
                  borderColor: '#c1c1c1',
                  borderWidth: 1,
                  borderRadius: 8,
                  top: Platform.OS === 'ios' ? 0 : 2,
                }}
                autoCapitalize="words"
                autoCorrect={false}
                value={datos.phoneNumber}
                onChangeText={value => onChange(value, 'phoneNumber')}
              />
              {error.phoneNumber !== '' && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {error.phoneNumber}
                </Text>
              )}
            </View>
            <View style={{flexDirection: 'row', marginTop: 3}}>
              <View style={{flex: 1, marginRight: 2}}>
                <Text style={{fontSize: 14}}>Departameno (Opcional)</Text>
                <TextInput
                  ref={doce}
                  onSubmitEditing={() => trece.current.focus()}
                  placeholder="203"
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    fontSize: 14,
                    height: 40,
                    borderColor: '#c1c1c1',
                    borderWidth: 1,
                    borderRadius: 8,
                    top: Platform.OS === 'ios' ? 0 : 2,
                  }}
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={datos.deparment}
                  onChangeText={value => onChange(value, 'deparment')}
                />
              </View>
              <View style={{flex: 1, marginLeft: 2}}>
                <Text style={{fontSize: 14}}>Piso (Opcional)</Text>
                <TextInput
                  ref={trece}
                  onSubmitEditing={() => catorce.current.focus()}
                  placeholder="1ro"
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    fontSize: 14,
                    height: 40,
                    borderColor: '#c1c1c1',
                    borderWidth: 1,
                    borderRadius: 8,
                    top: Platform.OS === 'ios' ? 0 : 2,
                  }}
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={datos.floor}
                  onChangeText={value => onChange(value, 'floor')}
                />
              </View>
            </View>
            <View style={{marginTop: 3}}>
              <Text style={{fontSize: 14}}>Reparto</Text>
              <TextInput
                ref={catorce}
                onSubmitEditing={() => onSave()}
                placeholder="Reparto Militar"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  fontSize: 14,
                  height: 40,
                  borderColor: '#c1c1c1',
                  borderWidth: 1,
                  borderRadius: 8,
                  top: Platform.OS === 'ios' ? 0 : 2,
                }}
                autoCapitalize="words"
                autoCorrect={false}
                value={datos.reparto}
                onChangeText={value => onChange(value, 'reparto')}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.cancelButton}
                onPress={closeModal}>
                <Text style={{color: '#000', fontSize: 16}}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  ...styles.confirmButton,
                  backgroundColor: colors.card,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={onSave}>
                {isLoading && (
                  <View style={{}}>
                    <ActivityIndicator color={'white'} />
                  </View>
                )}
                <Text style={{color: '#ffffff', fontSize: 16}}>Añadir</Text>
              </TouchableOpacity>
            </View>
            {/* </View> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowContainer: {
    width: width * 0.9,
    height: height * 0.9,
    padding: 15,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    elevation: 10,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#eeebeb',
    padding: 6,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  title: {fontSize: 20, fontWeight: 'bold', alignSelf: 'center'},
  confirmButton: {
    padding: 6,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});
