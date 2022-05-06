import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
interface Props {
  aviableSizes: string[];
  sizeSelected: any;
  setSizeSelected: any;
}
export const AviableSizesSubcategory = ({
  aviableSizes,
  sizeSelected,
  setSizeSelected,
}: Props) => {
  useEffect(() => {
    if (aviableSizes && aviableSizes.length > 0) {
      setSizeSelected(aviableSizes[0]);
    }
  }, []);
  if (!aviableSizes || aviableSizes.length === 0) {
    return null;
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Tallas</Text>
        <View style={styles.wrapContainer}>
          {aviableSizes.map((item, index) => (
            <TouchableOpacity
              onPress={() => setSizeSelected(item)}
              key={index}
              style={{
                ...styles.textBox,
                borderColor: sizeSelected !== item ? '#F3F3F3' : 'black',
              }}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginHorizontal: 10,
    borderRadius: 2,
  },
  title: {fontSize: 20, marginBottom: 10},
  wrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textBox: {
    marginRight: 15,
    padding: 5,
    borderRadius: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F3F3F3',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    marginBottom: 5,
  },
  divider: {backgroundColor: '#FAFAFA', height: 12},
});
