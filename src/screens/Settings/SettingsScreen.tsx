import React from 'react';
import { View} from 'react-native';
import SettingsOptions from '../../components/SettingsOptions';
import {TopScreen} from '../../components/TopScreen';

export const SettingsScreen = () => {


  const colors = ['#2684FD', '#bae6f7'];


  return (
    <View>
      <TopScreen
        colors={colors}
        text="Mi Perfil"
        backButton={false}
        height={170}
      />
      <SettingsOptions />
      {/* <Toast ref={toastRef.current} position="center" opacity={0.9} /> */}
    </View>
  );
};
