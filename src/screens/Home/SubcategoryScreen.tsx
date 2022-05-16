import React, {useState, useContext, useEffect} from 'react';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ShopContext} from '../../context/shop/ShopContext';
import {RootStackParams} from '../../navigation/HomeStack';
import {ModalImages} from '../../components/ModalImages';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {Slider} from '../../components/Slider';
import {loginStyles} from '../../styles/loginTheme';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {SetItemCar} from '../../components/SetItemCar';
import {AviableSize, Subcategory} from '../../interfaces/Subcategory.interface';
import {DescriptionSubcategory} from '../../components/DescriptionSubcategory';
import {AviableSizesSubcategory} from '../../components/AviableSizesSubcategory';
import {useToast} from 'react-native-toast-notifications';
import ScreenLoading from '../../components/LoadingSafe';
import {BackButton} from '../../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {AviablesColors} from '../../components/AviablesColors';
import {PricesView} from '../../components/PricesView';

interface Props
  extends StackScreenProps<RootStackParams, 'SubcategoryScreen'> {}

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'SubcategoryScreen'> {}

export const SubcategoryScreen = (props: Props) => {
  const {route, navigation} = props;
  const {subcategory} = route.params;
  const {
    name,
    images,
    price,
    priceGalore,
    priceGaloreDiscount,
    priceDiscount,
    updatedAt,
    description,
    aviableSizes,
    aviableColors,
    weight,
  } = subcategory;
  const {errorAddCar, clearErrorAdd, addCarLoading, setItem} =
    useContext(ShopContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  /* const priceDiscount = undefined; */
  const [isVisible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(images[0]);
  const [cantidad, setCantidad] = useState(1);
  const [sizeSelected, setSizeSelected] = useState<AviableSize>();
  const [colorSelected, setColorSelected] = useState<string[]>([]);

  const toast = useToast();
  const fechaInicio = new Date(updatedAt).getTime();
  const fechaFin = new Date().getTime();
  const diff = fechaFin - fechaInicio;
  const days = diff / (1000 * 60 * 60 * 24);

  useEffect(() => {
    if (errorAddCar) {
      toast.show(errorAddCar, {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        style: {width: '100%', justifyContent: 'center', marginTop: 30},
        textStyle: {fontSize: 16},
        animationType: 'slide-in',
      });
      clearErrorAdd();
    }
  }, [clearErrorAdd, errorAddCar, toast]);

  useEffect(() => {
    if (aviableSizes && aviableSizes.length > 0) {
      setSizeSelected(aviableSizes[0]);
    }
  }, []);

  /* useEffect(() => {
    if (cantidad === 5 && priceGalore !== price) {
      toast.show('Puedes añadir 1 más y obtener precio de por mayor', {
        type: 'normal',
        placement: 'top',
        duration: 3000,
        style: {width: '100%', justifyContent: 'center', marginTop: 30},
        textStyle: {fontSize: 16},
        animationType: 'slide-in',
      });
    }
  }, [cantidad, price, priceGalore, toast]); */

  const updateCantidad = (subcategoryRef: Subcategory, cantidadRef: number) => {
    if (cantidadRef > 0) {
      setCantidad(cantidadRef);
    }
  };
  const handleButton = () => {
    if (
      aviableSizes &&
      aviableSizes.length > 0 &&
      aviableSizes[0].talla !== 'Talla Única' &&
      sizeSelected === undefined
    ) {
      toast.show('Seleccione al menos una Talla', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        style: {width: '100%', justifyContent: 'center', marginTop: 30},
        textStyle: {fontSize: 16},
        animationType: 'slide-in',
      });
      console.log('seleccione un Tamaño');
    } else if (
      aviableColors &&
      aviableColors.length > 0 &&
      colorSelected.length === 0
    ) {
      toast.show('Seleccione al menos un Color', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        style: {width: '100%', justifyContent: 'center', marginTop: 30},
        textStyle: {fontSize: 16},
        animationType: 'slide-in',
      });
      console.log('seleccione un color');
    } else {
      console.log('añadir');

      const subcategoryUpd = {...subcategory};

      if (sizeSelected) {
        subcategoryUpd.weight = sizeSelected.peso;
      }
      if (colorSelected.length > 0) {
        subcategoryUpd.aviableColors = colorSelected;
      }
      setItem({subcategory: subcategoryUpd, cantidad});
    }
  };

  return (
    <>
      <BackButton navigation={navigation} />
      <ScrollView>
        <Slider
          images={images}
          setIsVisible={setIsVisible}
          setImageIndex={setImageIndex}
        />
        {days < 24 && (
          <Image
            source={require('../../assets/nuevo_producto3.png')}
            style={styles.newImageProduct}
          />
        )}
        <View style={styles.textContainer}>
          <View style={{padding: 5}}>
            <View style={styles.row}>
              <Text style={styles.name}>{name}</Text>
              <SetItemCar
                subcategory={subcategory}
                cantidad={cantidad}
                updateCantidad={updateCantidad}
              />
            </View>
            <PricesView
              price={price}
              priceGalore={priceGalore}
              priceGaloreDiscount={priceGaloreDiscount}
              priceDiscount={priceDiscount}
              sizeSelected={sizeSelected}
              weight={weight}
            />
          </View>
          {/* <View style={styles.divider} /> */}

          <AviableSizesSubcategory
            aviableSizes={
              aviableSizes && aviableSizes.length > 0 ? aviableSizes : []
            }
            sizeSelected={sizeSelected}
            setSizeSelected={setSizeSelected}
          />
        </View>
        <AviablesColors
          aviableColors={
            aviableColors && aviableColors.length > 0 ? aviableColors : []
          }
          cantidad={cantidad}
          colorSelected={colorSelected}
          setColorSelected={setColorSelected}
        />
        <DescriptionSubcategory description={description} />
        <ModalImages
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          images={[
            imageIndex,
            ...images.filter(image => image.id !== imageIndex.id),
          ]}
        />
      </ScrollView>
      <TouchableOpacity
        style={{
          ...loginStyles.button,
          backgroundColor: colors.card,
        }}
        activeOpacity={0.8}
        onPress={handleButton}>
        <View>
          <View
            style={{
              borderColor: colors.card,
              ...styles.button,
            }}>
            <Text style={{color: colors.card}}>{cantidad}</Text>
          </View>

          <Text style={loginStyles.textButton}>Añadir</Text>
        </View>
      </TouchableOpacity>
      {addCarLoading && (
        <View style={styles.loadingContainer}>
          <ScreenLoading size={32} text="" />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  newImageProduct: {
    position: 'absolute',
    top: 350,
    alignSelf: 'flex-start',
    marginLeft: 5,
    height: 75,
    width: 75,
  },
  textContainer: {
    marginTop: 10,
  },

  name: {
    maxWidth: '70%',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  divider: {backgroundColor: '#FAFAFA', height: 12},
  loadingContainer: {
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
    position: 'absolute',
    right: -25,
    backgroundColor: 'white',
    borderRadius: 100,
    height: 27,
    borderWidth: 1,
    width: 27,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

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
