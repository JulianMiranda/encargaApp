import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AviableSize} from '../interfaces/Subcategory.interface';
interface Props {
  aviableSizes: AviableSize[];
  sizeSelected: AviableSize[];
  setSizeSelected: (action: AviableSize[]) => void;
  cantidad: number;
}
export const AviableSizesSubcategory = ({
  aviableSizes,
  sizeSelected,
  setSizeSelected,
  cantidad,
}: Props) => {
  useEffect(() => {
    if (cantidad === 6 && aviableSizes && aviableSizes.length > 0) {
      return setSizeSelected(aviableSizes);
    }
  }, [aviableSizes, cantidad, setSizeSelected]);

  if (!aviableSizes || aviableSizes.length === 0) {
    return null;
  }

  const handleSizeSelected = (size: AviableSize) => {
    if (cantidad > 5) {
      return;
    }
    if (cantidad <= sizeSelected.length) {
      sizeSelected.shift();
      setSizeSelected([...sizeSelected, size]);
    } else {
      if (!sizeSelected.includes(size)) {
        setSizeSelected([...sizeSelected, size]);
      } else {
        setSizeSelected(sizeSelected.filter(item => item !== size));
      }
    }
  };

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
                  onPress={() => handleSizeSelected(item)}
                  style={{
                    ...styles.textBox,
                    borderColor: !sizeSelected.includes(item)
                      ? '#F3F3F3'
                      : 'black',
                    /* borderColor: sizeSelected.talla !== item.talla  */
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
  divider: {
    height: 1,
    width: '99%',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
});
