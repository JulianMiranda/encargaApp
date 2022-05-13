import {useNavigation} from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Fab} from '../../components/Fab';
import {ModalAddCode} from '../../components/ModalAddCode';
import {TopScreen} from '../../components/TopScreen';
import {AuthContext} from '../../context/auth/AuthContext';
import {useTrack} from '../../hooks/useTrack';
import api from '../../api/api';
import axios from 'axios';

export const TrackScreen = () => {
  const colors = ['#2684FD', '#bae6f7'];
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();

  const {user, deleteCode, setCode} = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addTrackCode = () => {
    setTitle('Añade un código');
    setBody('');
    setOpenModal(true);
  };

  const deleteCodeFun = async (deletecode: string) => {
    deleteCode(deletecode);
  };
  const showToastWithGravityAndOffset = (text: string) => {
    ToastAndroid.showWithGravityAndOffset(
      '\n Introduce un código válido\n\n' + text,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50,
    );
  };

  const confirmModal = () => {
    const bodyclear = body.trim();
    const patt = new RegExp(/^[A-Za-z0-9\s]+$/g);
    const res = patt.test(bodyclear);
    if (bodyclear.length !== 13) {
      showToastWithGravityAndOffset('Código de 13 caracteres');
    } else if (!res) {
      showToastWithGravityAndOffset('Sólo letras y números');
    } else {
      setOpenModal(false);
      setCode(bodyclear);
    }
  };
  return (
    <>
      <TopScreen
        colors={colors}
        text="Rastreo"
        backButton={true}
        height={170}
      />

      <View
        style={{/* alignItems: 'center', */ margin: 20, paddingBottom: 200}}>
        <FlatList
          data={user?.codes}
          keyExtractor={(category, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          renderItem={({item}) => codeFile(item, navigation, deleteCodeFun)}
          ListFooterComponent={<View style={{height: 30}} />}
        />
      </View>

      <Fab
        iconName={'add-outline'}
        onPress={addTrackCode}
        style={{
          position: 'absolute',
          bottom: 70,
          right: 20,
        }}
      />
      <ModalAddCode
        title={title}
        body={body}
        setBody={setBody}
        openModal={openModal}
        isLoading={isLoading}
        setOpenModal={setOpenModal}
        onConfirmModal={confirmModal}
      />
    </>
  );
};

const codeFile = (item: any, navigation: any, deleteCodeFun: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        alignContent: 'space-around',
        width: '100%',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('SingleTrackScreen', {code: item})}
        style={{
          paddingHorizontal: 20,
          marginVertical: 5,
          backgroundColor: '#fafafa',
        }}>
        <Text style={{fontSize: 22}}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={() => deleteCodeFun(item)}>
        <Icon name="trash" color="#f02e2e" size={30} />
      </TouchableOpacity>
    </View>
  );
};
