import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {SubcategoryComponent} from '../../components/SubcategoryComponent';
import {RootStackParams} from '../../navigation/SearchStack';

interface Props
  extends StackScreenProps<RootStackParams, 'SubcategorySearchScreen'> {}

export const SubcategorySearchScreen = (props: Props) => {
  const {route} = props;
  const {subcategory} = route.params;
  return (
    <>
      <SubcategoryComponent subcategory={subcategory} />
    </>
  );
};
