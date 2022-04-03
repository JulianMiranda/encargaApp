import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {getSearchHistory} from '../utils/searchHistory';

export default function SearchHistory(props: any) {
  const {showHistory, containerHeight, onSearch} = props;
  const [history, setHistory] = useState<any>([]);
  useEffect(() => {
    if (showHistory) {
      (async () => {
        const response = await getSearchHistory();
        setHistory(response);
      })();
    }
  }, [showHistory]);
  return (
    <View
      style={[
        showHistory ? styles.history : styles.hidden,
        {top: containerHeight},
      ]}>
      {history &&
        history.map((item: any, index: any) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => onSearch(item.search)}>
            <View style={styles.historyItem}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <AwesomeIcon name="history" size={16} color={'#53005f'} />
                <Text style={styles.text}>{item.search}</Text>
              </View>
              <AwesomeIcon name="arrow-right" size={16} />
            </View>
          </TouchableWithoutFeedback>
        ))}
    </View>
  );
}

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
    marginLeft: 5,
  },
});
