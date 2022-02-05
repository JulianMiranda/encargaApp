import React from 'react'
import { View } from 'react-native';
import { AboutApp } from '../../components/AboutApp';
import { TopScreen } from '../../components/TopScreen';

export const AppScreen = () => {
    const colors = ['#2684FD', '#bae6f7'];
    return (
        <>
      <TopScreen colors={colors} text="Quiénes somos" backButton={true} height={170} />
      <View style={{margin: 20, paddingBottom: 200}}>
      <AboutApp />
      
      </View>
    
      
    </>
    )
}
