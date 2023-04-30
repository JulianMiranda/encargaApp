import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../context/auth/AuthContext';
import {ShopContext} from '../context/shop/ShopContext';
import {ModalComponent} from './ModalComponent';
import api from '../api/api';
import {TopGradient} from './TopGradient';

type Key =
  | 'historial'
  | 'whatsapp'
  | 'logout'
  | 'invitedLogin'
  | 'about'
  | 'radar'
  | 'app'
  | 'money'
  | 'prices'
  | 'delete'
  | 'privacity'
  | 'perfil'
  | 'terms'
  | 'token';

const {width} = Dimensions.get('window');
export default function SettingsOptions() {
  const navigation = useNavigation();
  const {status, user, logOut, setMoney, invitedLogin} =
    useContext(AuthContext);
  const {emptyCar} = useContext(ShopContext);

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [handleOpt, setHandleOpt] = useState(0);

  const confirmModal = () => {
    console.log('confirmModal', handleOpt);
    switch (handleOpt) {
      case 0:
        closeSesion();
        break;
      case 1:
        redirectWhatsapp();
        break;
      case 2:
        redirectCorreo();
        break;
      case 3:
        deleteAccount();
        break;
      case 4:
        privacity();
        break;
      default:
        break;
    }
  };

  const closeSesion = async () => {
    setOpenModal(false);
    await emptyCar();
    logOut();
  };

  const deleteAccount = async () => {
    setOpenModal(false);
    await emptyCar();
    await api.put('/users/delete/' + user?.id);
    logOut();
  };

  const redirectWhatsapp = () => {
    setOpenModal(false);
    Linking.openURL(
      'http://api.whatsapp.com/send?text=Hola 📦 *encarga*, me podría ayudar?&phone=+593962914922',
    );
  };

  const privacity = () => {
    setOpenModal(false);
    Linking.openURL('https://encarga-politics.herokuapp.com/');
  };

  const redirectCorreo = () => {
    setOpenModal(false);
    Linking.openURL('https://www.correos.cu/rastreador-de-envios/');
  };

  const sinOut = () => {
    setHandleOpt(0);
    setTitle('Cerrar sesión');
    setBody('¿Deseas cerrar sesión?');
    setOpenModal(true);
  };
  const deleteAccountOpt = () => {
    setHandleOpt(3);
    setTitle('Eliminar cuenta');
    setBody('¿Deseas eliminar tu cuenta?');
    setOpenModal(true);
  };
  const rastrearCompra = () => {
    setHandleOpt(2);
    setTitle('Rastrear mi Compra');
    setBody('¿Desea visitar Correos de Cuba?');
    setOpenModal(true);
  };

  const irWhatsApp = () => {
    setHandleOpt(1);
    setTitle('Contáctanos vía WhatsApp');
    setBody('¿Necesita ayuda de encarga?');
    setOpenModal(true);
  };

  const irPrivacity = () => {
    console.log('Privacity');
    setHandleOpt(4);
    setTitle('Ver Políticas');
    setBody('¿Quieres ver nuestras políticas de privacidad de datos?');
    setOpenModal(true);
  };
  const selectedComponent = (key: Key) => {
    switch (key) {
      case 'token':
        navigation.navigate('NotificationScreen');
        break;
      case 'about':
        navigation.navigate('TandCScreen');
        break;
      case 'app':
        navigation.navigate('AppScreen');
        break;
      case 'whatsapp':
        irWhatsApp();
        break;
      case 'perfil':
        navigation.navigate('PerfilScreen');
        break;
      case 'radar':
        //navigation.navigate('TrackScreen');
        rastrearCompra();
        break;

      case 'money':
        setMoney();
        break;
      case 'delete':
        deleteAccountOpt();
        break;
      case 'privacity':
        navigation.navigate('PrivacityScreen');
        break;
      case 'terms':
        navigation.navigate('TermsScreen');
        break;

      case 'logout':
        sinOut();
        break;

      case 'invitedLogin':
        invitedLogin();
        break;
    }
  };
  const menuOptions = generateOptions(selectedComponent, status);

  return (
    <ScrollView>
      <TopGradient text={'Ajustes'} />
      <View
        style={{
          marginTop: 70,
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        {menuOptions.map((menu, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={styles.cardContainer}
            onPress={menu.onPress}
            activeOpacity={0.8}>
            <View style={styles.cardInside}>
              {/*  <Text style={{...styles.name}}> {menu.title}</Text> */}
              <Image source={menu.image} style={styles.productImage} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <ModalComponent
        isLoading={false}
        title={title}
        body={body}
        openModal={openModal}
        setOpenModal={setOpenModal}
        onConfirmModal={confirmModal}
      />
    </ScrollView>
  );
}

function generateOptions(selectedComponent: any, status: string) {
  return [
    {
      title: 'Notificaciones',
      iconType: 'material-community',
      iconNameLeft: 'bell',
      iconNameRight: 'chevron-right',
      iconSizeRight: 32,
      color: '#FF2E00',
      onPress: () => selectedComponent('token'),
      image: require('../assets/Diapositiva1.png'),
    },
    {
      title: 'Contáctanos vía WhatsApp',
      iconType: 'material-community',
      iconNameLeft: 'whatsapp',
      iconNameRight: 'arrow-top-right',
      iconSizeRight: 26,
      color: '#21e462',
      onPress: () => selectedComponent('whatsapp'),
      image: require('../assets/Diapositiva11.png'),
    },
    /*  {
      title: 'Carnet',
      iconType: 'material-community',
      iconNameLeft: 'cellphone-lock',
      iconNameRight: 'arrow-top-right',
      iconSizeRight: 26,
      color: '#24A10A',
      onPress: () => selectedComponent('carnet'),
      image: require('../assets/Diapositiva9.png'),
    }, */
    {
      title: 'Acerca de la aplicacón',
      iconType: 'material-community',
      iconNameLeft: 'domain',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#ecf024',
      onPress: () => selectedComponent('app'),
      image: require('../assets/Diapositiva2.png'),
    },
    {
      title: 'Información al comprar',
      iconType: 'material-community',
      iconNameLeft: 'shield-star-outline',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#b621e4',
      onPress: () => selectedComponent('about'),
      image: require('../assets/Diapositiva3.png'),
    },

    {
      title: 'Política de Privacidad',
      iconType: 'material-community',
      iconNameLeft: 'cellphone-lock',
      iconNameRight: 'arrow-top-right',
      iconSizeRight: 26,
      color: '#24A10A',
      onPress: () => selectedComponent('privacity'),
      image: require('../assets/Diapositiva6.png'),
    },
    {
      title: 'Términos y Condiciones',
      iconType: 'material-community',
      iconNameLeft: 'cellphone-lock',
      iconNameRight: 'arrow-top-right',
      iconSizeRight: 26,
      color: '#24A10A',
      onPress: () => selectedComponent('terms'),
      image: require('../assets/Diapositiva12.png'),
    },
    {
      title: 'Perfil',
      iconType: 'material-community',
      iconNameLeft: 'cellphone-lock',
      iconNameRight: 'arrow-top-right',
      iconSizeRight: 26,
      color: '#24A10A',
      onPress: () => selectedComponent('perfil'),
      image: require('../assets/Diapositiva13.png'),
    },
    {
      title: 'Borrar mi Cuenta',
      iconType: 'material-community',
      iconNameLeft: 'delete-alert-outline',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#FF5733',
      onPress: () => selectedComponent('delete'),
      image: require('../assets/Diapositiva5.png'),
    },
    {
      title: status === 'authenticated' ? 'Cerrar sesión' : 'Iniciar sesión',
      iconType: 'material-community',
      iconNameLeft: 'power',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#fa1818',
      onPress: () =>
        selectedComponent(
          status === 'authenticated' ? 'logout' : 'invitedLogin',
        ),
      image:
        status === 'authenticated'
          ? require('../assets/Diapositiva7.png')
          : require('../assets/Diapositiva8.png'),
    },
  ];
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  cardContainer: {
    height: width * 0.28,
    width: width * 0.28,
    marginBottom: 60,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    fontSize: 14,
    position: 'absolute',
    top: 4,
    left: 10,
    color: 'black',
    marginBottom: 5,
  },
  productImage: {
    height: width * 0.28,
    width: width * 0.28,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    /* resizeMode: 'center', */
  },
  cardInside: {borderRadius: 10},
});
