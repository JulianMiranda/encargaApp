import React from 'react';
import {Dimensions} from 'react-native';
import SettingsOptions from '../../components/SettingsOptions';
import {TopScreen} from '../../components/TopScreen';
const {height} = Dimensions.get('screen');

export const SettingsScreen = () => {
  const colors = ['#2684FD', '#bae6f7'];

  return (
    <>
      <TopScreen
        colors={colors}
        text="Ajustes"
        backButton={false}
        height={height * 0.18}
      />
      <SettingsOptions />
      {/* <Toast ref={toastRef.current} position="center" opacity={0.9} /> */}
    </>
  );
};
