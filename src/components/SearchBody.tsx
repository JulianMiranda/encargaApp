import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import api from '../api/api';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {SubcategoryResp} from '../interfaces/Subcategory.interface';
import SearchHistory from './SearchHistory';
import {SearchResults} from './SearchResults';

interface Props {
  openBody: boolean;
  findResults: boolean;
  findResultsQuery: string;
  searchQuery: string;
  onSearch: (reuseSearch: any) => Promise<void>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBody = ({
  openBody,
  findResults,
  findResultsQuery,
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
    <View style={[openBody ? styles.history : styles.hidden, {top: 0}]}>
      {findResults ? (
        <SearchResults search={findResultsQuery} />
      ) : (
        <>
          {searchQuery ? (
            <View style={{flexWrap: 'wrap'}}>
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
                  <Text style={{marginHorizontal: 20, fontSize: 16}}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <SearchHistory
              showHistory={true}
              containerHeight={0}
              onSearch={onSearch}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: 'none',
  },
  history: {
    position: 'absolute',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  historyItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 0.2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#53005f',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
