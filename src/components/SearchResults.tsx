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
      console.log(response, 'response');
      setProducts(response);
    })();
  }, [search]);

  const searchProductsApi = async (searchWord: string) => {
    const body = {
      docsPerPage: 22,
      sort: {name: 'asc'},
      search: {text: searchWord.trim(), fields: ['name']},
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
    console.log('body', body);

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
            marginTop: 250,
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/perch.png')}
            style={{
              height: 80,
              width: 120,
            }}
          />
          <Text>
            <Text style={{fontWeight: 'bold'}}>"{search}"</Text> No coincide con
            ningún producto
          </Text>
        </View>
      ) : (
        <View style={{margin: 5}}>
          <FlatList
            data={products}
            scrollEventThrottle={16}
            keyExtractor={(subcategory, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            numColumns={2}
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
            ListFooterComponent={
              <>
                <View style={{height: 150}} />
              </>
            }
          />
        </View>
      )}
    </>
  );
};
