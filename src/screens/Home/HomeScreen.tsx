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
import {homeStyles} from '../../styles/homeTheme';
import {StackScreenProps} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {AuthContext} from '../../context/auth/AuthContext';
import {useHome} from '../../hooks/useHome';
import {AutoSlider} from '../../components/AutoSlider';
import {CarouselComponent} from '../../components/Carousel';
import {CategoryCarousel} from '../../components/CategoryCarousel';
import {SubcategoryCarousel} from '../../components/SubcategoryCarousel';
import {OfferCard} from '../../components/OfferCard';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {AutoSliderFinal} from '../../components/AutoSliderFinal';
import api from '../../api/api';
import {Subcategory} from '../../interfaces/Subcategory.interface';

interface Props extends StackScreenProps<any, any> {}
const {width, height} = Dimensions.get('window');
export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  const {user, updatePrices} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  /* 
  const {categoryList} = useCategoryPaginated(); */
  const {
    isLoading,
    imagesPromo,
    imagesPromoFinal,
    offers,
    mostSaleLastMonth,
    lastSubcategories,
    errorHome,
    loadHome,
  } = useHome();

  useEffect(() => {
    SplashScreen.hide();
  }, [user]);

  useEffect(() => {
    if (!user?.notificationTokens) {
      obteinToken();
    } else if (user && user.notificationTokens.length < 0) {
      obteinToken();
    } else {
      console.log('ya tiene token');
    }
  }, [user]);

  useEffect(() => {
    PushNotification.configure({
      onNotification: async function (notification) {
        /*  console.log('notification.data.click_action', notification.data); */

        if (
          notification.data.click_action === 'UPDATE_ENVIO_NOTIFICATION_CLICK'
        ) {
          console.log('navegar Precios');
          updatePrices();
          navigation.navigate('Settings', {screen: 'PricesScreen'});
          /*   navigation.navigate('PricesScreen'); */
        }
        if (
          notification.data.click_action === 'SUBCATEGORY_NOTIFICATION_CLICK'
        ) {
          const subcategory = await api.get<Subcategory>(
            `subcategories/getOne/${notification.data.subcategory}`,
          );
          navigation.navigate('SubcategoryScreen', {
            subcategory: subcategory.data,
          });
        }

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,

      requestPermissions: true,
    });
  }, [navigation]);

  const obteinToken = () => {
    console.log('obteinToken 1ra vez');
    PushNotification.configure({
      onRegister: async function (token) {
        if (token.token) {
          console.log('TOKEN:', token);
          try {
            api.put(`/users/update/${user!.id}`, {
              notificationTokens: token.token,
            });
          } catch (error) {
            console.log(error);
          }
        }
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
          source={require('../../assets/logo_enc.png')}
          style={{
            alignSelf: 'center',
            marginTop: top + 6,
            height: 45,
            width: 85,
            resizeMode: 'contain',
            marginBottom: -2,
          }}
        />
      </View>
      <ScrollView>
        {imagesPromo.length > 0 ? (
          <AutoSlider imagesPromo={imagesPromo} />
        ) : (
          <View style={{height: 170}} />
        )}

        <View style={{marginTop: 10}}>
          <Text
            style={{
              ...homeStyles.carouselTitles,
              marginLeft: 10,
              fontFamily: 'NovaSlim-Regular',
            }}>
            Categorías
          </Text>
          <CategoryCarousel />
        </View>
        <View style={{marginTop: 10}}>
          {offers.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center' /* 
                borderTopWidth: 2,
                borderTopColor: '#f1f1f1', */,
                marginHorizontal: 10,
                backgroundColor: 'red',
                alignSelf: 'flex-start',
                paddingHorizontal: 10,
                justifyContent: 'center',
                borderRadius: 5,
                marginBottom: 5,
              }}>
              <Text
                style={{
                  ...homeStyles.carouselTitles,
                  color: 'white',
                  fontSize: 24,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  fontFamily: 'NovaSlim-Regular',
                }}>
                REBAJAS
              </Text>
              {/* <Image
                source={require('../../assets/rebaja9.png')}
                style={{width: 150, height: 45}}
              /> */}
            </View>
          )}
          {offers.map(offer => (
            <OfferCard offer={offer} key={offer.id} />
          ))}
          <View
            style={{
              height: 1,
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#f1f1f1',
            }}
          />
          {offers.length > 0 && (
            <TouchableOpacity
              onPress={() => navigation.navigate('OffersScreen')}
              activeOpacity={0.8}
              style={{
                padding: 3,
                backgroundColor: colors.card,
                alignSelf: 'flex-end',
                borderRadius: 20,
                paddingHorizontal: 10,
                marginTop: 10,
                marginRight: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}>
              <Text style={{color: 'white'}}>Más...</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* <View style={{marginTop: 10}}>
          <Text style={homeStyles.carouselTitles}>Lo más vendido</Text>
          <CarouselComponent data={mostSale} />
        </View> */}
        <View style={{marginTop: 40}}>
          {mostSaleLastMonth.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center' /* 
              borderTopWidth: 2,
              borderTopColor: '#f1f1f1', */,
                marginHorizontal: 10,
                backgroundColor: '#F59622',
                alignSelf: 'flex-start',
                paddingHorizontal: 10,
                justifyContent: 'center',
                borderRadius: 5,
                marginBottom: 5,
              }}>
              <Text
                style={{
                  ...homeStyles.carouselTitles,
                  color: 'white',
                  fontSize: 22,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                TOP VENTAS
              </Text>
            </View>
          )}
          <CarouselComponent data={mostSaleLastMonth} />
        </View>
        <View
          style={{
            marginTop: 40,
            zIndex: 9999999,
            backgroundColor: 'transparent',
            marginBottom: -100,
          }}>
          {lastSubcategories.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center' /* 
            borderTopWidth: 2,
            borderTopColor: '#f1f1f1', */,
                marginHorizontal: 10,
                backgroundColor: '#76D573',
                alignSelf: 'flex-start',
                paddingHorizontal: 20,
                justifyContent: 'center',
                borderRadius: 5,
                marginBottom: 5,
              }}>
              <Text
                style={{
                  ...homeStyles.carouselTitles,
                  color: 'white',
                  fontSize: 22,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                LO ÚLTIMO
              </Text>
            </View>
          )}

          <SubcategoryCarousel data={lastSubcategories} />
        </View>

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
        {imagesPromoFinal.length > 0 ? (
          <AutoSliderFinal imagesPromoFinal={imagesPromoFinal} />
        ) : (
          <View style={{height: 170}} />
        )}
      </ScrollView>
      {isLoading && (
        <View
          style={{
            ...homeStyles.loading,
            top: top + height * 0.75,
            width: '100%',
          }}>
          <ActivityIndicator color={'red'} size={36} />
        </View>
      )}
    </>
  );
};
