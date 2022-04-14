import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {SubcategoryHeader} from '../../components/SubcategoryHeader';
import {RootStackParams} from '../../navigation/HomeStack';

interface Props extends StackScreenProps<RootStackParams, 'CategoryScreen'> {}

export const CategoryScreen = (props: Props) => {
  const {route} = props;
  const {category} = route.params;
  const {id, name, image} = category;
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <SubcategoryHeader id={id} name={name} image={image.url} />
      </KeyboardAvoidingView>
    </>
  );
};
