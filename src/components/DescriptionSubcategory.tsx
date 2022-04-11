import React from 'react';
import {View, Text} from 'react-native';
import {Description} from '../interfaces/Subcategory.interface';
interface Props {
  description: Description[];
}
export const DescriptionSubcategory = ({description}: Props) => {
  console.log('description', description);

  if (!description || description.length === 0) {
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
        <Text style={{fontSize: 20, marginBottom: 5}}>Descripción:</Text>
        {description.map((item, index) => (
          <View
            key={index}
            style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View
              style={{
                backgroundColor: index % 2 == 0 ? '#f0f0f0' : '#fafafa',
                flex: 1,
              }}>
              <Text>{item.title}</Text>
            </View>
            <View
              style={{
                backgroundColor: index % 2 == 0 ? '#fafafa' : '#f0f0f0',
                flex: 1,
              }}>
              <Text
                style={{
                  marginLeft: 5,
                }}>
                {item.content}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};
