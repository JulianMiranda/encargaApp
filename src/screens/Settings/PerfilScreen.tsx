import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BackButton} from '../../components/BackButton';
import {FadeInImage} from '../../components/FadeInImage';
import {NoPropsInvited} from '../../components/NoPropsInvited';
import {AuthContext} from '../../context/auth/AuthContext';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useForm} from '../../hooks/useForm';
import {ActivityIndicator} from 'react-native';
import {usePerfil} from '../../hooks/usePerfil';

const {height} = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height * 0.15;
const HEADER_MIN_HEIGHT = height < 600 ? 50 : 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

export const PerfilScreen = () => {
  const {user, status} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const name = user ? user.name : '';
  const email = user ? user.email : '';
  const phone = user ? user.phone : '';
  const {
    isLoading,
    handleButton,
    showSaveButton,
    setShowSaveButton,
    nameRef,
    phoneRef,
    emailRef,
  } = usePerfil();

  const {form, onChange, setFormValue} = useForm({
    name,
    email,
    phone,
  });
  useEffect(() => {
    if (name || email || phone) {
      setFormValue({
        email,
        name,
        phone,
      });
    }
  }, [email, name, phone]);

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
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
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
  const navigation = useNavigation();
  if (status !== 'authenticated') {
    return (
      <>
        <BackButton navigation={navigation} />
        <NoPropsInvited />
      </>
    );
  }
  return (
    <>
      <Animated.View
        style={{
          ...styles.top,
          height: headerHeight,
          zIndex: headerZindex,
          elevation: headerZindex,
        }}>
        <Animated.View
          style={{
            ...styles.topBox,
            bottom: headerTitleBottom,
          }}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            activeOpacity={0.8}
            style={{position: 'absolute', left: 5, bottom: -5}}>
            <Ionicons name="arrow-back-outline" color="white" size={35} />
          </TouchableOpacity>
          <Text style={styles.textTitle}>{form.name ? form.name : ''}</Text>
        </Animated.View>
      </Animated.View>

      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <Animated.View
          style={{
            height: profileImageHeight,
            width: profileImageHeight,
            borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
            marginTop: profileImageMarginTop,
            ...styles.shortView,
          }}>
          {user?.image.url && (
            <FadeInImage
              uri={user?.image.url}
              style={{height: '100%', width: '100%', borderRadius: 50}}
            />
          )}
        </Animated.View>
        {/*  {isLoading && (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              height: height,
              width: '100%',
              zIndex: 999999999999,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.6)',
            }}>
            <ActivityIndicator />
          </View>
        )}
 */}
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>{form.name ? form.name : ''}</Text>
        </View>

        <View style={{marginTop: 70, padding: 10}}>
          <Text style={styles.buttonText}>{user?.phone}</Text>
          <TextInput
            ref={nameRef}
            style={styles.inputStyle}
            placeholder="Nombre"
            autoCorrect={false}
            autoCapitalize="words"
            value={form.name}
            onChangeText={value => onChange(value, 'name')}
          />

          <TextInput
            ref={phoneRef}
            editable={false}
            style={styles.inputStyle}
            placeholder="Teléfono"
            value={form.phone}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value => onChange(value, 'phone')}
            keyboardType="email-address"
            keyboardAppearance="dark"
          />

          <TextInput
            ref={emailRef}
            style={styles.inputStyle}
            placeholder="Email"
            value={form.email}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value => onChange(value, 'email')}
            keyboardType="email-address"
            keyboardAppearance="dark"
          />
        </View>
        {/* {showSaveButton && (
          <TouchableOpacity
            style={{...styles.saveButton, backgroundColor: colors.card}}
            activeOpacity={0.8}
            onPress={() =>
              handleButton(
                name,
                form.name,
                email,
                form.email,
                phone,
                form.phone,
              )
            }>
            <View>
              <Text style={styles.saveText}>Guardar Cambios</Text>
            </View>
          </TouchableOpacity>
        )} */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
    color: '#000',
    backgroundColor: 'transparent',
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#94CFEC',
  },
  topBox: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    paddingLeft: 10,
    marginTop: -100,
    color: '#000',
  },
  shortView: {
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
    marginLeft: 10,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  saveText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
    paddingHorizontal: 5,
  },
  saveButton: {
    paddingHorizontal: 30,
    alignSelf: 'center',
    borderRadius: 100,
    padding: 5,
    marginBottom: Platform.OS === 'ios' ? 110 : 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});