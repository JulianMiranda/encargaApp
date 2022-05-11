import React, {useEffect, useState} from 'react';
import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {SearchInputBar} from '../../components/SearchInputBar';
import {
  AnimatedIcon,
  animatedTransition,
  arrowAnimation,
  inputAnimation,
  inputAnimationWidth,
} from '../../components/SearchAnimation';
import {updateSearchHistory} from '../../utils/searchHistory';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SearchHistory from '../../components/SearchHistory';
import {SuggestionsSearch} from '../../components/SuggestionsSearch';
import {SearchResults} from '../../components/SearchResults';

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [findResultsQuery, setFindResultsQuery] = useState('');
  const {top} = useSafeAreaInsets();
  useEffect(() => {
    animatedTransition.start();
  }, []);
  const onChangeSearch = (query: string) => setSearchQuery(query);

  useEffect(() => {
    if (searchQuery === '') {
      setFindResultsQuery('');
      setShowResults(false);
    }
  }, [searchQuery]);

  const onSearch = async (reuseSearch: any) => {
    const isReuse = typeof reuseSearch === 'string';
    Keyboard.dismiss();
    !isReuse && (await updateSearchHistory(searchQuery));
    if (isReuse) {
      await updateSearchHistory(reuseSearch);
      setSearchQuery(reuseSearch);
    }
    setFindResultsQuery(isReuse ? reuseSearch : searchQuery);
    setShowResults(true);
  };

  return (
    <>
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: top + 15,
        }}>
        {/*   <AnimatedIcon
          name="arrow-left"
          size={20}
          style={[styles.backArrow, arrowAnimation]}
          onPress={() => {
            console.log('back');
          }}
        /> */}
        <Animated.View style={[inputAnimation, {width: inputAnimationWidth}]}>
          <Searchbar
            placeholder="Busca tu producto"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onSubmitEditing={onSearch}
            style={styles.textBackground}
          />
        </Animated.View>
      </View>
      {searchQuery !== '' && !showResults && (
        <SuggestionsSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={onSearch}
        />
      )}
      {searchQuery === '' && !showResults && (
        <SearchHistory
          showHistory={true}
          containerHeight={100}
          onSearch={onSearch}
        />
      )}
      <SearchResults search={findResultsQuery} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    top: 30,
    height: 68,
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30,
    zIndex: 1,
  },
  containerInput: {
    position: 'relative',
    alignItems: 'flex-end',
  },
  backArrow: {
    position: 'absolute',
    left: 0,
    top: 15,
    color: 'black',
    height: 30,
    width: 30,
  },
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 45,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
