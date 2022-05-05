import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import SplashScreen from 'react-native-splash-screen';
import {TopScreen} from '../../components/TopScreen';
import {TandC} from '../../components/TandC';
import {useAnimation} from '../../hooks/useAnimation';
import {AboutApp} from '../../components/AboutApp';
import Icon from 'react-native-vector-icons/FontAwesome';

export const InfoScreen = () => {
  const navigation = useNavigation();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {position, startMovingPosition} = useAnimation();
  const colorsBG = ['#2684FD', '#bae6f7'];
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [open, setOpen] = useState(0);

  return (
    <>
      <Image
        source={require('../../assets/encarga4.png')}
        style={{
          height: 100,
          width: 120,
          alignSelf: 'center',
          marginTop: 50,
        }}
      />
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          alignSelf: 'center',
          marginTop: -30,
        }}>
        Da lo mejor de ti
      </Text>
      {/* <TopScreen
        colors={colorsBG}
        text={`Compremos\n `}
        backButton={false}
        height={190}
      /> */}
      {/* <Image
				source={require('../../assets/avion.jpg')}
				style={{height: 170, width: 170, alignSelf: 'center', position: 'absolute', top: 10, right: 10}}
			/> */}
      <View
        style={{
          height: 100,
        }}>
        {/*  <LogoColors /> */}
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {open !== 2 && (
          <>
            <Animated.View
              style={{
                backgroundColor: '#ffffff',
                /* 
        opacity, */
                transform: [
                  {
                    translateY: position,
                  },
                ],
              }}>
              <Pressable
                style={{
                  ...styles.button,
                  ...styles.buttonOpen,
                  backgroundColor: colors.card,
                }}
                onPress={() => {
                  if (showText1) {
                    startMovingPosition(-50, 0);
                    setShowText1(!showText1);
                    setOpen(0);
                  } else {
                    startMovingPosition(-50, -100);
                    setShowText1(!showText1);
                    setOpen(1);
                  }
                }}>
                <Text style={styles.textStyle}>
                  {showText1 ? '-    ' : '+    '}Qué debe saber usted antes de
                  la compra
                </Text>
              </Pressable>
            </Animated.View>
          </>
        )}
        {open !== 1 && (
          <Animated.View
            style={{
              backgroundColor: '#ffffff',
              /* 
        opacity, */
              transform: [
                {
                  translateY: position,
                },
              ],
            }}>
            <Pressable
              style={{
                ...styles.button,
                ...styles.buttonOpen,
                backgroundColor: colors.card,
              }}
              onPress={() => {
                if (showText2) {
                  startMovingPosition(-50, 0);
                  setShowText2(!showText2);
                  setOpen(0);
                } else {
                  startMovingPosition(0, -100);
                  setShowText2(!showText2);
                  setOpen(2);
                }
              }}>
              <Text style={styles.textStyle}>
                {showText2 ? '-    ' : '+    '}Acerca de nuestra aplicacón
              </Text>
            </Pressable>
          </Animated.View>
        )}
      </View>
      <View style={styles.container}>
        {/* {open === 0 && (
          <Image
            source={require('../../assets/encarga4.png')}
            style={{
              height: 200,
              width: 270,
              alignSelf: 'center',
              marginTop: 50,
            }}
          />
        )} */}
        {showText1 && (
          <View style={{marginTop: -190}}>
            <TandC />
          </View>
        )}
        {showText2 && (
          <View style={{marginTop: -190}}>
            <AboutApp />
          </View>
        )}
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 10,
          flexDirection: 'row',
          marginTop: 1,
          padding: 10,
          paddingHorizontal: 50,
          alignSelf: 'center',
          justifyContent: 'center',
          borderRadius: 50,
          backgroundColor: colors.primary,
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
        }}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('EnterPhoneScreen')}>
        <Text
          style={{
            alignSelf: 'center',
            color: 'white',
            fontSize: 20,
            marginHorizontal: 15,
          }}>
          Comenzar
        </Text>

        <Icon
          name="arrow-right"
          color="white"
          size={24}
          style={{position: 'absolute', right: 14, top: 10}}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: '#b80204',
          marginTop: 1,
          marginBottom: 15,
        }}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('EnterPhoneScreen')}>
        <Text style={styles.textButton}>Comenzar</Text>
      </TouchableOpacity> */}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    /*  fontWeight: 'bold',
    marginBottom: 25, */
    alignSelf: 'center',
  },
  text: {
    fontSize: 22,

    fontWeight: '300',
    textAlign: 'left',
    marginVertical: 20,
  },
  button: {
    /* position: 'absolute',
    bottom: 10, */
    marginTop: 50,
    padding: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
    borderRadius: 50,
  },
  textButton: {
    alignSelf: 'center',

    color: 'white',
    fontSize: 18,
    marginHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: '#b80204',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    margin: 100,
    marginBottom: 30,
    textAlign: 'center',
  },
});
