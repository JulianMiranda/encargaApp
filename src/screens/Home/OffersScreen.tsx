import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useRef} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SubcategoryDiscountCard} from '../../components/SubcategoryDiscountCard';
import {useOffersPaginated} from '../../hooks/useOffersPaginated';
import {RootStackParams} from '../../navigation/HomeStack';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'OffersScreen'> {}

export const OffersScreen = () => {
  const {isLoading, loadSubcategories, subcategories} = useOffersPaginated();
  const navigation = useNavigation<PropsNavigation>();
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const profileImageHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const profileImageMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [
      HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
      HEADER_MAX_HEIGHT + 5,
    ],
    extrapolate: 'clamp',
  });
  const headerZindex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
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
  return (
    <View style={{flex: 1}}>
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
          <TouchableOpacity
            onPress={() => navigation.pop()}
            activeOpacity={0.8}
            style={{position: 'absolute', left: 5, bottom: -5}}>
            <Icon name="arrow-back-outline" color="white" size={35} />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            Rebajas
          </Text>
        </Animated.View>
      </Animated.View>
      <FlatList
        data={subcategories}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        ListHeaderComponent={
          <>
            <Animated.View
              style={{
                height: profileImageHeight,
                width: profileImageHeight,
                borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
                borderColor: 'white',
                borderWidth: 3,
                overflow: 'hidden',
                marginTop: profileImageMarginTop,
                marginLeft: 10,
              }}>
              <Image
                source={require('../../assets/porciento.jpg')}
                style={{flex: 1, width: 75, height: 75}}
              />
            </Animated.View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 26,
                  paddingLeft: 10,
                  marginTop: -100,
                }}>
                Rebajas
              </Text>
            </View>
          </>
        }
        keyExtractor={(subcategory, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        renderItem={({item}) => <SubcategoryDiscountCard item={item} />}
        onEndReached={loadSubcategories}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          <>
            {isLoading && <ActivityIndicator color={'#fb2331'} />}

            <View style={{height: 80}} />
          </>
        }
      />
      {/* <ScrollView
    style={{flex: 1}}
    scrollEventThrottle={16}
    onScroll={Animated.event([
      {nativeEvent: {contentOffset: {y: scrollY}}},
    ])}>
    <Animated.View
      style={{
        height: profileImageHeight,
        width: profileImageHeight,
        borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
        borderColor: 'white',
        borderWidth: 3,
        overflow: 'hidden',
        marginTop: profileImageMarginTop,
        marginLeft: 10,
      }}>
      <Image
        source={require('../assets/porciento.jpg')}
        style={{flex: 1, width: undefined, height: undefined}}
      />
    </Animated.View>
    <View style={{alignItems: 'center'}}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 26,
          paddingLeft: 10,
          marginTop: -100,
        }}>
        Varun Nath
      </Text>
    </View>

    
  </ScrollView> */}
    </View>
  );
};
