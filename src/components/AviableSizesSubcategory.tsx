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
    if (cantidad > 5 && aviableSizes && aviableSizes.length > 0) {
      return setSizeSelected(aviableSizes);
    }
  }, [aviableSizes, cantidad, setSizeSelected]);

  useEffect(() => {
    let newSizes = [];
    if (aviableSizes && aviableSizes.length > 0 && cantidad < 6) {
      for (let i = cantidad; i > 0; i--) {
        if (sizeSelected && sizeSelected.length > 0) {
          if (sizeSelected[i - 1]) {
            newSizes.push(sizeSelected[i - 1]);
          }
        }
      }

      if (newSizes.length > 0) setSizeSelected(newSizes);
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
      const newColorSelected = [...sizeSelected];
      newColorSelected.shift();
      setSizeSelected([...newColorSelected, size]);
    } else {
      if (!sizeSelected.includes(size)) {
        setSizeSelected([...sizeSelected, size]);
      } else {
        const newSizeSelected = sizeSelected.filter(item => item !== size);
        setSizeSelected(newSizeSelected);
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
