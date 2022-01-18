import { useNavigation } from '@react-navigation/core';
import React,{useContext, useState} from 'react'
import { FlatList, View,Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fab } from '../../components/Fab';
import { ModalAddCode } from '../../components/ModalAddCode';
import { TopScreen } from '../../components/TopScreen';
import { AuthContext } from '../../context/auth/AuthContext';

export const TrackScreen = () => {
    const colors = ['#2684FD', '#bae6f7'];
    const {top} = useSafeAreaInsets();
    const navigation = useNavigation();

    const {user} = useContext(AuthContext);
    
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  
    const addTrackCode = ()=>{
      setTitle('Añade un código');
       setBody('');
      setOpenModal(true)
    }

    const confirmModal = ()=>{
     

      }
    return (
        <>

      <TopScreen colors={colors} text="Rastreo" backButton={true} height={170} />
     
      <View style={{/* alignItems: 'center', */margin: 20, paddingBottom: 200}}>
        <FlatList
          data={user?.codes}
          keyExtractor={(category, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={1}

          renderItem={({item}) => <TouchableOpacity activeOpacity={ 0.8 } onPress={() =>navigation.navigate('SingleTrackScreen',{code: item})} style={{paddingHorizontal: 20,marginVertical: 5, backgroundColor:'#fafafa'}}><Text style={{fontSize: 22}}>{item}</Text></TouchableOpacity>}
          ListFooterComponent={
            <View style={{height: 30}} />
            
          }
        />
      </View>
   
    
      <Fab  iconName={'add-outline'}
            onPress={addTrackCode}
            style={{
                position: 'absolute',
                bottom: 70,
                right: 20,
            }}
           

        />
        <ModalAddCode title={title} body={body} openModal={openModal} isLoading={isLoading} setOpenModal={setOpenModal} onConfirmModal={confirmModal}/>
   
    </>
    )
}
