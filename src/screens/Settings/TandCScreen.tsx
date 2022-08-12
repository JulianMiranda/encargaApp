import React from 'react';
import {View} from 'react-native';
import {TandC} from '../../components/TandC';
import {TopScreen} from '../../components/TopScreen';

export const TandCScreen = () => {
  const colors = ['#2684FD', '#bae6f7'];
  return (
    <>
      <TopScreen
        colors={colors}
        text="Qué debo saber"
        backButton={true}
        height={170}
      />
      <View style={{margin: 20, paddingBottom: 200}}>
        <TandC />
      </View>
    </>
  );
};
