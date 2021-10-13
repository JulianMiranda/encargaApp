import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ShopContext} from '../context/shop/ShopContext';
import {Subcategory} from '../interfaces/Subcategory.interface';
import {formatToCurrency} from '../utils/formatToCurrency';
import {FadeInImage} from './FadeInImage';
import {ModalComponent} from './Modal';

type Root = 'Shop' | 'Subca';

interface Props {
  item: Subcategory;
  root: Root;
  edit: boolean;
}
export const SingleSubcategory = ({item, root, edit}: Props) => {
  const {car, setItem, unsetItem} = useContext(ShopContext);
  const [cantidad, setCantidad] = useState('1');
  const [buttonName, setButtonName] = useState('Add');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {    
    edit ?   setButtonName('Edit') : setButtonName('Add');
    car.map(({subcategory, cantidad}) => {
      if (subcategory.id === item.id) {        
        setCantidad(cantidad.toString());
       } 
    });
  }, [car]);
  useEffect(() => {
    if (parseInt(cantidad) < 1) setCantidad('1');
  }, [cantidad]);
  const setCarItem = () => {
    if (parseInt(cantidad) < 1) {
      setCantidad('1');
      console.log('Sacar aviso mayor q cero');
    } else {
      setItem({subcategory: item, cantidad: parseInt(cantidad)});
    }
  };

  
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setIsVisible(true)}>
        <FadeInImage uri={item.images[0].url} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity style={{flex: 6, marginHorizontal: 5}} activeOpacity={0.8} onPress={() => setIsVisible(true)}>

        <Text style={{...styles.name, fontSize: 16}}>{item.name}</Text>
     
      </TouchableOpacity>
      <View style={{flex: 3, alignItems: 'center'}}>
        <Text style={{...styles.name, fontSize: (parseInt(cantidad) > 5) ? 10 : 14, color: (parseInt(cantidad) > 5) ? 'gray' : 'black'}}>
          {formatToCurrency(item.price)}
        </Text>
        <Text style={{...styles.name, fontSize: (parseInt(cantidad) > 5) ? 14 : 10,color: (parseInt(cantidad) > 5) ? 'black' : 'gray'}}>
          {formatToCurrency(item.priceGalore)}
        </Text>
      </View>
      <View style={{flex: 3, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            if (root === 'Shop')
              setItem({subcategory: item, cantidad: parseInt(cantidad) - 1});
            cantidad !== '1' &&
              setCantidad((parseInt(cantidad) - 1).toString());
          }}>
          <Text style={{fontSize: 22, color: 'red'}}>
            {cantidad !== '1' ? '-' : ' '}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={{
            color: buttonName === 'Añadir' ? '#CACACA' : 'black',
            flex: 1,
            paddingHorizontal: 5,
            textAlign: 'center',
          }}          
          keyboardType="numeric"
          value={cantidad}
          onChangeText={value => {
            if (root === 'Shop')
              setItem({subcategory: item, cantidad: parseInt(value)});
            setCantidad(value);
          }}
        />
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            if (root === 'Shop')
              setItem({subcategory: item, cantidad: parseInt(cantidad) + 1});
            setCantidad((parseInt(cantidad) + 1).toString());
          }}>
          <Text style={{fontSize: 22, color: 'green'}}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 3}}>
        {root === 'Shop' ? (
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => unsetItem(item)}>
            <Text style={{color: 'red'}}>Quitar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={setCarItem}>
            <Icon
              style={{
                textAlign: 'center',
                color: buttonName === 'Add' ? '#22ad29' : '#E7E35E',
              }}
              name={buttonName === 'Add' ? 'shopping-basket' : 'edit'}
              size={18}
            />
          </TouchableOpacity>
        )}
      </View>
      <ModalComponent
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        images={item.images}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    marginLeft: 5
  },
  name: {
    fontFamily: 'NovaSlim-Regular',
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 3,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 13,
  },
});
