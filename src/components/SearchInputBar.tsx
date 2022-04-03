import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {
  AnimatedIcon,
  arrowAnimation,
  inputAnimation,
  inputAnimationWidth,
  animatedTransition,
} from './SearchAnimation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {updateSearchHistory} from '../utils/searchHistory';
import {SearchBody} from './SearchBody';

interface Props {
  setOpenHeader: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchInputBar = ({setOpenHeader}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openInput, setOpenInput] = useState(false);
  const [findResults, setFindResults] = useState(false);
  const [findResultsQuery, setFindResultsQuery] = useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);

  useEffect(() => {
    setOpenHeader(!openInput);
    if (openInput) {
      openSearch();
    }
  }, [openInput, setOpenHeader]);

  const openSearch = () => {
    animatedTransition.start();
  };

  const closeSearch = () => {
    animatedTransition.reset();
    setOpenInput(false);
    setFindResults(false);
    Keyboard.dismiss();
  };

  const onSearch = async (reuseSearch: any) => {
    const isReuse = typeof reuseSearch === 'string';
    Keyboard.dismiss();
    !isReuse && (await updateSearchHistory(searchQuery));
    if (isReuse) {
      await updateSearchHistory(reuseSearch);
      setSearchQuery(reuseSearch);
    }
    setFindResultsQuery(isReuse ? reuseSearch : searchQuery);
    setFindResults(true);
  };

  return (
    <>
      {openInput ? (
        <View style={styles.container}>
          <View style={styles.containerInput}>
            <AnimatedIcon
              name="arrow-left"
              size={20}
              style={[styles.backArrow, arrowAnimation]}
              onPress={closeSearch}
            />
            <Animated.View
              style={[inputAnimation, {width: inputAnimationWidth}]}>
              <Searchbar
                placeholder="Busca tu producto"
                onChangeText={onChangeSearch}
                value={searchQuery}
                autoFocus
                /*  onFocus={openSearch} */
                onSubmitEditing={onSearch}
              />
            </Animated.View>
          </View>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              position: 'absolute',
              top: 68,
              backgroundColor: 'red',
            }}>
            <SearchBody
              openBody={openInput}
              findResults={findResults}
              findResultsQuery={findResultsQuery}
              searchQuery={searchQuery}
              onSearch={onSearch}
              setSearchQuery={setSearchQuery}
            />
          </View>
        </View>
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              position: 'absolute',
              zIndex: 100000000,
              right: 10,
              top: 40,
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setOpenInput(true)}>
            <Icon name="search" size={26} color="#fb2331" />
          </TouchableOpacity>
        </>
      )}
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
});
