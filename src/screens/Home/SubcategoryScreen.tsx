import React, {useState, useContext, useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
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
import {Subcategory} from '../../interfaces/Subcategory.interface';
import {DescriptionSubcategory} from '../../components/DescriptionSubcategory';
import {AviableSizesSubcategory} from '../../components/AviableSizesSubcategory';
import {useToast} from 'react-native-toast-notifications';
import ScreenLoading from '../../components/LoadingSafe';

interface Props
  extends StackScreenProps<RootStackParams, 'SubcategoryScreen'> {}

export const SubcategoryScreen = (props: Props) => {
  const {route} = props;
  const {subcategory} = route.params;
  const {
    name,
    images,
    price,
    priceGalore,
    updatedAt,
    description,
    aviableSizes,
    weight,
  } = subcategory;
  const {errorAddCar, clearErrorAdd, addCarLoading, setItem} =
    useContext(ShopContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(images[0]);
  const [cantidad, setCantidad] = useState(1);

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
  console.log(description);

  return (
    <>
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
            <Text style={styles.aviableSizes}>
              Peso: <Text style={styles.gramos}>{weight} gramos</Text>
            </Text>
            <Text style={styles.price}>US {formatToCurrency(price)}</Text>
            {priceGalore !== price && (
              <View style={styles.rowText}>
                <Text style={styles.priceGalore}>
                  Aprovecha el descuento por la compra de 5 paquetes o más:{' '}
                </Text>
                <Text style={styles.textLineThrough}>
                  {formatToCurrency(price)}
                </Text>
                <Text style={styles.priceGaloreMoney}>
                  {formatToCurrency(priceGalore)}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.divider} />
          <DescriptionSubcategory description={description} />

          <AviableSizesSubcategory aviableSizes={aviableSizes} />
        </View>
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
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...loginStyles.button,
          padding: 5,
          backgroundColor: colors.card,
          marginBottom: 75,
        }}
        activeOpacity={0.8}
        onPress={() => setItem({subcategory, cantidad})}>
        <Text style={loginStyles.textButton}>
          {cantidad > 1 && <Text>({cantidad})</Text>} Añadir al carrito
        </Text>
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
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: -50,
    height: 75,
    width: 75,
  },
  textContainer: {
    marginTop: 10,
  },
  newProduct: {
    position: 'absolute',
    zIndex: 999999999,
    height: 100,
    width: 100,
    marginRight: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  priceGalore: {
    fontSize: 18,
  },
  priceGaloreMoney: {fontSize: 22, color: '#56BF57', fontWeight: 'bold'},
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  rowText: {
    width: '100%',
  },
  stock: {fontSize: 18},
  aviableSizes: {fontSize: 18},
  gramos: {fontSize: 16},
  sizesContainer: {flexDirection: 'row'},
  sizeTextContainer: {
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  sizeText: {},
  divider: {backgroundColor: '#FAFAFA', height: 12},
  textLineThrough: {textDecorationLine: 'line-through', color: 'red'},
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
});
