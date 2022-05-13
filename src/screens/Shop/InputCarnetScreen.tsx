import React, {useState} from 'react';
import {Text, View, TextInput} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/ShopStack';

interface Props
  extends StackScreenProps<RootStackParams, 'InputCarnetScreen'> {}

export const InputCarnetScreen = (props: Props) => {
  const {route} = props;
  const {paquetes} = route.params;

  const [name, setName] = useState('');
  const [carnet, setCarnet] = useState('');
  const [address, setAddress] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [provincia, setProvincia] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const cantCarnets = Math.ceil(paquetes / 10);

  return (
    <View style={{marginTop: 50}}>
      <Text
        style={{
          color: 'black',
          alignSelf: 'center',
          fontSize: 26,
          marginRight: 10,
          marginLeft: 15,
          marginBottom: 20,
        }}>
        Necesitamos un total de {cantCarnets} carnets para tu envío.
      </Text>
      <View style={{padding: 15, backgroundColor: '#FCFCFC'}}>
        <View style={{marginTop: 3}}>
          <Text>Nombre:</Text>
          <TextInput
            style={{borderWidth: 1, borderColor: '#f1f1f1'}}
            onChangeText={setName}
            value={name}
          />
        </View>
        <View style={{marginTop: 3}}>
          <Text>No. Carnet:</Text>
          <TextInput
            style={{borderWidth: 1, borderColor: '#f1f1f1'}}
            onChangeText={setCarnet}
            value={carnet}
          />
        </View>
        <View style={{marginTop: 3}}>
          <Text>Dirección:</Text>
          <TextInput
            style={{borderWidth: 1, borderColor: '#f1f1f1'}}
            multiline
            onChangeText={setAddress}
            value={address}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, marginHorizontal: 3}}>
            <Text>Municipio:</Text>
            <TextInput
              style={{borderWidth: 1, borderColor: '#f1f1f1'}}
              multiline
              onChangeText={setMunicipio}
              value={municipio}
            />
          </View>
          <View style={{flex: 1, marginHorizontal: 3}}>
            <Text>Provincia:</Text>
            <TextInput
              style={{borderWidth: 1, borderColor: '#f1f1f1'}}
              multiline
              onChangeText={setProvincia}
              value={provincia}
            />
          </View>
        </View>
        <View style={{marginTop: 3}}>
          <Text>Teléfono:</Text>
          <TextInput
            style={{borderWidth: 1, borderColor: '#f1f1f1'}}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
          />
        </View>
      </View>
    </View>
  );
};
