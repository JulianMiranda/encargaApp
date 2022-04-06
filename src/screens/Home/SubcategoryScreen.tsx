import React, {useState, useContext} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ShopContext} from '../../context/shop/ShopContext';
import {RootStackParams} from '../../navigation/HomeStack';
import {ModalImages} from '../../components/ModalImages';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {Slider} from '../../components/Slider';
import {loginStyles} from '../../styles/loginTheme';
import {ThemeContext} from '../../context/theme/ThemeContext';

interface Props
  extends StackScreenProps<RootStackParams, 'SubcategoryScreen'> {}

export const SubcategoryScreen = (props: Props) => {
  const {route} = props;
  const {subcategory} = route.params;
  const {name, images, price, priceGalore, updatedAt, weight} = subcategory;
  const {setItem} = useContext(ShopContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(images[0]);

  const fechaInicio = new Date(updatedAt).getTime();
  const fechaFin = new Date().getTime();
  const diff = fechaFin - fechaInicio;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const days = diff / (1000 * 60 * 60 * 24);

  return (
    <>
      <ScrollView>
        <Slider
          images={images}
          setIsVisible={setIsVisible}
          setImageIndex={setImageIndex}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>{formatToCurrency(price)}</Text>
          <View style={styles.rowText}>
            <Text style={styles.priceGalore}>
              Precio por la compra de 6 o más:{' '}
            </Text>
            <Text style={styles.priceGaloreMoney}>
              {formatToCurrency(priceGalore)}
            </Text>
          </View>
          {/* <Text style={styles.stock}>Quedan: {stock}</Text> */}
          <Text style={styles.aviableSizes}>Tallas disponibles:</Text>
          <Text style={styles.aviableSizes}>Peso en gramos: {weight}g</Text>
          {/* <View style={styles.sizesContainer}>
            {aviableSizes.map((size, index) => (
              <View style={styles.sizeTextContainer} key={index}>
                <Text style={styles.sizeText}>{size}</Text>
              </View>
            ))}
          </View> */}
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
        onPress={() => setItem({subcategory, cantidad: 1})}>
        <Text style={loginStyles.textButton}>Añadir al carrito</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  textContainer: {
    margin: 10,
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
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#56BF57',
  },
  priceGalore: {
    fontSize: 18,
  },
  priceGaloreMoney: {fontSize: 18, color: '#56BF57'},
  rowText: {
    flexDirection: 'row',
    width: '100%',
  },
  stock: {fontSize: 18},
  aviableSizes: {fontSize: 18},
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
});
