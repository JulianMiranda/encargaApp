import React, {useContext, useEffect, useState} from 'react';
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

interface Props {
  title: string;
  body: string;
  openModal: boolean;
  isLoading: boolean;
  setOpenModal: (action: boolean) => void;
  onConfirmModal: () => void;
  setBody: (action: string) => void;
}

const {height, width} = Dimensions.get('window');

export const ModalAddCarnet = ({
  title,
  body,
  setBody,
  isLoading,
  openModal,
  setOpenModal,
  onConfirmModal,
}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
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
  const [isVisible, setIsVisible] = useState(false);

  const onSave = () => {};

  const closeModal = () => {
    setIsVisible(false);
    setOpenModal(false);
  };
  useEffect(() => {
    if (openModal) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [openModal]);
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
            <Text style={styles.title}>{title}</Text>
            <Text style={{fontSize: 14}}>Nombre(s)</Text>
            <TextInput
              placeholder="Jorge"
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
              value={name}
              onChangeText={value => onChange(value, 'name')}
            />
            <View style={{flexDirection: 'row', marginTop: 3}}>
              <View style={{flex: 1, marginRight: 2}}>
                <Text style={{fontSize: 14}}>Apellido Paterno</Text>
                <TextInput
                  placeholder="Pérez"
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
                  value={firstLastName}
                  onChangeText={value => onChange(value, 'firstLastName')}
                />
              </View>
              <View style={{flex: 1, marginLeft: 2}}>
                <Text style={{fontSize: 14}}>Apellido Materno</Text>
                <TextInput
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
                  value={secondLastName}
                  onChangeText={value => onChange(value, 'secondLastName')}
                />
              </View>
            </View>
            <View style={{marginTop: 3}}>
              <Text style={{fontSize: 14}}>Número de Carnet</Text>
              <TextInput
                placeholder="93150714909"
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
                value={carnet}
                onChangeText={value => onChange(value, 'carnet')}
              />
            </View>
            <View style={{marginTop: 3}}>
              <Text style={{fontSize: 14}}>Calle principal</Text>
              <TextInput
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
                autoFocus
                autoCapitalize="words"
                autoCorrect={false}
                value={address}
                onChangeText={value => onChange(value, 'address')}
              />
            </View>
            <View style={{marginTop: 3}}>
              <Text style={{fontSize: 14}}>Número de casa</Text>
              <TextInput
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
                autoFocus
                autoCapitalize="words"
                autoCorrect={false}
                value={number}
                onChangeText={value => onChange(value, 'number')}
              />
            </View>

            <View style={{flexDirection: 'row', marginTop: 3}}>
              <View style={{flex: 1, marginRight: 2}}>
                <Text style={{fontSize: 14}}>1 Entre Calle Opcional</Text>
                <TextInput
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
                  value={firstAccross}
                  onChangeText={value => onChange(value, 'firstAccross')}
                />
              </View>
              <View style={{flex: 1, marginLeft: 2}}>
                <Text style={{fontSize: 14}}>2 Entre Calle Opcional</Text>
                <TextInput
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
                  value={secondAccross}
                  onChangeText={value => onChange(value, 'secondAccross')}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 3}}>
              <View style={{flex: 1, marginRight: 2}}>
                <Text style={{fontSize: 14}}>Municipio</Text>
                <TextInput
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
                  value={municipio}
                  onChangeText={value => onChange(value, 'municipio')}
                />
              </View>
              <View style={{flex: 1, marginLeft: 2}}>
                <Text style={{fontSize: 14}}>Provincia</Text>
                <TextInput
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
                  value={provincia}
                  onChangeText={value => onChange(value, 'provincia')}
                />
              </View>
            </View>
            <View style={{marginTop: 3}}>
              <Text style={{fontSize: 14}}>Número de Teléfono</Text>
              <TextInput
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
                autoFocus
                autoCapitalize="words"
                autoCorrect={false}
                value={phoneNumber}
                onChangeText={value => onChange(value, 'phoneNumber')}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: 3}}>
              <View style={{flex: 1, marginRight: 2}}>
                <Text style={{fontSize: 14}}>Departameno (Opcional)</Text>
                <TextInput
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
                  value={deparment}
                  onChangeText={value => onChange(value, 'deparment')}
                />
              </View>
              <View style={{flex: 1, marginLeft: 2}}>
                <Text style={{fontSize: 14}}>Piso (Opcional)</Text>
                <TextInput
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
                  value={floor}
                  onChangeText={value => onChange(value, 'floor')}
                />
              </View>
            </View>
            <View style={{marginTop: 3}}>
              <Text style={{fontSize: 14}}>Reparto</Text>
              <TextInput
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
                autoFocus
                autoCapitalize="words"
                autoCorrect={false}
                value={reparto}
                onChangeText={value => onChange(value, 'reparto')}
              />
            </View>
            {isLoading && (
              <View style={{flex: 1}}>
                <ActivityIndicator color={colors.primary} />
              </View>
            )}

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
                style={{...styles.confirmButton, backgroundColor: colors.card}}
                onPress={onConfirmModal}>
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
