import React, {useContext, useEffect, useState} from 'react';
import {View, Image, FlatList, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CategoryCard} from '../../components/CategoryCard';
import {useCategoryPaginated} from '../../hooks/useCategoryPaginated';
import {homeStyles} from '../../styles/homeTheme';
import {StackScreenProps} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {SearchInputBar} from '../../components/SearchInputBar';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import api from '../../api/api';
import {AuthContext} from '../../context/auth/AuthContext';
import {SliderBox} from 'react-native-image-slider-box';
import {useHome} from '../../hooks/useHome';

interface Props extends StackScreenProps<any, any> {}
const {width} = Dimensions.get('window');
export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {user} = useContext(AuthContext);
  const {categoryList} = useCategoryPaginated();
  const {isLoading, imagesPromo} = useHome();
  const [openHeader, setOpenHeader] = useState(true);
  /* const images = [
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ]; */

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
      /* PushNotification.configure({
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
      }); */
    }
  }, [isLoading, user]);

  return (
    <>
      {/* <StatusBar backgroundColor="green" barStyle="light-content" /> */}
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
          /* width: '100%', */
          /* alignItems: 'center',
					alignContent: 'center', */

          backgroundColor: 'rgba(255,255,255,0.92)' /* 
					borderBottomRightRadius: Platform.OS === 'ios' ? 100 : 200,
					borderBottomLeftRadius: Platform.OS === 'ios' ? 40 : 40 */,

          /* top: top, */
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
        {/*  <TouchableOpacity
          activeOpacity={0.8}
          style={{
            position: 'absolute',
            zIndex: 100000000,

            right: 40,
            top: 40,
          }}
          onPress={() => navigation.navigate('SearchScreen')}>
          <Icon name="search" size={26} color="red" />
        </TouchableOpacity> */}
      </View>

      <View style={{alignItems: 'center'}}>
        <FlatList
          data={categoryList}
          keyExtractor={(category, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          /*  ref={flat}
          onContentSizeChange={()=> flat.current .scrollToEnd()} */
          // Header
          ListHeaderComponent={
            <>
              {imagesPromo.length > 0 ? (
                <SliderBox
                  images={imagesPromo}
                  sliderBoxHeight={150}
                  onCurrentImagePressed={(index: any) =>
                    console.warn(`image ${index} pressed`)
                  }
                  dotColor="#fb2331"
                  imageLoadingColor="#fb2331"
                  inactiveDotColor="#90A4AE"
                  paginationBoxVerticalPadding={20}
                  autoplay
                  circleLoop
                  autoplayInterval={10000}
                  resizeMethod={'resize'}
                  resizeMode={'cover'}
                  paginationBoxStyle={{
                    position: 'absolute',
                    bottom: 0,
                    padding: 0,
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    paddingVertical: 10,
                  }}
                  dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    padding: 0,
                    margin: 0,
                    backgroundColor: 'rgba(128, 128, 128, 0.92)',
                  }}
                  ImageComponentStyle={{
                    borderRadius: 15,
                    width: '97%',
                    marginTop: 90,
                    marginBottom: 10,
                  }}
                />
              ) : (
                <View style={{height: 100}} />
              )}
            </>
          }
          renderItem={({item}) => <CategoryCard category={item} />}
          // infinite scroll
          /* onEndReached={loadCategories}
					onEndReachedThreshold={0.4}
					 */
          ListFooterComponent={
            <View style={{height: 30}} />
            /* <ActivityIndicator style={{height: 100}} size={20} color="grey" /> */
          }
        />
      </View>
    </>
  );
};
