import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AviableSize} from '../interfaces/Subcategory.interface';
interface Props {
  aviableSizes: AviableSize[];
  sizeSelected: any;
  setSizeSelected: any;
}
export const AviableSizesSubcategory = ({
  aviableSizes,
  sizeSelected,
  setSizeSelected,
}: Props) => {
  if (!aviableSizes || aviableSizes.length === 0) {
    return null; /* (
      <>
        <View style={styles.container}>
          <View style={styles.wrapContainer}>
            <Text>Talla única</Text>
          </View>
        </View>
        <View style={styles.divider} />
      </>
    ); */
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Tallas</Text>
        <View style={styles.wrapContainer}>
          {aviableSizes.map((item, index) => (
            <View key={index}>
              {item.talla === 'Talla Única' ? (
                <View
                  style={{...styles.textBox, width: 100, borderColor: 'black'}}>
                  <Text>Talla Única</Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => setSizeSelected(item)}
                  style={{
                    ...styles.textBox,
                    borderColor: sizeSelected !== item ? '#F3F3F3' : 'black',
                  }}>
                  <Text>{item.talla}</Text>
                </TouchableOpacity>
              )}
            </View>
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
