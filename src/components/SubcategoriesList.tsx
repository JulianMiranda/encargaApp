import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {ShopContext} from '../context/shop/ShopContext';
import {Subcategory} from '../interfaces/Subcategory.interface';
import {HeaderTable} from './HeaderTable';
import {SingleSubcategory} from './SingleSubcategory';

interface Props {
  subcategories: Subcategory[];
}

export const SubcategoriesList = ({subcategories}: Props) => {
  const {car, setItem} = useContext(ShopContext);
  return (
    <View
      style={{
        alignItems: 'flex-start',
        marginTop: 50,
        marginLeft: 10,
        marginBottom: 70,
      }}>
     
      <HeaderTable editHeader={'Añadir'} />

      {subcategories.map((item, index) => (
        <SingleSubcategory key={index.toString()} item={item} root={'Subca'} />
      ))}
    </View>
  );
};
