import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  aviableColors: string[];
  colorSelected: string[];
  setColorSelected: any;
  cantidad: number;
}
export const AviablesColors = ({
  aviableColors,
  colorSelected,
  setColorSelected,
  cantidad,
}: Props) => {
  useEffect(() => {
    if (cantidad === 6) {
      return setColorSelected(aviableColors);
    }
  }, [aviableColors, cantidad, setColorSelected]);

  useEffect(() => {
    if (cantidad < colorSelected.length) {
      setColorSelected(colorSelected);
    }
  }, [cantidad, colorSelected, setColorSelected]);

  if (!aviableColors || aviableColors.length === 0) {
    return null;
  }

  const handleColorSelected = (color: string) => {
    if (cantidad > 5) {
      return;
    }
    if (cantidad <= colorSelected.length) {
      colorSelected.shift();
      setColorSelected([...colorSelected, color]);
    } else {
      if (!colorSelected.includes(color)) {
        setColorSelected([...colorSelected, color]);
      } else {
        setColorSelected(colorSelected.filter(item => item !== color));
      }
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Colores</Text>
        <View style={styles.wrapContainer}>
          {aviableColors.map((item, index) => (
            <TouchableOpacity
              onPress={() => handleColorSelected(item)}
              key={index}
              style={{
                ...styles.textBox,
                backgroundColor: item,
                borderColor: !colorSelected.includes(item) ? '#F3F3F3' : 'blue',
              }}
            />
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

    borderRadius: 100,
    height: 25,
    width: 25,

    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F3F3F3',
    borderWidth: 3,
    backgroundColor: '#ffffff',
    marginBottom: 5,
  },
  divider: {backgroundColor: '#FAFAFA', height: 12},
});
