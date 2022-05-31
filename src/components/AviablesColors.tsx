import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from '../context/theme/ThemeContext';

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
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  useEffect(() => {
    if (aviableColors && aviableColors.length > 0) {
      if (cantidad > 5 && aviableColors) {
        return setColorSelected(aviableColors);
      }
    }
  }, [aviableColors, cantidad, setColorSelected]);

  /* useEffect(() => {
    if (aviableColors && aviableColors.length === 1) {
      return setColorSelected(aviableColors);
    }
  }, [aviableColors, cantidad, setColorSelected]); */

  /*  useEffect(() => {
    if (colorSelected && colorSelected.length > 0) {
      if (cantidad < colorSelected.length) {
        setColorSelected(colorSelected);
      }
    }
  }, [cantidad, colorSelected, setColorSelected]); */

  useEffect(() => {
    let newColors = [];
    if (aviableColors && aviableColors.length > 0 && cantidad < 6) {
      for (let i = cantidad; i > 0; i--) {
        if (colorSelected && colorSelected.length > 0) {
          if (colorSelected[i - 1]) {
            newColors.push(colorSelected[i - 1]);
          }
        }
      }

      if (newColors.length > 0) setColorSelected(newColors);
    }
  }, [aviableColors, cantidad, setColorSelected]);

  useEffect(() => {
    if (aviableColors && aviableColors.length === 1) {
      return setColorSelected(aviableColors);
    }
  }, [aviableColors, setColorSelected]);

  if (!aviableColors || aviableColors.length === 0) {
    return null;
  }

  const handleColorSelected = (color: string) => {
    if (cantidad > 5) {
      return;
    }
    if (aviableColors.length === 1) {
      return;
    }
    if (cantidad <= colorSelected.length) {
      const newColorSelected = [...colorSelected];
      newColorSelected.shift();
      setColorSelected([...newColorSelected, color]);
    } else {
      if (!colorSelected.includes(color)) {
        setColorSelected([...colorSelected, color]);
      } else {
        const newColorSelected = colorSelected.filter(item => item !== color);
        setColorSelected(newColorSelected);
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
                borderColor: !colorSelected.includes(item)
                  ? '#F3F3F3'
                  : '#4b4b4b',
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
    height: 30,
    width: 30,

    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F3F3F3',
    borderWidth: 3,
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
