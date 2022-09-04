import React, {useEffect, useState, useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import api from '../api/api';
import {AuthContext} from '../context/auth/AuthContext';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {
  SubcategoryResp,
  Subcategory,
} from '../interfaces/Subcategory.interface';
import {FadeInImage} from './FadeInImage';

interface Props {
  searchQuery: string;
  onSearch: (reuseSearch: any) => Promise<void>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}
export const SuggestionsSearch = ({
  searchQuery,
  onSearch,
  setSearchQuery,
}: Props) => {
  const {status} = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState<Subcategory[]>([]);

  const deboncedValue = useDebouncedValue(searchQuery);

  useEffect(() => {
    searchSuggestions(deboncedValue);
  }, [deboncedValue]);

  const searchSuggestions = async (search: string) => {
    const body = {
      filter: {status: ['=', true]},
      docsPerPage: 5,
      sort: 'desc',
      search: {text: search, fields: ['name']},
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
    if (status === 'authenticated') {
      api
        .post<SubcategoryResp>('/subcategories/getList', body)
        .then(response => {
          setSuggestions(response.data.data.map(item => item));
        });
    } else {
      api
        .post<SubcategoryResp>('/subcategories/getListUnAuth', body)
        .then(response => {
          setSuggestions(response.data.data.map(item => item));
        });
    }
  };
  return (
    <View style={{marginTop: 20, marginLeft: 5}}>
      {suggestions.length > 0 && (
        <Text style={{fontWeight: 'bold'}}>Sugerencias</Text>
      )}
      {suggestions.map((item, index) => (
        <View key={index} style={{}}>
          <TouchableOpacity
            style={{
              paddingVertical: 3,
              marginVertical: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              setSearchQuery(item.name);
              onSearch(item.name);
            }}>
            <FadeInImage
              uri={item.images[0].url}
              style={{height: 50, width: 50, borderRadius: 8}}
            />
            <Text style={{marginHorizontal: 20, fontSize: 16}}>
              {item.name}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#f1f1f1',
            }}
          />
        </View>
      ))}
    </View>
  );
};
