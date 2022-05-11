import React, {useEffect, useState} from 'react';
import {Image, View, Text, ActivityIndicator, FlatList} from 'react-native';
import api from '../api/api';
import {SubcategoryResp} from '../interfaces/Subcategory.interface';
import {SubcategoryCard} from './SubcategoryCard';

interface Props {
  search: string;
}

export const SearchResults = ({search}: Props) => {
  const [products, setProducts] = useState<any>(null);

  useEffect(() => {
    (async () => {
      console.log('search', search);

      setProducts(null);
      const response = await searchProductsApi(search);
      setProducts(response);
    })();
  }, [search]);

  const searchProductsApi = async (searchWord: string) => {
    const body = {
      docsPerPage: 10,
      sort: 'desc',
      search: {text: searchWord, fields: ['name']},
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

    api
      .post<SubcategoryResp>('/subcategories/getList', body)

      .then(response => {
        setProducts(response.data.data);
      })
      .catch(() => setProducts(null));
  };

  if (!search) {
    return null;
  }
  return (
    <>
      {!products ? (
        <View
          style={{justifyContent: 'center', alignContent: 'center', flex: 1}}>
          <ActivityIndicator color={'black'} size={26} />
        </View>
      ) : products.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No se encontraron resultados para: "{search}"</Text>
          <Image
            source={require('../assets/buscador.jpg')}
            style={{
              height: 250,
              width: 250,
              borderRadius: 100,
            }}
          />
        </View>
      ) : (
        <View style={{margin: 5}}>
          <FlatList
            data={products}
            keyExtractor={(subcategory, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            // Header
            ListHeaderComponent={
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  marginBottom: 10,
                  paddingBottom: 10,
                }}
              />
            }
            renderItem={({item}) => <SubcategoryCard item={item} />}
            // infinite scroll
            onEndReachedThreshold={0.4}
            ListFooterComponent={
              <>
                <View style={{height: 80}} />
              </>
            }
          />
        </View>
      )}
    </>
  );
};
