import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core';
import { FlatList, Image, Text, TextInput, View } from 'react-native';
import api from '../../api/api';
import { FadeInImage } from '../../components/FadeInImage';
import { SingleSubcategory } from '../../components/SingleSubcategory';
import { ShopContext } from '../../context/shop/ShopContext';
import { Subcategory, SubcategoryResp } from '../../interfaces/Subcategory.interface';

export const SearchScreen = () => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Subcategory[]>([]);
    const navigation = useNavigation();

    const {car} = useContext(ShopContext);
    const idsIncludes=[''];
    car.map(({subcategory}) => {
      idsIncludes.push(subcategory.id)
    });
   
    useEffect(() => {
        if (search) {
            console.log(search);

            const body = {      
                
                docsPerPage:  10,
                sort: "desc",
                search: {text: search, fields: ["name"]},
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
      }, [search]);

      
    return (




        <View style={{marginTop: 50}}>
          <Text>Search</Text>
      <TextInput
      style={{alignSelf: "center", backgroundColor: '#fafafa',borderRadius: 8, padding:10, width: '70%'}}
        placeholder="Buscar producto"
        onChangeText={(e) => setSearch(e)}
        value={search}
        
      />
      {products.length === 0 ? (
        <NoFoundProducts />
      ) : (
        <FlatList
          data={products}
          renderItem={(product) => (<>
          <SingleSubcategory  item={product.item} root={'Subca'} edit={idsIncludes.includes(product.item.id)} /></>
       
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )} */
   /*  </View>
    )
}
function NoFoundProducts() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../assets/no-result-found.png")}
          resizeMode="cover"
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  }
  function Product(props: any) {
    const { product, navigation } = props;
    const { id, name, images } = product.item;

    return (
        <View style={{flexDirection: 'row', marginTop: 10}}>

         <FadeInImage uri={images[0].url} style={{height: 35, width:35, marginLeft: 5, borderRadius: 5}}/>
               <Text style={{marginLeft: 10}} >{name}</Text>
        </View>
       
    );
  }