import React, {  useContext, useState} from 'react';
import {Text, StyleSheet,TouchableOpacity, View, TextInput, ScrollView, Linking} from 'react-native';
import {loginStyles} from '../../styles/loginTheme';
import { formatToCurrency } from '../../utils/formatToCurrency';
import CountryPicker from 'react-native-country-picker-modal';
import { AuthContext } from '../../context/auth/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMoney } from '../../hooks/useMoney';
import { ModalComponent } from '../../components/ModalComponent';

export const MoneyScreen = () => {
  const {mn,mlc} = useContext(AuthContext);
  const {top} = useSafeAreaInsets();
  const { 
          setSenderFunction,
          setReciberFunction,
          setCUPFunc,
          setMLCFunc,
          sender,
          reciber,
          currency,} = useMoney();

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('Contáctanos vía WhatsApp');
  const [body, setBody] = useState('Para terminar su remesa escríbanos vía WhatsApp');
 
  const redirectWhatsapp= () => {
    setOpenModal(false);
    Linking.openURL(
      'http://api.whatsapp.com/send?text=Hola 📦 *enCarga*, me podría ayudar?&phone=+593962914922',
    )
  ;}

  const handleButton =()=>{
    setOpenModal(true);   
  }
  return (
    <ScrollView>
    <View style={{ backgroundColor:'#5096ff', padding: 20}}>     
      <Text style={{...styles.info, marginTop: top+10}}>Estimado usuario, por el momento solo disponemos de remesas desde el Ecuador. Para hacer un envío desde otra nacionalidad continuar con el envío y nuestro administrador se pondrá en contacto con usted.</Text>
    </View>
     <View style={styles.inputsContainer}>
    <Text style={{color: 'black', alignSelf: 'flex-start', fontSize: 16}}>Envías</Text>
        <View style={styles.inputBox}>
                <View style={{ flex:1, alignItems: 'center', marginRight: -10}}>
                  <CountryPicker
                            {...{
                              countryCode: 'EC',
                              theme: {flagSizeButton: 25},
                            }}
                          />
                </View>
        <TextInput
          autoFocus = {true}
          keyboardType="decimal-pad"
            value={sender}
            onChangeText={setSenderFunction}
            placeholder="0"
            style={styles.input} />
            <Text style={styles.textUSD}>USD</Text>
         </View>
    
      <Text style={{color: 'black', alignSelf: 'flex-start', fontSize: 16, marginTop: 30}}>Reciben</Text>

  <View style={styles.inputBox}>
     <View style={{ flex:1, alignItems: 'center', marginRight: -10}}>
      <CountryPicker
              {...{
                countryCode: 'CU',
                theme: {flagSizeButton: 25},
              }}
            />
        </View>
        <TextInput
        keyboardType="decimal-pad"
            value={reciber}
            onChangeText={setReciberFunction}
            placeholder="0"
            style={{  
            height: 50,
            fontSize: 22, color: 'black', 
            backgroundColor: 'white', 
            flex: 4}}
          />

          <TouchableOpacity 
          activeOpacity={ 0.8 }
          onPress={setCUPFunc}
          style={{backgroundColor: currency === 'CUP' ? '#5096ff': '#ffffff',borderRadius:4 ,flex: 1, height: 50, alignItems: 'center', justifyContent: 'center'}}
            >
        
              <Text style={{color: currency === 'CUP' ? 'white': '#d6d2d2', fontSize:currency === 'CUP' ? 16: 10, fontWeight: '700'}}>CUP</Text>
            </TouchableOpacity>

          <TouchableOpacity 
          activeOpacity={ 0.8 }
          onPress={setMLCFunc}
          style={{backgroundColor: currency === 'MLC' ? '#5096ff': '#ffffff',borderRadius:4 , flex: 1, height: 50, alignItems: 'center', justifyContent: 'center'}}
            >
        
            <Text style={{color: currency === 'MLC' ? 'white': '#d6d2d2', fontSize:currency === 'MLC' ? 16: 10, fontWeight: '700'}}>MLC</Text>
          </TouchableOpacity>
          </View>
          
     </View>
     <View style={{backgroundColor: 'white', width: '100%', padding: 20}}>
          <Text style={{fontSize: 14, fontWeight: '500', marginBottom: 5}}>Tipo de cambio actual</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>     
                <Text style={{fontSize: 14, fontWeight: '700'}}>1.00 USD - {formatToCurrency(mn).slice(1)} MN</Text>
                <Text style={{fontSize: 14, fontWeight: '700'}}>1.00 USD - {formatToCurrency(100/mlc).slice(1)} MLC</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>     
                <Text style={{fontSize: 16, fontWeight: '400'}}>Envías</Text>
                <Text style={{fontSize: 16, fontWeight: '400'}}>Recibes</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>     
                <Text style={{fontSize: 16, fontWeight: '400'}}>100 USD</Text>
                <Text style={{fontSize: 16, fontWeight: '400', color: '#0cb415'}}>{mn*100} MN</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>     
                <Text style={{fontSize: 16, fontWeight: '400'}}>{mlc} USD</Text>
                <Text style={{fontSize: 16, fontWeight: '400', color: '#0cb415'}}>100 MLC</Text>
            </View>
          </View>
          <TouchableOpacity 
              activeOpacity={ 0.8 }
              onPress={handleButton}
              style={styles.button}
                >
        
              <Text style={{color:'#ffffff', fontSize: 22, fontWeight: '700'}}>Continuar</Text>
            </TouchableOpacity>
            <ModalComponent isLoading={false} title={title} body={body} openModal={openModal} setOpenModal={setOpenModal} onConfirmModal={redirectWhatsapp}/>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  info:{
    color: 'white',
    fontSize: 16, 
    fontWeight: '400'
  },
  inputsContainer: { 
  alignItems: 'center',
  padding: 20,
  backgroundColor: '#f8f7f7'},
  inputBox:{
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  borderRadius: 4,
  width: '100%',
  height: 50, 
  backgroundColor: 'white', 
  marginTop: 5, 
  flexDirection: 'row', 
  alignItems: 'center'},
  input:{  
    height: 50,
    fontSize: 22, 
    color: 'black', 
    backgroundColor: 'white',
    flex: 5
  },textUSD:{ 
      borderRadius: 4,
      flex: 1,
      color: '#000000', 
      fontSize: 16, 
      fontWeight: '700'},
      button:{backgroundColor: '#5096ff',
      borderRadius:4 ,
      margin:5,
      marginTop:20, 
      height: 50, 
      alignItems: 'center', 
      justifyContent: 'center'
    }
});
