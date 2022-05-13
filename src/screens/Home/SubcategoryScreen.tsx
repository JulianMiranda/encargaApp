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
    priceDiscount,
    priceGaloreDiscount,
    updatedAt,
    description,
    aviableSizes,
    aviableColors,
    weight,
  } = subcategory;
  console.log(
    name,
    images,
    price,
    priceGalore,
    priceDiscount,
    priceGaloreDiscount,
  );
  const {errorAddCar, clearErrorAdd, addCarLoading, setItem} =
    useContext(ShopContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
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
  }, [cantidad, price, priceGalore, toast]);

  const updateCantidad = (subcategoryRef: Subcategory, cantidadRef: number) => {
    if (cantidadRef > 0) {
      setCantidad(cantidadRef);
    }
  };
  const handleButton = () => {
    const subcategoryUpd = {...subcategory};

    if (sizeSelected) {
      subcategoryUpd.weight = sizeSelected.peso;
    }
    if (colorSelected.length > 0) {
      subcategoryUpd.aviableColors = colorSelected;
    }
    console.log('subcategoryUpd', subcategoryUpd);
    setItem({subcategory: subcategoryUpd, cantidad});
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
            <View style={styles.rowView}>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.price,

                  fontSize: priceDiscount !== 0 ? 18 : 26,

                  textDecorationLine:
                    priceDiscount !== 0 ? 'line-through' : 'none',
                  color: priceDiscount !== 0 ? '#c0c0c0' : colors.primary,
                  /* 
                  textDecorationColor: priceDiscount !== 0 ? 'red' : 'blue',
                  textDecorationStyle:
                    priceDiscount !== 0 ? 'dotted' : 'double', */
                }}>
                {formatToCurrency(priceGalore)}
              </Text>
              {priceDiscount !== 0 && (
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    marginLeft: 10,
                    ...styles.price,
                    color: colors.primary,
                  }}>
                  {formatToCurrency(priceDiscount)}
                </Text>
              )}
            </View>

            {priceGalore !== price && (
              <View style={styles.viewGalorePrice}>
                <Text style={{}}>Precio por mayor</Text>
              </View>
            )}
            <View style={styles.rowView}>
              {priceGalore !== price && (
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    ...styles.price,
                    fontSize: 18,
                    marginTop: 15,
                    color: priceGaloreDiscount !== 0 ? '#c0c0c0' : 'black',
                    textDecorationLine:
                      priceGaloreDiscount !== 0 ? 'line-through' : 'none',
                  }}>
                  {formatToCurrency(price)}
                </Text>
              )}
              {priceGaloreDiscount !== 0 && (
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    ...styles.price,
                    color: 'black',
                    fontSize: 18,
                    marginTop: 15,
                    marginLeft: 10,
                  }}>
                  {formatToCurrency(priceGaloreDiscount)}
                </Text>
              )}
            </View>

            {priceGalore !== price && (
              <View style={styles.viewUnitPrice}>
                <Text style={{}}>Precio por unidad</Text>
              </View>
            )}
            <View style={styles.viewWeight}>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.aviableSizes,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                Peso
              </Text>
              <Text style={{...styles.aviableSizes, alignSelf: 'center'}}>
                <Text style={styles.gramos}>
                  {sizeSelected ? sizeSelected.peso : weight} gramos
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.divider} />

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
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  priceGalore: {
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aviableSizes: {fontSize: 18},
  gramos: {fontSize: 16},
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
  rowView: {flexDirection: 'row', alignItems: 'center'},
  viewGalorePrice: {
    backgroundColor: '#fafafa',
    padding: 3,
  },
  viewUnitPrice: {
    backgroundColor: '#fafafa',
    padding: 3,
    marginBottom: 15,
  },
  viewWeight: {position: 'absolute', right: 30, top: 118},
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
