import React, {useRef, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useOrders} from '../../hooks/useOrders';
import {Order} from '../../interfaces/Order.interface';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {BackButton} from '../../components/BackButton';
import Icon from 'react-native-vector-icons/FontAwesome';

const HEADER_MAX_HEIGHT = 170;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MIN_HEIGHT = 40;
export const OrderScreen = () => {
  const {orders, isLoading} = useOrders();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const navigation = useNavigation();

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
            Compras
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
            Compras
          </Text>
        </View>
        <View style={{marginTop: 40}}>
          {orders.map((order, index) => (
            <OrderComponent key={index} singleOrder={order} colors={colors} />
          ))}
          {!isLoading && orders && orders.length < 1 && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                alignSelf: 'center',
                height: 500,
              }}>
              <Image
                source={require('../../assets/perch.png')}
                style={{
                  height: 80,
                  width: 120,
                }}
              />
              <Text style={{fontSize: 18}}>Haz tu primera compra</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('HomeScreen')}
                style={{
                  ...styles.button,
                  backgroundColor: colors.card,
                }}>
                <Text style={styles.buttonText}>Comprar</Text>
                <Icon
                  name="arrow-right"
                  color="white"
                  size={24}
                  style={{position: 'absolute', right: 14, top: 10}}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
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
    </>
  );
};

const OrderComponent = ({singleOrder, colors}: any) => {
  const navigation = useNavigation();
  const order: Order = singleOrder;
  return (
    <>
      <View
        style={{
          height: 1,
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#f1f1f1',
        }}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('SingleOrderScreen', {order})}
        style={styles.card}>
        <Text style={styles.firstText}>
          Compra realizada {moment(order.createdAt).calendar()}
        </Text>
        <Text style={styles.firstText}>
          Valor de compra: {formatToCurrency(order.cost)}
        </Text>
        <View
          style={{
            backgroundColor: colors.card,
            alignSelf: 'flex-start',
            paddingRight: 30,
            paddingLeft: 10,
            borderRadius: 208,
            marginTop: 7,
            alignItems: 'center',
            paddingVertical: 1,
            flexDirection: 'row',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Text
            style={{
              ...styles.firstText,
              color: 'white',
              alignSelf: 'flex-start',
            }}>
            Factura
          </Text>
          <Icon
            name="arrow-right"
            color="white"
            size={16}
            style={{position: 'absolute', right: 5}}
          />
        </View>
      </TouchableOpacity>
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
