import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import { TopScreen } from '../../components/TopScreen';

import {RootStackParams} from '../../navigation/SettingsStack';
import axios from 'axios';
import { Dato, TrackResp } from '../../interfaces/Track.interface';
import { Loading } from '../../components/Loading';

interface Props extends StackScreenProps<RootStackParams, 'SingleTrackScreen'> {}

export const SingleTrackScreen = (props: Props) => {
  const {navigation, route} = props;
  const {code} = route.params;
    const colors = ['#2684FD', '#bae6f7'];
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Dato[]>([]);

    useEffect(() => {
      try {
        setIsLoading(true);
        axios.get<TrackResp>(`https://www.correos.cu/wp-json/correos-api/envios/${code}/2021/web/`)
        .then((resp) => {
          setData(resp.data.datos);
          setIsLoading(false);
        });
        
      } catch (error) {
       setIsLoading(false); 
      }
     
    }, []);
  
    return (
        <>
      <TopScreen colors={colors} text="Paquete" backButton={true} height={170} />
     
      <ScrollView style={{marginBottom: 70}}>
      {isLoading && <View style={{flex: 1,justifyContent: 'center', alignItems: 'center', marginTop: 200}}>
     <Loading />
     </View>}
       {data.map((item, index)=>{
        return <View key={index} style={{flexDirection: 'row'}}>
          <View style={{backgroundColor: '#00CCFF', justifyContent: 'center',marginLeft: 5, marginVertical: 5, borderRadius: 2}}>
            <Text style={{color: 'white', marginHorizontal: 1}}>o</Text>
          </View>
        <View  style={{padding:10, backgroundColor: '#fff'}}>
          <Text style={{fontSize: 18}}>{item.estado}</Text>
          <Text >{item.fecha}</Text>
          <Text >En: {item.oficina_destino}</Text>
          <Text >Hacia: {item.oficina_origen}</Text>
          </View>
        </View>
       })}
      </ScrollView>
    
      
    </>
    )
}
