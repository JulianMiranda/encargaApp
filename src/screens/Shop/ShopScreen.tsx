import React, {useRef, useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {ModalComponent} from '../../components/ModalComponent';
import {useShop} from '../../hooks/useShop';
import {AnimatedProgress} from '../../components/AnimatedProgress';
import {ShopStepOne} from '../../components/ShopStepOne';
import {ShopStepTwo} from '../../components/ShopStepTwo';
import {ShopStepThree} from '../../components/ShopStepThree';
import {ShopContext} from '../../context/shop/ShopContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useToast} from 'react-native-toast-notifications';
import ScreenLoading from '../../components/LoadingSafe';
import {useNavigation} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import {ShopSuccess} from '../../components/ShpSuccessComponent';
import {AuthContext} from '../../context/auth/AuthContext';
import {CheckWeigth} from '../../utils/checkWeigth';
import LinearGradient from 'react-native-linear-gradient';
import {NoPropsInvited} from '../../components/NoPropsInvited';
import {BackButtonShop} from '../../components/BackButtonShop';
import {ThemeContext} from '../../context/theme/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height * 0.15;
const HEADER_MIN_HEIGHT = height < 600 ? 50 : 70;
const PROFILE_IMAGE_MIN_HEIGHT = 40;
export interface RellenoInterface {
  noone: boolean;
  refresco: boolean;
  maquina: boolean;
  golosina: boolean;
  plantilla: boolean;
  lapicero: boolean;
}
export const ShopScreen = () => {
  const {
    isLoading,
    openModal,
    title,
    body,
    weigth,
    cantPaqOS,
    setOpenModal,
    confirmModal,
    total,
    totalMoneyReCalc,
    totalPaqReCalc,
  } = useShop();

  const [progress, setProgress] = useState(2);
  const {car, makeShop, addCarLoading} = useContext(ShopContext);
  const {prices, status} = useContext(AuthContext);
  const {top} = useSafeAreaInsets();
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
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
  const toast = useToast();
  const navigation = useNavigation();
  const scrollRef = useRef<any>();
  const modalizeRef = useRef<Modalize>(null);
  const [selectedCarnet, setSelectedCarnet] = useState<string[]>([]);
  const [warning, setWarning] = useState<boolean>(true);
  const [relleno, setRelleno] = useState<RellenoInterface>({
    noone: false,
    refresco: false,
    maquina: false,
    golosina: false,
    plantilla: false,
    lapicero: false,
  });

  const barWidth = useRef(new Animated.Value(0)).current;

  const pressNavigate = () => {
    modalizeRef.current?.close();
    navigation.navigate('HomeScreen');
  };
  useEffect(() => {
    (progress === 1 || progress === 0) &&
      scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
  }, [progress]);

  useEffect(() => {
    setWarning(true);
  }, [weigth]);

  const handleButton = async () => {
    if (progress === 2) {
      const resp = CheckWeigth(weigth, cantPaqOS, warning, setWarning);
      if (resp.problem) {
        toast.show(resp.message, {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          style: {
            justifyContent: 'center',
            marginBottom: 150,
            borderRadius: 50,
            paddingHorizontal: 20,
            backgroundColor: 'rgba(0,0,0,0.8)',
          },
          textStyle: {
            fontSize: 16,
            alignSelf: 'center',
          },
          animationType: 'zoom-in',
        });

        return;
      }
    }
    if (progress >= 1) {
      const newBarWith =
        progress === 2
          ? (width * 0.8) / progress - 20
          : (width * 0.8) / progress - 50;
      Animated.spring(barWidth, {
        toValue: newBarWith,
        bounciness: 0,
        speed: 2,
        useNativeDriver: false,
      }).start();
      setProgress(progress - 1);
    } else {
      const respShop = await makeShop(
        total + totalMoneyReCalc,
        '',
        cantPaqOS,
        totalPaqReCalc,
        prices,
        selectedCarnet,
        relleno,
      );
      setProgress(2);
      const newBarWith =
        progress === 2
          ? (width * 0.8) / progress - 20
          : (width * 0.8) / progress - 50;
      Animated.spring(barWidth, {
        toValue: newBarWith,
        bounciness: 0,
        speed: 2,
        useNativeDriver: false,
      }).reset();
      if (respShop) {
        modalizeRef.current?.open();

        /*  navigation.navigate('HomeScreen'); */
      }
    }
  };
  const pressBack = () => {
    setProgress(progress + 1);
  };
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
          {progress < 2 && (
            <TouchableOpacity
              onPress={() => setProgress(progress + 1)}
              activeOpacity={0.8}
              style={{position: 'absolute', left: 5, bottom: -5}}>
              <Ionicons name="arrow-back-outline" color="white" size={35} />
            </TouchableOpacity>
          )}

          {progress === 2 && (
            <Text
              style={{
                ...styles.textTitle,
              }}>
              Mi Compra
            </Text>
          )}
          {progress === 1 && (
            <Text
              style={{
                ...styles.textTitle,
              }}>
              Factura
            </Text>
          )}
          {progress === 0 && (
            <Text
              style={{
                ...styles.textTitle,
              }}>
              Finalizar compra
            </Text>
          )}
        </Animated.View>
      </Animated.View>

      <ScrollView
        style={{flex: 1}}
        ref={scrollRef}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <LinearGradient
          colors={['#4EB2E4', '#94CFEC', '#fff']}
          style={{
            ...styles.linearGradient,
            height: height * 0.2,
            marginBottom: -height * 0.1,
          }}>
          {progress === 2 && (
            <Text
              style={{
                ...styles.buttonTextScroll,
              }}>
              Mi Compra
            </Text>
          )}
          {progress === 1 && (
            <Text
              style={{
                ...styles.buttonTextScroll,
              }}>
              Factura
            </Text>
          )}
          {progress === 0 && (
            <Text
              style={{
                ...styles.buttonTextScroll,
              }}>
              Finalizar compra
            </Text>
          )}
        </LinearGradient>
        {progress !== 2 && <BackButtonShop pressBack={pressBack} />}
        {car.length > 0 && (
          <>
            <View
              style={{
                marginTop: 30,
                marginBottom: 30,
              }}>
              <AnimatedProgress progress={progress} barWidth={barWidth} />
            </View>
          </>
        )}

        {progress === 2 && (
          <ShopStepOne
            handleButton={handleButton}
            relleno={relleno}
            setRelleno={setRelleno}
          />
        )}
        {progress === 1 && <ShopStepTwo handleButton={handleButton} />}
        {progress === 0 && (
          <ShopStepThree
            handleButton={handleButton}
            selectedCarnet={selectedCarnet}
            setSelectedCarnet={setSelectedCarnet}
          />
        )}
        {/*  {((status === 'not-authenticated' &&
          progress === 2 &&
          car.length > 0) ||
          (status === 'authenticated' && car.length > 0)) && (
          <TouchableOpacity
            style={{
              ...styles.buttonContinue,
              backgroundColor: colors.card,
            }}
            activeOpacity={0.8}
            onPress={() => {
              handleButton();
            }}>
            <Text style={styles.buttonText}>
              {progress === 0 ? 'Finalizar' : 'Continuar'}
            </Text>

            <Icon
              name="arrow-right"
              color="white"
              size={24}
              style={styles.icon}
            />
          </TouchableOpacity>
        )} */}
        {status !== 'authenticated' && progress === 1 && (
          <View
            style={{
              flex: 3,
              height: height * 0.7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <NoPropsInvited />
          </View>
        )}
        <View style={{height: 80}} />
      </ScrollView>
      <ModalComponent
        title={title}
        body={body}
        openModal={openModal}
        isLoading={isLoading}
        setOpenModal={setOpenModal}
        onConfirmModal={confirmModal}
      />
      {addCarLoading && (
        <View style={styles.loadingContainer}>
          <ScreenLoading size={32} text="" />
        </View>
      )}
      <Modalize ref={modalizeRef}>
        <ShopSuccess pressNavigate={pressNavigate} />
      </Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFB0A5',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#FFB0A5',
    height: height * 0.15,
    overflow: 'hidden',
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titleList: {
    color: 'white',
    /* marginTop: 10, */
    fontSize: 40,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  headerTitle: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  loadingContainer: {
    zIndex: 9999999,
    position: 'absolute',
    flex: 1,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: '100%',
    width: '100%',
  },

  button: {
    marginLeft: 10,
    padding: 6,
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: 10,
    zIndex: 999999999,
    left: 10,
  },
  buttonContinue: {
    marginBottom: Platform.OS === 'ios' ? 110 : 80,
    flexDirection: 'row',
    marginTop: 1,
    padding: 10,
    paddingHorizontal: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
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
  icon: {position: 'absolute', right: 14, top: 10},
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'lightskyblue',
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
  buttonTextScroll: {
    fontSize: 28 /* 
    fontFamily: 'Gill Sans', */,
    textAlign: 'center',
    margin: 10,
    color: '#000',
    backgroundColor: 'transparent',
  },
});
