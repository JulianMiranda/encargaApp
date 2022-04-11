import React from 'react';
import {View, Text} from 'react-native';
interface Props {
  aviableSizes: string[];
}
export const AviableSizesSubcategory = ({aviableSizes}: Props) => {
  console.log('aviableSizes', aviableSizes);

  if (!aviableSizes || aviableSizes.length === 0) {
    return null;
  }
  return (
    <>
      <View
        style={{
          padding: 5,
          margin: 10,
          borderRadius: 2,
        }}>
        <Text style={{fontSize: 20, marginBottom: 5}}>Tallas Disponibles:</Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {aviableSizes.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: index % 2 == 0 ? '#f0f0f0' : '#fafafa',
                marginRight: 15,
                padding: 5,
              }}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};
