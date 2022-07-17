import React, {useEffect, useState, useContext} from 'react';
import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../context/auth/AuthContext';
import api from '../../api/api';
import {CustomSwitch} from '../../components/CustomSwitch';
import {loginStyles} from '../../styles/loginTheme';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import {BackButton} from '../../components/BackButton';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const NotificationScreen = () => {
  const {user, updateReciveNotifications} = useContext(AuthContext);
  const toast = useToast();
  const navigation = useNavigation();

  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [reciveNot, setReciveNot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setReciveNot(user!.reciveNotifications);
  }, []);

  const onChange = (value: boolean) => {
    setReciveNot(value);
  };
  const handleButton = async () => {
    try {
      setIsLoading(true);
      if (reciveNot) {
        await obteinToken();
      }
      const resp = await api.put(`/users/update/${user!.id}`, {
        reciveNotifications: reciveNot,
      });

      if (resp.status === 200) {
        const newUserProps = {...user, reciveNotifications: reciveNot};

        updateReciveNotifications(newUserProps);

        setIsLoading(false);
        toast.show(
          reciveNot
            ? 'Te mantendremos informado de todas las novedades de enCarga'
            : 'Ya no recibirás notificaciones de enCarga',
          {
            type: 'normal',
            placement: 'top',
            duration: 3000,
            style: {width: '100%', justifyContent: 'center', marginTop: 30},
            textStyle: {fontSize: 16},
            animationType: 'slide-in',
          },
        );
      } else {
        setIsLoading(false);
        toast.show(
          'Problemas para conectarse al servidor, inténtelo mas tarde',
          {
            type: 'normal',
            placement: 'top',
            duration: 3000,
            style: {width: '100%', justifyContent: 'center', marginTop: 30},
            textStyle: {fontSize: 16},
            animationType: 'slide-in',
          },
        );
      }
    } catch (error) {
      setIsLoading(false);
      toast.show('Problemas para conectarse al servidor, inténtelo mas tarde', {
        type: 'normal',
        placement: 'top',
        duration: 3000,
        style: {width: '100%', justifyContent: 'center', marginTop: 30},
        textStyle: {fontSize: 16},
        animationType: 'slide-in',
      });
    }
  };
  const obteinToken = () => {
    PushNotification.configure({
      onRegister: async function (token) {
        if (token.token) {
          console.log('TOKEN:', token);

          await api.put(`/users/update/${user!.id}`, {
            notificationTokens: token.token,
          });
        }
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,

      requestPermissions: true,
    });
  };
  return (
    <>
      <BackButton navigation={navigation} color="black" />

      <Text
        style={{
          color: 'black',
          alignSelf: 'center',
          marginTop: 100,
          fontSize: 26,
          marginRight: 10,
          marginLeft: 15,
          marginBottom: 20,
        }}>
        enCarga quiere mantenerte informado
      </Text>
      <View
        style={{
          height: 1,
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#f1f1f1',
          marginTop: 20,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',

          padding: 15,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
          }}>
          Recibir Notificaciones
        </Text>
        <CustomSwitch isOn={user!.reciveNotifications} onChange={onChange} />
      </View>
      <View
        style={{
          height: 1,
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#f1f1f1',
        }}
      />
      {user!.reciveNotifications !== reciveNot && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 10,
            paddingHorizontal: 30,
            alignSelf: 'center',
            borderRadius: 100,
            padding: 5,
            marginBottom: Platform.OS === 'ios' ? 110 : 80,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: colors.card,
          }}
          activeOpacity={0.8}
          onPress={handleButton}>
          <View>
            <Text style={{...loginStyles.textButton, paddingHorizontal: 5}}>
              Guardar Cambios
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {isLoading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={colors.primary} size={32} />
        </View>
      )}
    </>
  );
};
