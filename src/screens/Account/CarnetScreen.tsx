import {useNavigation} from '@react-navigation/native';
import React, {useContext, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BackButton} from '../../components/BackButton';
import {Fab} from '../../components/Fab';
import {ModalAddCarnet} from '../../components/ModalAddCarnet';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useCarnets} from '../../hooks/useCarnets';

const HEADER_MAX_HEIGHT = 170;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MIN_HEIGHT = 40;
export const CarnetScreen = () => {
  const {carnets, isLoading} = useCarnets();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const navigation = useNavigation();

  const [openModal, setOpenModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addCarnet = () => {
    setTitle('Datos');
    setBody('');
    setOpenModal(true);
  };
  const confirmModal = () => {
    setOpenModal(false);
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
            Carnets
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
            Carnets
          </Text>
        </View>
        {/* <View style={{marginTop: 40}}>
          {orders.map((order, index) => (
            <OrderComponent key={index} singleOrder={order} />
          ))}
          
        </View> */}
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
      <Fab
        iconName={'add-outline'}
        onPress={addCarnet}
        style={{
          position: 'absolute',
          bottom: 70,
          right: 20,
        }}
      />
      <ModalAddCarnet
        title={title}
        body={body}
        setBody={setBody}
        openModal={openModal}
        isLoading={loadingModal}
        setOpenModal={setOpenModal}
        onConfirmModal={confirmModal}
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
