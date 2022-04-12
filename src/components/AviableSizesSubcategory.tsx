import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
interface Props {
  aviableSizes: string[];
}
export const AviableSizesSubcategory = ({aviableSizes}: Props) => {
  if (!aviableSizes || aviableSizes.length === 0) {
    return null;
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Tallas Disponibles:</Text>
        <View style={styles.wrapContainer}>
          {aviableSizes.map((item, index) => (
            <View key={index} style={styles.textBox}>
              <Text>{item}</Text>
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
    margin: 10,
    borderRadius: 2,
  },
  title: {fontSize: 20, marginBottom: 5},
  wrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textBox: {
    marginRight: 15,
    padding: 5,
    borderRadius: 8,
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
