import React, {useContext, useRef, useState} from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  Keyboard,
} from 'react-native';
import {ThemeContext} from '../context/theme/ThemeContext';
import {useAnimation} from '../hooks/useAnimation';
import {AboutApp} from './AboutApp';
import {TandC} from './TandC';

export const MovilButtons = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const ref = useRef();

  const {position, startMovingPosition} = useAnimation();

  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [open, setOpen] = useState(0);
  return (
    <>
      <View style={styles.mainContainer}>
        {open !== 2 && (
          <>
            <Animated.View
              style={{
                ...styles.transform,
                transform: [
                  {
                    translateY: position,
                  },
                ],
              }}>
              <Pressable
                style={{
                  ...styles.button,
                  backgroundColor: colors.card,
                }}
                onPress={() => {
                  Keyboard.dismiss();
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
              ...styles.transform,
              transform: [
                {
                  translateY: position,
                },
              ],
            }}>
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: colors.card,
              }}
              onPress={() => {
                Keyboard.dismiss();
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
        {showText1 && (
          <View style={styles.up}>
            <TandC />
          </View>
        )}
        {showText2 && (
          <View style={styles.up}>
            <AboutApp />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'center'},
  container: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    marginTop: 50,
    padding: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: '#b80204',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  transform: {backgroundColor: '#ffffff'},
  up: {marginTop: -190},
});
