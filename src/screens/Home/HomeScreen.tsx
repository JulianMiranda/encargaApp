/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useCategoryPaginated} from '../../hooks/useCategoryPaginated';
import {homeStyles} from '../../styles/homeTheme';
import {StackScreenProps} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {SearchInputBar} from '../../components/SearchInputBar';
import {AuthContext} from '../../context/auth/AuthContext';
import {useHome} from '../../hooks/useHome';
import {AutoSlider} from '../../components/AutoSlider';
import {CarouselComponent} from '../../components/Carousel';
import {CategoryCarousel} from '../../components/CategoryCarousel';
import {SubcategoryCarousel} from '../../components/SubcategoryCarousel';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import api from '../../api/api';

interface Props extends StackScreenProps<any, any> {}
const {width} = Dimensions.get('window');
export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {user} = useContext(AuthContext);
  const {categoryList} = useCategoryPaginated();
  const {
    isLoading,
    imagesPromo,
    mostSale,
    mostSaleLastMonth,
    lastSubcategories,
  } = useHome();
  const [openHeader, setOpenHeader] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
      PushNotification.configure({
        onRegister: function (token) {
          if (token.token) {
          }
          console.log('TOKEN:', token);
          api.put(`/users/update/${user!.id}`, {
            notificationTokens: token.token,
          });
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
    }
  }, [isLoading, user]);

  return (
    <>
      <SearchInputBar setOpenHeader={setOpenHeader} />
      <Image
        source={require('../../assets/bandera.jpg')}
        style={homeStyles.imageBG}
      />

      <View
        style={{
          ...homeStyles.globalMargin,
          position: 'absolute',
          zIndex: 9999999,
          width: width,
          left: 0,
          backgroundColor: 'rgba(255,255,255,0.92)',
        }}>
        {openHeader && (
          <Image
            source={require('../../assets/encarga4.png')}
            style={{
              alignSelf: 'center',
              marginTop: top + 6,
              height: 45,
              width: 100,
              marginRight: 30,
              marginBottom: -2,
            }}
          />
        )}
      </View>
      <ScrollView>
        <AutoSlider imagesPromo={imagesPromo} />

        <View style={{marginTop: 10, padding: 10}}>
          <Text style={{marginLeft: 5, fontSize: 24, fontWeight: 'bold'}}>
            Categorías
          </Text>
          <CategoryCarousel data={categoryList} />
        </View>

        <View style={{marginTop: 10}}>
          <Text style={{marginLeft: 5, fontSize: 24, fontWeight: 'bold'}}>
            Lo más vendido
          </Text>
          <CarouselComponent data={mostSale} />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={{marginLeft: 5, fontSize: 24, fontWeight: 'bold'}}>
            Lo más vendido el último mes
          </Text>
          <CarouselComponent data={mostSaleLastMonth} />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={{marginLeft: 5, fontSize: 24, fontWeight: 'bold'}}>
            Lo más reciente
          </Text>
          <SubcategoryCarousel data={lastSubcategories} />
        </View>

        <View style={{height: 100}} />
      </ScrollView>
      {isLoading && (
        <View
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: 9999999999,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fafafa',
          }}>
          <ActivityIndicator color={'red'} size={26} />
        </View>
      )}
    </>
  );
};
