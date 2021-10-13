import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core';
import { Dimensions, FlatList, Image, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../../api/api';
import { FadeInImage } from '../../components/FadeInImage';
import { SingleSubcategory } from '../../components/SingleSubcategory';
import { ShopContext } from '../../context/shop/ShopContext';
import { Subcategory, SubcategoryResp } from '../../interfaces/Subcategory.interface';
import { SearchInput } from '../../components/SearchInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
    const { top } = useSafeAreaInsets();
    const [products, setProducts] = useState<Subcategory[]>([]);
    const navigation = useNavigation();
    const [ term, setTerm ] = useState('')

    const {car} = useContext(ShopContext);
    const idsIncludes=[''];
    car.map(({subcategory}) => {
      idsIncludes.push(subcategory.id)
    });
   
    useEffect(() => {
        if ( term.length === 0 ) {
            return setProducts([]);
        }
        if (term) {
            const body = {      
                
                docsPerPage:  10,
                sort: "desc",
                search: {text: term, fields: ["name"]},
                population: [
                  {
                    path: 'category',
                    filter: {status: true},
                    fields: {
                      name: true,
                    },
                  },
                  {
                    path: 'images',
                    filter: {status: true},
                    fields: {
                      url: true,
                    },
                  },
                ],
              };
            
         api.post<SubcategoryResp>('/subcategories/getList',body)
            
            .then((response) => {
                setProducts(response.data.data);
            });
        }
      }, [term]);

      
    return (

        <>
        
        <TouchableOpacity
      onPress={() => navigation.goBack()}
      activeOpacity={0.8}
      style={{
  
          position: 'absolute',
          zIndex: 999999999,
          left: 5,
      
          top: ( Platform.OS === 'ios' ) ? top : top + 30
      }}>
      <Icon name="arrow-back-outline" color="red" size={35} />
    </TouchableOpacity>


        <View style={{ 
            flex: 1, 
            marginHorizontal: 20,
        }}>
          {term.length !== 0 && products.length === 0 && 
          (<View>
          <Text>No rusults</Text></View>)}
             <SearchInput
                onDebounce={ (value) => setTerm( value )  }
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 70,
                    left: 20,
                    top: ( Platform.OS === 'ios' ) ? top : top + 30
                }}
            />
        <FlatList
        ListHeaderComponent={(
            <Text style={{
                paddingBottom: 10,
                marginTop: ( Platform.OS === 'ios' ) ? top + 60 : top + 80
            }}>{ term }</Text>
        )}

          data={products}
          renderItem={(product) => (<>
          <SingleSubcategory  item={product.item} root={'Subca'} edit={idsIncludes.includes(product.item.id)} /></>
       
          )}
          keyExtractor={(item, index) => index.toString()}
        />
     
   </View>
   </>
    )
}
