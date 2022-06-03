import React, {useRef, useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
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

const {width} = Dimensions.get('window');
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
  const {prices} = useContext(AuthContext);
  const {top} = useSafeAreaInsets();
  const toast = useToast();
  const navigation = useNavigation();
  const modalizeRef = useRef<Modalize>(null);
  const [selectedCarnet, setSelectedCarnet] = useState<string[]>([]);
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

  const handleButton = async () => {
    if (progress === 2) {
      const paquete = 1440 + (weigth - 1 - cantPaqOS.oneandhalfkgPrice * 1440);
      if (paquete < 1300) {
        toast.show('Completa el último paquete', {
          type: 'normal',
          placement: 'bottom',
          duration: 3000,
          style: {
            justifyContent: 'center',
            marginBottom: 150,
            borderRadius: 50,
            paddingHorizontal: 20,
            backgroundColor: 'rgba(0,0,0,0.8)',
          },
          textStyle: {fontSize: 16},
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

  return (
    <>
      <View
        style={{
          ...styles.headerContainer,
        }}>
        {progress === 2 && (
          <Text
            style={{
              ...styles.titleList,
            }}>
            Mi Compra
          </Text>
        )}
        {progress === 1 && (
          <Text
            style={{
              ...styles.titleList,
            }}>
            Factura{' '}
          </Text>
        )}
        {progress === 0 && (
          <Text
            style={{
              ...styles.titleList,
            }}>
            Datos
          </Text>
        )}
      </View>
      {progress < 2 && (
        <TouchableOpacity
          onPress={() => setProgress(progress + 1)}
          activeOpacity={0.8}
          style={{
            top: top + 20,
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
            zIndex: 999999999,
            left: 10,
          }}>
          <Icon name="arrow-back-outline" color={'black'} size={26} />
        </TouchableOpacity>
      )}

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
      <ScrollView
        style={{flex: 1}}

        /*  scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )} */
      >
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
    height: 130,
    overflow: 'hidden',
    zIndex: 999,
    alignItems: 'center',
  },
  titleList: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 50,
    fontSize: 40,
  },
  headerTitle: {
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
});
