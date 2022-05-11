import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import api from '../api/api';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {SubcategoryResp} from '../interfaces/Subcategory.interface';

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
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const deboncedValue = useDebouncedValue(searchQuery);

  useEffect(() => {
    searchSuggestions(deboncedValue);
  }, [deboncedValue]);

  const searchSuggestions = async (search: string) => {
    const body = {
      docsPerPage: 10,
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

    api.post<SubcategoryResp>('/subcategories/getList', body).then(response => {
      setSuggestions(response.data.data.map(item => item.name));
    });
  };
  return (
    <View style={{flexWrap: 'wrap', marginTop: 10}}>
      {suggestions.map((item, index) => (
        <TouchableOpacity
          style={{
            paddingVertical: 3,
            marginVertical: 1,
            backgroundColor: '#F7F7F7',
          }}
          key={index}
          onPress={() => {
            console.log('pressed');

            setSearchQuery(item);
            onSearch(item);
          }}>
          <Text style={{marginHorizontal: 20, fontSize: 16}}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
