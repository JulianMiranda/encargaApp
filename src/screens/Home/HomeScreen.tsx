import React, {useContext, useEffect} from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CategoryCard} from '../../components/CategoryCard';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useCategoryPaginated} from '../../hooks/useCategoryPaginated';
import {homeStyles} from '../../styles/homeTheme';
import {StackScreenProps} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/core';

interface Props extends StackScreenProps<any, any> {}
const {width, height} = Dimensions.get('window');
export const HomeScreen = (props: Props) => {
  const {top} = useSafeAreaInsets();
const navigation = useNavigation();
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {categoryList, loadCategories, isLoading} = useCategoryPaginated();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  return (
    <>
      {/* <StatusBar backgroundColor="green" barStyle="light-content" /> */}
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
         <TouchableOpacity
            activeOpacity={0.8}
            style={{
              position: 'absolute',
              zIndex: 100000000,
            
              right: 40,
              top: 40}}
            onPress={()=> navigation.navigate('SearchScreen')}>
        <Icon name="search" size={26} color='red'  />
      </TouchableOpacity>
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
            <View
              style={{
                ...homeStyles.globalMargin,
                top: top,
                marginBottom: top + 60,
                paddingBottom: 10,
              }}>
              {/* <PackubaName /> */}
            </View>
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
