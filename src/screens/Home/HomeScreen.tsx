/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
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
import {OfferCard} from '../../components/OfferCard';

interface Props extends StackScreenProps<any, any> {}
const {width, height} = Dimensions.get('window');
export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {user} = useContext(AuthContext);
  const {categoryList} = useCategoryPaginated();
  const {
    isLoading,
    imagesPromo,
    offers,
    mostSaleLastMonth,
    lastSubcategories,
    errorHome,
    loadHome,
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
      {/* <SearchInputBar setOpenHeader={setOpenHeader} /> */}

      <View
        style={{
          position: 'absolute',
          zIndex: 9999999,
          width: width,
          left: 0,
          backgroundColor: 'rgba(255,255,255,0.92)',
        }}>
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
      </View>
      <ScrollView>
        {imagesPromo.length > 0 ? (
          <AutoSlider imagesPromo={imagesPromo} />
        ) : (
          <View style={{height: 100}} />
        )}

        <View style={{marginTop: 10}}>
          <Text style={homeStyles.carouselTitles}>Categorías</Text>
          <CategoryCarousel data={categoryList} />
        </View>
        <View style={{marginTop: 10}}>
          {offers.length > 0 && (
            <Text style={homeStyles.carouselTitles}>Rebajas 🛍 </Text>
          )}
          {offers.map(offer => (
            <OfferCard offer={offer} key={offer.id} />
          ))}
        </View>
        {/* <View style={{marginTop: 10}}>
          <Text style={homeStyles.carouselTitles}>Lo más vendido</Text>
          <CarouselComponent data={mostSale} />
        </View> */}
        <View style={{marginTop: 10}}>
          {mostSaleLastMonth.length > 0 && (
            <Text style={homeStyles.carouselTitles}>Top Ventas 🔥</Text>
          )}
          <CarouselComponent data={mostSaleLastMonth} />
        </View>
        <View style={{marginTop: 10}}>
          {lastSubcategories.length > 0 && (
            <Text style={homeStyles.carouselTitles}>Lo último ⚡</Text>
          )}
          <SubcategoryCarousel data={lastSubcategories} />
        </View>

        <View style={{height: 100}} />
        {errorHome && (
          <View
            style={{
              backgroundColor: 'transparent',
            }}>
            <Text style={{alignSelf: 'center', fontSize: 16}}>
              No se pudo Cargar las rebajas
            </Text>
            <TouchableOpacity
              onPress={loadHome}
              style={{
                height: 45,
                width: 220,
                marginTop: 15,
                backgroundColor: '#fb2331',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                elevation: 6,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: '500',
                  color: 'white',
                }}>
                Recargar
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {isLoading && (
          <View
            style={{
              ...homeStyles.loading,
              backgroundColor: 'white',
              height: height,
            }}>
            <ActivityIndicator color={'red'} size={26} />
          </View>
        )}
      </ScrollView>
    </>
  );
};
