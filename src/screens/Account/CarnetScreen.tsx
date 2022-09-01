import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BackButton} from '../../components/BackButton';
import {CarnetComponent} from '../../components/CarnetComponent';
import {Fab} from '../../components/Fab';
import {ModalAddCarnet} from '../../components/ModalAddCarnet';
import {ModalComponent} from '../../components/ModalComponent';
import {ModalEditCarnet} from '../../components/ModalEditCarnet';
import {NoPropsInvited} from '../../components/NoPropsInvited';
import {AuthContext} from '../../context/auth/AuthContext';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useCarnets} from '../../hooks/useCarnets';
import {Carnet} from '../../interfaces/CarnetResponse.interface';

const HEADER_MAX_HEIGHT = 170;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MIN_HEIGHT = 40;
export const CarnetScreen = () => {
  const {carnets, loadCarnets, deleteCarnet, isLoading} = useCarnets();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {status} = useContext(AuthContext);
  const navigation = useNavigation();

  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [carnetEdit, setCarnetEdit] = useState<Partial<Carnet>>({});
  const [selectedDeleteCarnet, setSelectedDeleteCarnet] = useState<
    Partial<Carnet>
  >({});

  const addCarnet = () => {
    setTitle('Datos');
    setBody('');

    setOpenModal(true);
  };
  const editCarnet = () => {
    setOpenModalEdit(true);
  };

  const confirmCloseModal = () => {
    if (selectedDeleteCarnet.id) {
      deleteCarnet(selectedDeleteCarnet.id);
    }
    setOpenConfirmModal(false);
  };

  const buttonDeleteCarnet = (carnet: Carnet) => {
    setSelectedDeleteCarnet(carnet);
    setTitle('Eliminar Datos');
    setBody('¿Deseas eliminar los datos de esta persona?');
    setOpenConfirmModal(true);
  };

  const confirmModal = () => {
    setOpenModal(false);
    setOpenModalEdit(false);
    setCarnetEdit({});
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const headerZindex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 170],
    outputRange: [0, 0, 1000],
    extrapolate: 'clamp',
  });

  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 26,
    ],
    outputRange: [-30, -30, -30, 5],
    extrapolate: 'clamp',
  });

  if (status !== 'authenticated') {
    return (
      <>
        <BackButton navigation={navigation} color="black" />
        <NoPropsInvited />
      </>
    );
  }

  return (
    <>
      <BackButton navigation={navigation} />
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'lightskyblue',
          height: headerHeight,
          zIndex: headerZindex,
          elevation: headerZindex, //required for android
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: headerTitleBottom,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            Datos
          </Text>
        </Animated.View>
      </Animated.View>
      <ScrollView
        style={{flex: 1, marginBottom: 120}}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <View
          style={{
            ...styles.headerContainer,
            height: 150,
            overflow: 'hidden',
          }}>
          <Text
            style={{
              ...styles.titleList,
              color: 'white',
              alignSelf: 'center',
              marginTop: 80,
            }}>
            Datos
          </Text>
        </View>
        <View
          style={{
            marginTop: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {carnets.map((carnet, index) => (
            <View
              key={index}
              style={{
                width: '90%',
              }}>
              <View
                style={{
                  height: 1,
                  width: '100%',
                  alignSelf: 'center',
                  backgroundColor: '#f1f1f1',
                }}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setCarnetEdit(carnet);
                  editCarnet();
                }}>
                <CarnetComponent carnet={carnet} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => buttonDeleteCarnet(carnet)}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  padding: 15,
                }}>
                <Icon
                  name="close-circle-outline"
                  size={26}
                  color="red"
                  style={{position: 'absolute', top: 5, right: 5}}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setCarnetEdit(carnet);
                  editCarnet();
                }}
                style={{
                  backgroundColor: colors.card,
                  padding: 5,
                  alignSelf: 'flex-start',
                  borderRadius: 20,
                  paddingHorizontal: 10,
                }}>
                <Text style={{marginLeft: 3, fontSize: 18, color: 'white'}}>
                  Editar
                </Text>
              </TouchableOpacity> */}
            </View>
          ))}
          <View
            style={{
              height: 1,
              width: '100%',
              alignSelf: 'center',
              backgroundColor: '#f1f1f1',
            }}
          />
        </View>
        {!isLoading && carnets.length === 0 && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 300,
            }}>
            <Image
              style={{height: 180, width: 200}}
              source={require('../../assets/no_id.png')}
            />
            <Text style={{fontSize: 18}}>No tienes datos guardados</Text>
          </View>
        )}
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
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={addCarnet}
        style={{
          position: 'absolute',
          bottom: 70,
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
      <ModalComponent
        isLoading={false}
        title={title}
        body={body}
        openModal={openConfirmModal}
        setOpenModal={setOpenConfirmModal}
        onConfirmModal={confirmCloseModal}
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
