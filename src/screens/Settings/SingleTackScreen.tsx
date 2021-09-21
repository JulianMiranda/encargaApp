import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import { TopScreen } from '../../components/TopScreen';

import {RootStackParams} from '../../navigation/SettingsStack';
import axios from 'axios';

interface Props extends StackScreenProps<RootStackParams, 'SingleTrackScreen'> {}

export const SingleTrackScreen = (props: Props) => {
  const {navigation, route} = props;
  const {code} = route.params;
    const colors = ['#2684FD', '#bae6f7'];
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
      try {
        axios.get(`https://www.correos.cu/wp-json/correos-api/envios/${code}/2021/web/`)
        .then((resp) => {
          setData(resp.data.datos);
        });
        setIsLoading(false);
      } catch (error) {
       setIsLoading(false); 
      }
     
    }, []);
  console.log(data);
  
    return (
        <>
      <TopScreen colors={colors} text="Paquete" backButton={true} height={170} />
      <ScrollView style={{marginBottom: 70}}>
       {data.map((item, index)=>{
        return <View key={index} style={{padding:10, backgroundColor: '#fff'}}>
          <Text style={{fontSize: 18}}>{item.estado}</Text>
          <Text >{item.fecha}</Text>
          <Text >{item.oficina_destino}</Text>
          <Text >{item.oficina_origen}</Text>
          <Text >{item.oficina_origen}</Text>
          </View>
       })}
      </ScrollView>
    
      
    </>
    )
}
